---
title: Implementation
hide:
  - navigation
---

# Implementation

*This section documents the technical implementation of the dashboard, outlining the core libraries, data pipelines, and modelling logic used to transform raw Nielsen sales data into actionable business intelligence.*

---

## Codebase Structure


The project is designed with a **modular architecture** to ensure scalability and ease of maintenance. By separating the frontend interface from the backend modelling logic, new features can be integrated with minimal friction.

```
dashboard/
├── app.py                  # Entry point for the web application
└── utils/
    ├── ui_tools.py         # UI rendering
    ├── widget_helper.py    # Widget management
    ├── data_tools.py       # Data manipulation
    └── data_helper.py      # Data manipulation

src/models/
├── prophet_model.py        # Baseline trend and seasonality logic
└── cannibal_model.py       # LightGBM-based residual stacking for cannibalisation

data/                       # Dedicated directory for raw datasets
```

---

### Global Configuration and Constants

To maintain a high degree of maintainability and ensure synchronisation across the system, a centralised **Global Configuration** layer was implemented within `global_const.py`. This module serves as a global registry for the entire application, mitigating the risks associated with hard-coding strings and variables across multiple files.

The configuration layer manages the core UI and logic parameters that dictate the application's behaviour through several critical variables:

- **Widget & Layout Control:** `WIDGET_SETTING`, `WIDGET_DISPLAY_TYPE`, and `WIDGET_COLUMN_COUNT` define the grid structure and rendering styles of the Streamlit frontend.
- **State & Filtering:** The `PLACHOLDER_STR` and `FILTER_LIST` variables synchronise the "empty selection" logic between the UI widgets and the backend data-processing functions.
- **Data Mapping:** To accurately model cannibalisation interactions, product categories were generalised to capture broader market dynamics. The system utilises `FLAVOR_MAPPING`, `BRAND_MAPPING`, and `MATCH_CAT` dictionaries to centralise these definitions.

By centralising these definitions, the codebase achieves a high degree of modularity. If a new product category is added or a UI layout needs to be adjusted, the developer can implement changes solely within the global variables, bypassing the need to modify the underlying function logic.

---

## The Data Pipeline

**Libraries Used:** `pandas`, `numpy`, `matplotlib`, `streamlit`, `prophet`

The data pipeline is responsible for transforming raw Nielsen datasets into a standardised format compatible with Prophet and LightGBM. The pipeline is also implemented following the modular approach.

### Data Ingestion

The ingestion layer is designed for flexibility and speed. We implemented a centralised `load_data` function that supports multiple file formats, and also utilised Streamlit's built-in caching mechanisms to minimise redundant processing.

```python
@st.cache_data
def load_data(filename: str):
    df = pd.DataFrame()
    if filename.endswith(".csv"):
        df = pd.read_csv(f"data/{filename}")
    elif filename.endswith(".xlsx"):
        df = pd.read_excel(f"data/{filename}")
    else:
        st.error("Invalid File Format")

    # Date processing and cleaning logic follows ...
    return complete_df
```

- **Format Validation:** The function identifies the file extension to select the appropriate read method.
- **Streamlit Caching:** By applying the `@st.cache_data` decorator, expensive read and cleaning operations are performed only once. Subsequent calls for the same dataset are served from memory, ensuring a responsive user experience within the dashboard.

### Date Processing

A primary requirement for robust time-series forecasting is a continuous and consistent timeline. While Prophet is capable of handling non-continuous time series, a complete timeline is still required by LightGBM. The pipeline converts the `yearweek` column (e.g. `"202401"`) into a standard `pd.DateTime` object.

```python
df["date"] = pd.to_datetime(
    df["yearweek"].astype(str) + "-1", format="%G%V-%u")
df = df.sort_values("date", ascending=True)
```

### Time Alignment

To prevent gaps in the time series, the pipeline creates a "skeleton" dataframe. This ensures every product has a record for every date within the global date range of the dataset.

```python
# Define global date range and unique SKU list
all_dates = pd.DataFrame({"date": pd.date_range(
    start=df["date"].min(), end=df["date"].max(), freq="W-MON"
)})
all_products = pd.DataFrame({"product_sku_code": df["product_sku_code"].unique()})

# Cartesian product ensures every SKU is represented in every week
cleaned_df = all_dates.merge(all_products, how="cross")
complete_df = cleaned_df.merge(df, on=["date", "product_sku_code"], how="left")
```

Performing a cross-merge resolves the issue of missing weeks for low-volume products and products whose sales only start later in the dataframe.

### Imputation and Null Handling

The final stage of the pipeline addresses the missing data created during the cross-merge. We utilise a **lookup table** to gather product metadata and fill the empty rows accordingly.

```python
# Create a lookup table to map static metadata to empty rows
lookup_table = df.drop_duplicates("product_sku_code").set_index("product_sku_code")

# Identify columns to fill
target_cols = complete_df.columns.difference(
    ["product_sku_code", "date", "nielsen_total_volume", "promotion_indicator"])

for col in target_cols:
    complete_df[col] = complete_df[col].fillna(
        complete_df["product_sku_code"].map(lookup_table[col]))

# Zero-fill volume and promotion flags
complete_df["nielsen_total_volume"] = complete_df["nielsen_total_volume"].fillna(0)
complete_df["promotion_indicator"] = complete_df["promotion_indicator"].fillna(0)
```

This logic ensures that metadata (like product category or brand) is correctly imputed for all 155 data points per SKU, while ensuring that weeks without sales are interpreted as `0` for volume and promotion indicator.

### Categorical Aggregation

While the base pipeline prepares data at the SKU level, the user might want a macro-level view of total sales across specific categories or brands. This is handled by a specialised `process_data` function, which performs on-demand aggregation based on user-defined criteria.

```python
def process_data(filename: str, filters: dict[str, str]):
    df = load_data(filename)
    for key in FILTER_LIST:
        if filters[key] == PLACHOLDER_STR:
            continue

        match_value = filters[key]
        if key == "product_sku_code":
            match_value = int(match_value)
        df = df[df[key] == match_value]

    df = df.drop(columns=["product_sku_code"])
    df = df.groupby(by=["date"], as_index=False).sum()
    return df
```

The function iterates through the `FILTER_LIST` (defined in the global constants) to filter the dataframe specified by the `filters` argument. After filtering, the function drops the product-specific identifiers and groups the remaining data by the `date` column. By applying a `.sum()` operation, the pipeline collapses multi-product data into a single aggregate. Unlike `load_data`, this function intentionally omits the `@st.cache_data` decorator. Because Pandas' filtering and grouping operations are highly optimised, the computational overhead of hashing the dataframe for caching would likely exceed the actual processing time, avoiding unnecessary memory bloat.

---

## Model Execution

As discussed in previous sections, the forecasting engine is a **two-stage architecture** designed to isolate global time-series patterns from localised product interactions. This section details the transition of data from the data ingestion pipeline into the modelling stages where further data processing for individual models occurs.

### Feeding the Prophet Model

The transition from the cleaned data pipeline to the forecasting engine is handled within the `run_prophet_model` function, located in `/src/models/prophet_model.py`. This stage is responsible for capturing the macro-level patterns (trend, seasonality, and promotion uplift) that define the baseline volume.

Because **Prophet** requires a specific schema, the implementation involves a structural transformation of the cleaned and aggregated dataframe before the model is instantiated.

> **Note:** The code block below provides a high-level overview of the implementation.

```python
@st.cache_resource
def run_prophet_model(df: pd.DataFrame):
    # Configure model and set parameters (e.g., changepoint_prior_scale)
    model = Prophet()

    # Add regressor for the promotion indicator
    model.add_regressor("promotion_indicator")

    # Create dataframe suitable for Prophet (ds, y)
    prophet_df = df.rename(columns={"date": "ds", "nielsen_total_volume": "y"})

    # Fit model to the historical 155-week period
    model.fit(prophet_df)

    return model, prophet_df
```

The function assumes that the input dataframe has been pre-processed by `process_data`, ensuring exactly one row per unique date. The pipeline first configures the model and adds a regressor for the promotion indicator, then creates a dataframe suitable for Prophet before fitting it.

To optimise performance, the function is decorated with `@st.cache_resource`. Unlike `@st.cache_data`, this decorator is specifically designed to cache trained model objects, allowing the dashboard to make predictions without re-fitting the model on every user interaction. The multi-object return is a deliberate choice that simplifies the implementation of some components, such as the "Predicted vs. Observed" visualisations and future forecasting logic, by providing a "Prophet-ready" dataset alongside the model.

### Feeding the LightGBM Model

Similar to the Prophet baseline, the dataframe must undergo a series of specialised transformations before the cannibalisation model can be instantiated. This stage moves beyond univariate patterns to analyse cross-product interactions and market share dynamics.

#### Feature Engineering

To isolate cannibalisation effects, we implement a two-step feature engineering process located in `/dashboard/utils/data_helper.py`. This pipeline transforms raw SKU-level data into generalised categorical features and dynamic share-based indicators.

#### Categorical Generalisation

The first step is to generalise granular product metadata into broader categories using the `BRAND_MAPPING`, `FLAVOR_MAPPING`, and `MATCH_CAT` constants from the global configuration.

```python
@st.cache_data
def add_categories(df):
    df["brand_cat"] = df["top_brand"].apply(classify_brand)
    df["flavor_cat"] = df["flavor_internal"].apply(classify_flavor)
    df["size_cat"] = df["pack_size_internal"].apply(classify_size)
    df["unit_cat"] = df["units_per_package_internal"].apply(classify_unit)

    df.drop(columns=["top_brand",
                     "flavor_internal",
                     "pack_size_internal",
                     "units_per_package_internal"])
    return df
```

#### Share & Residual Processing

The latter stage of the pipeline focuses on the generation of the training dataframe. The `process_categories` function serves as the bridge between the Prophet and LightGBM models by calculating the Prophet residuals and engineering complex features that highlight possible relations across products. The function performs three distinct operations: calculating the residual of the first model, identifying competitor groups, and calculating market share percentage changes.

> **Note:** The code block below is a high-level overview. Individual components are discussed in further detail below.

```python
def process_categories(sku: int, df: pd.DataFrame):
    sku_row = df[df["product_sku_code"] == sku].iloc[0]
    results = {}

    # Isolate the target SKU and generate the Prophet baseline

    # Extract Residuals (the target variable for LightGBM)

    # Generate Category Shares
    for name, cols in MATCH_CAT.items():
        # Identify products in the same category group
        # Calculate the historical share of 'Other' products in the category group
        # Feature Engineering: Competitive Share
        # Baseline Category Forecasting
        # Predict the 'expected' share to identify future cannibalisation risk

    return pd.DataFrame(results)
```

The first task of this function is to extract the target variable for the LightGBM model, which is the residual. We do this by running the Prophet model on the target SKU and subtracting its prediction (`yhat`) from the actual Nielsen volume.

```python
# Isolate the target SKU and generate the Prophet baseline
sku_df = df[(df["product_sku_code"] == sku)].groupby("date", as_index=False).sum()
sku_model, sku_prophet_df = run_prophet_model(sku_df)
pred_sku = sku_model.predict(sku_prophet_df)
pred_sku.index = pd.to_datetime(sku_prophet_df['ds'])

# Extract Residuals (the target variable for LightGBM)
actual_volume = sku_df.set_index("date")["nielsen_total_volume"]
results["residual"] = pred_sku["yhat"] - actual_volume
```

Following residual extraction, the function iterates through the `MATCH_CAT` dictionary (e.g., Brand, Flavour, Category) to identify "neighbour" products. This creates the necessary context for cannibalisation by measuring how much of the category group volume is being taken by neighbouring products. The market share of neighbours is then calculated as `current_share` by dividing the total Nielsen volume of neighbouring products by the total volume of the entire category group.

```python
for name, cols in MATCH_CAT.items():
    # Identify products in the same category group (e.g., same Brand or Flavor)
    mask = pd.Series(True, index=df.index)
    for col in cols:
        mask &= (df[col] == sku_row[col])

    # Calculate the historical share of 'Other' products in the group
    cat_weekly = df[mask].groupby("date")["nielsen_total_volume"].sum()
    others_weekly = (df[mask & (df["product_sku_code"] != sku)].
                     groupby("date")["nielsen_total_volume"].sum())

    current_share = (others_weekly / cat_weekly).fillna(0)
```

The function then calculates the previous state of the market to avoid data leakage (`{name}_other_share_delta_lag`). It also uses the category share predicted by Prophet (`pred_share`), which allows the model to anticipate possible cannibalisation based on the expected shift in market share.

```python
# Lagged Delta (Historical Context)
results[f"{name}_other_share_delta_lag"] = current_share.shift(1) - current_share.shift(2)

# Baseline Category Forecasting
group_df = df[mask].groupby("date", as_index=False).sum()
group_model, group_prophet_df = run_prophet_model(group_df)
pred_cat = group_model.predict(group_prophet_df)
pred_cat.index = pd.to_datetime(group_prophet_df['ds'])

# Predict the 'expected' share to identify future cannibalisation risk
pred_others_weekly = pred_cat["yhat"] - pred_sku["yhat"]
pred_share = (pred_others_weekly / pred_cat["yhat"]).fillna(0)
results[f"{name}_other_share_delta_pred"] = pred_share - pred_share.shift(1)
```

#### LightGBM Implementation & Training

The final step in the modelling pipeline involves training the LightGBM model on the dataframe generated by `process_categories`. This is handled by `cannibal_model` located in `/src/models/cannibal_model.py`.

```python
@st.cache_resource
def run_cannibal_model(processed_df: pd.DataFrame):
    # Feature Selection from MATCH_CAT constants
    features = []
    for match in MATCH_CAT:
        features.append(f"{match}_other_share_delta_lag")
        features.append(f"{match}_other_share_delta_pred")
    features.append("promotion_indicator")

    # Time-Based Train-Test Split (16-week holdout)
    split_date = processed_df["date"].max() - pd.Timedelta(weeks=16)
    train = processed_df[processed_df["date"] < split_date]
    test = processed_df[processed_df["date"] >= split_date]

    # LightGBM Dataset Construction
    X_train, X_test = train[features], test[features]
    y_train, y_test = train[target], test[target]

    train_data = lgb.Dataset(X_train, label=y_train)
    test_data = lgb.Dataset(X_test, label=y_test, reference=train_data)

    # Model Configuration and Training
    params = {
        # parameters for model
    }
    model = lgb.train(params, train_data, valid_sets=[train_data, test_data], ...)
    return model
```

The execution begins by dynamically constructing the feature list through an iteration of `MATCH_CAT`. By appending the `_lag` and `_pred` suffixes to each category name, the function ensures that the model is fed the exact columns generated during the previous `process_categories` step. Once these features are defined, the train-test split is performed, allowing the model to be validated against the most recent 16-week window.

Following the data partition, the training and testing sets are transformed into optimised `lgb.Dataset` objects. These datasets are then fed into the `lgb.train` engine. Once training is complete, the fitted model object is returned and stored in memory via the `@st.cache_resource` decorator.

---

## Analytical Interface (Dashboard)

The dashboard interface is designed to translate the underlying machine learning models into an interactive and customisable analytic tool. By leveraging the **Streamlit** framework, the system provides a responsive environment where users can control parameters and immediately see the impact of their decisions.

### Frontend Architecture and Application Flow

The application follows a modular, hierarchical structure to separate UI rendering from complex backend logic. The primary control of the application flow is managed by `app.py`, which acts as the central controller for the entire dashboard. This file is responsible for managing the application state and calling high-level rendering functions to build the interface.


#### Session State Initialisation

Upon launch, `app.py` initialises `st.session_state`, which allows for persistent variable storage across reruns of the application. Specifically, it establishes `st.session_state.widgets`, a list containing the active widget configurations, and `st.session_state.widget_index`, a counter used to maintain unique identifiers and positioning for each widget.

```python
if "widgets" not in st.session_state:
    st.session_state.widgets = []

if "widget_index" not in st.session_state:
    st.session_state.widget_index = 0
```

#### Sidebar Configuration

After initialising session state, the system constructs the sidebar layout to house the primary control panel of the dashboard.

```python
with st.sidebar:
    # Upload Dataset

with st.sidebar:
    addWidget()

with st.sidebar:
    # Clear Widgets

with st.sidebar:
    # Import Layout

with st.sidebar:
    # Export Layout
```

#### Upload Dataset

A `st.popover` is used as a container for the dataset uploader to avoid sidebar congestion. This component allows users to add Nielsen datasets in CSV or XLSX format. When a valid file is uploaded, the script saves it directly into the local `/data/` directory, making it available for future sessions. A success message is then displayed to confirm the upload was successful.

```python
with st.popover("Upload dataset"):
    uploaded_dataset = st.file_uploader(
        "Upload dataset", type=["csv", "xlsx"])
    if uploaded_dataset:
        # save the files into local /data/ directory
        st.success(f"Saved {uploaded_dataset.name} to data/ folder")
```

#### Widget Management

The sidebar facilitates dashboard customisation through the "Add Widget" and "Clear All" features. The "Add Widget" button triggers the `addWidget` function in `ui_tools.py` to append a new configuration to the state. Meanwhile, the "Clear All" button provides a global reset. Because of the way widgets are tracked in our system, clearing all the widgets is a straightforward operation of clearing the data in `st.session_state_widgets`.  The application then triggers a manual rerun to reflect the changes in the UI.

```python
if st.button("Clear All", "clearWidget"):
    st.session_state.widgets = []
    st.session_state.widget_index = 0
    st.rerun()
```

#### Import / Export Layout

To support multi-session workflows, the application implements layout serialisation. The "Import Layout" tool allows users to upload a previously saved CSV configuration, overwriting the current session state to restore a specific dashboard arrangement. Similar to the dataset upload, this feature is housed within a `st.popover`. The tool restricts uploads to CSV files and requires an explicit "Confirm Import" button press before overwriting the current layout.

```python
with st.popover("Click to Import Layout"):
    csvLayout = st.file_uploader(
        "Import Layout",
        type=["csv"],
    )

    if st.button("Confirm Import"):
        importLayout(csvLayout)
        st.rerun()
```

The "Export Layout" feature allows users to save their current dashboard configuration for future use. While also implemented within a popover, the technical justification for its design is more nuanced. Because of the way Streamlit executes and manages data updates, sections of the dashboard can occasionally operate on stale data.

To maintain data integrity, the feature uses a two-step process. A "Generate CSV" button first triggers an application rerun, ensuring all state variables are synchronised and up to date. Only after this rerun is the "Download CSV" button revealed. This sequence guarantees that the exported file accurately reflects the layout currently displayed on the dashboard.

```python
with st.popover("Export Layout", icon=":material/download:"):
    st.write("Clicking below will sync all widget changes and prepare your file.")

    generate_btn = st.button("Generate CSV")
    if generate_btn:
        csv_data = exportLayout()

        st.download_button(
            label="Download CSV",
            data=csv_data,
            file_name="layout.csv",
            mime="text/csv",
            on_click=(lambda: not generate_btn)
        )
```

---

## The UI Management Layer (`ui_tools.py`)

To keep `app.py` clean and maintainable, high-level UI components are encapsulated within `ui_tools.py`. This module handles the overarching layout and auxiliary functions required for the intended user experience. Its primary role is the execution of high-level rendering routines like `renderWidget` and `renderAll`.

### Widget Creation

In this system, widget creation is the process of generating a configuration dictionary. This dictionary uses `WIDGET_SETTING` from `global_const.py` as keys, with the desired value set for each.

When a user initiates the creation process, the orchestration layer calls the `addWidget` function. Due to the highly interdependent nature of the configuration UI and the underlying logic, this function is the sole exception within the management layer that handles non-widget UI rendering.

```python
@st.fragment
def addWidget():
    with st.popover("+ Add Widget"):
        # 1. Scan "/data/" directory for available files
        #    and append "Pick Dataset" as a placeholder

        # 2. Get widget title set by user

        # 3. Data Validation and Confirm Configuration
```

The `@st.fragment` decorator prevents unnecessary reruns when setting configurations. This makes it so that only the `addWidget` function reruns independently from the rest of the dashboard, which greatly improves performance when many widgets are already present.

The first step is **resource discovery**. The code scans the local `/data/` directory at runtime, ensuring that any newly uploaded Nielsen datasets are immediately available for selection.
1
```python
datasetPath = Path("data/")
datasets = [f.name for f in datasetPath.iterdir() if f.is_file()]
datasets.insert(0, "Pick Dataset")
```

Users are prompted to define three core attributes: a custom title (defaulting to an auto-incremented index), the data source, and the display type. Using `st.selectbox` for both data source and display type inherently incorporates a level of input validation.

```python
widgetTitle = st.text_input(
    "Widget Title", f"Widget #{st.session_state.widget_index + 1}"
)
dataSource = st.selectbox("Data Source", datasets, 0)
displayType = st.selectbox("Display Type", WIDGET_DISPLAY_TYPE, 0)
```

The system prevents broken widgets from being created by enforcing a valid data source. Only once the configuration is validated does the user see the "Save & Add" button, which invokes `saveConfig`. A subsequent `st.rerun()` then renders the newly created widget.

```python
if dataSource == "Pick Dataset":
    st.error("Choose a valid dataset")

else:
    if st.button("Save & Add"):
        saveConfig(
            data_source=dataSource,
            display_type=displayType,
            widget_title=widgetTitle,
        )
        st.rerun()
```

The `saveConfig` function transforms user inputs into a persistent state object following the standardised `WIDGET_SETTING` schema defined in the global constants, setting any uninitialised settings to `None`. This ensures that every widget, regardless of its data source or display type, maintains a consistent data structure for downstream processing by the rendering engine.

```python
def saveConfig(
    widget_title: str,
    data_source: str,
    display_type: str,
    widget: dict[str, Any] = dict()
):
    w = dict()
    for s in WIDGET_SETTING:
        w[s] = widget.get(s, None)

    w["DATA_SOURCE"] = widget.get("DATA_SOURCE", data_source)
    w["DISPLAY_TYPE"] = widget.get("DISPLAY_TYPE", display_type)
    w["WIDGET_TITLE"] = widget.get("WIDGET_TITLE", widget_title)

    index = 0
    if not widget or not widget.get("WIDGET_INDEX", None):
        st.session_state.widget_index += 1
        index = st.session_state.widget_index
    else:
        index = widget["WIDGET_INDEX"]

    w["WIDGET_INDEX"] = index

    st.session_state.widgets.append(w)
```

### Widget Rendering

The `renderWidget` function acts as the **encapsulated execution environment** for a single widget. The `@st.fragment` decorator ensures the function reruns independently of the rest of the dashboard, and that a change in one widget's parameters only updates that specific widget.

```python
@st.fragment
def renderWidget(widget: dict[str, Any]):
    # 1. State Initialisation
    # Extract index, title, and initialise default filters

    # 2. UI Slot Reservation
    # Create empty containers for title and the final visualisation

    # 3. Parameter Customisation (Interactivity Layer)
    # Render "Change Title" popover
    # Render "Select Product" popover (Filters, Dates, Cannibalisation options)
    # Implement "Clear" and "Confirm" logic

    # 4. Model Execution and Display
    # Populate the reserved visualisation slot via match_and_render()

    # 5. Lifecycle Management
    # Implement "Delete Widget" logic with session state cleanup
```

Before rendering begins, the function extracts the necessary metadata and ensures the filter dictionary is properly initialised, guaranteeing a clean starting state even if the user hasn't selected specific products yet. To support imported layouts, the initialisation logic includes a conditional check for pre-existing settings; if the filter list already contains values (typically from an imported layout), the widget defaults to those parameters.

```python
widget_idx = widget["WIDGET_INDEX"]
widget_title = widget["WIDGET_TITLE"]

# Ensure a default filter state exists to prevent KeyErrors
widget["FILTERS"] = (
    {key: PLACHOLDER_STR for key in FILTER_LIST}
    if not widget["FILTERS"]
    else widget["FILTERS"]
)
```

The function then uses `st.empty()` to reserve specific vertical space within the widget. By pre-allocating containers for the widget title and the primary visualisation, the system ensures these elements remain in fixed positions.

```python
# Create placeholder slots for the title and the final chart
title_container = st.empty()
title_container.title(f"{widget_title}")

# Define the layout for control buttons
col = st.columns(2)
widget_display_slot = st.empty()
```

The third section houses the logic for dynamic filtering, date range selection, and cannibalisation overrides, which are widget-level configurations that apply to all display types.

```python
with col[0].popover("Change Title"):
    new_title = st.text_input("New Title", widget["WIDGET_TITLE"])
    widget["WIDGET_TITLE"] = new_title
    title_container.title(new_title)

with col[1].popover("Select Product"):
    widgetOptionFilter(widget)    # Logic for Dynamic Filtering
    widgetOptionDate(widget)      # Logic for Time-frame
    widgetCannibalOption(widget)  # Logic for Model Overrides

    # Clear Option and Confirm Option buttons
```

In the final stage, the function passes the completed configuration to `match_and_render`, which identifies the `DISPLAY_TYPE` and renders the widget accordingly.

```python
with widget_display_slot.container():
    match_and_render(widget)

def match_and_render(widget):
    display_type = widget["DISPLAY_TYPE"]
    match display_type:
        case "KPI":
            createKPI(widget)
        case "Forecast":
            createForecast(widget)
        case "Predicted Vs. Observed":
            createPredObs(widget)
        case "Backtest Performance":
            createBacktest(widget)
        case "Decomposition":
            createDecomposition(widget)
```

The `renderAll` function iterates through `st.session_state.widgets` to render all of the widgets.

```python
def renderAll():
    widgetCols = st.columns(WIDGET_COLUMN_COUNT)
    for i, widget in enumerate(st.session_state.widgets):
        col = i % WIDGET_COLUMN_COUNT

        with widgetCols[col]:
            renderWidget(widget)
```

### Auxiliary Functions

The `exportLayout` function converts the current dashboard state into a portable CSV file. It iterates through `st.session_state.widgets`, extracts every parameter defined by `WIDGET_SETTING`, and encodes the result as a UTF-8 CSV.

```python
def exportLayout():
    data = {"DATA_SOURCE": [], "DISPLAY_TYPE": []}

    # 1. Iterate through every active widget in the session
    for widget in st.session_state.widgets:
        for s in WIDGET_SETTING:
            # 2. Extract and append all settings to the export dictionary
            data[s] = data.get(s, [])
            data[s].append(widget.get(s, None))

    # 3. Convert the dictionary into a CSV-ready format
    df = pd.DataFrame(data)
    return df.to_csv().encode("utf-8")
```

The `importLayout` function is the inverse of the export utility. It parses an uploaded CSV file and rebuilds the application's **Session State** to match a previously saved dashboard configuration.

```python
def importLayout(csvLayout):
    if csvLayout is None: return

    # 1. Reset current session to prepare for new data
    st.session_state.widgets = []
    dfLayout = pd.read_csv(csvLayout)

    # 2. Schema Alignment
    dfLayout = dfLayout.reindex(columns=WIDGET_SETTING)
    cols_to_convert = ["FILTERS", "PROMOTION_WINDOWS"]
    for col in cols_to_convert:
        dfLayout[col] = dfLayout[col].apply(safeParse)

    # 3. Order Reconstruction
    dfLayout = dfLayout.sort_values(by="WIDGET_INDEX")

    # 4. Re-serialisation into Session State
    for i in range(len(dfLayout)):
        # ... logic to build widget dictionary ...
        saveConfig(..., widget=widget)

    # 5. Global Index Synchronisation
    st.session_state.widget_index = dfLayout["WIDGET_INDEX"].max()
```

---

## The Logic Layer (`widget_helper.py`)

<div class="section" markdown="1">

While `ui_tools` manages the layout, the inner logic of the widgets is delegated to `widget_helper.py`. The separation of concerns allows the specific mechanics of the interface, like dynamic filtering, to be isolated from the visual code. This also follows the system's philosophy of modularity, allowing developers to modify how a widget behaves without touching the presentation layer.

This layer is responsible for three primary functional domains:

- **Dynamic State Management:** Functions such as `widgetOptionFilter` and `widgetOptionDate` manage the reactive state of the UI, handling filtering and time range adjustments so that user selections are accurately captured and passed to the backend models.

- **Targeted Model Execution:** The layer serves as the execution engine for specific analytical outputs. Through functions like `createKPI`, `createForecast`, and `createDecomposition`, the system bridges the gap between raw data and visual insight.

- **Inference Orchestration:** Each "create" function is responsible for invoking the appropriate machine learning pipeline (Prophet or LightGBM), processing the model's response, and rendering the final visualisation. This modular design allows developers to refine individual model behaviours or add new display types without impacting the broader dashboard architecture.

</div>
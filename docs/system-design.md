---
title: System Design
hide:
  - navigation
---

# System Design

*This section outlines the technical architecture of the Baseline Sales Dashboard, covering the system components, data flow, sequence diagrams, design patterns, and data storage.*

---

## System Architecture

The diagram below illustrates the end-to-end pipeline of the application, from user interaction through to results output.

<img src="../assets/images/system-architecture.jpeg" alt="Sketch 1" 
    style="width: 100%; max-width:100%" 
    class="fancy-image">

### Component Descriptions

**USER (Marketer / Analyst)**

The end user of the application. The system is designed to serve two distinct user types, marketing leads who require quick visual insights, and data analysts who require deeper analytical views.

**Streamlit Dashboard (`app.py`)**

The entry point of the application. Handles the general app layout, renders widgets, manages import and export of widget layouts, and processes incoming data files.

**UI Utilities (`ui_tools.py`)**

Responsible for UI-level operations including importing and exporting widget layouts, rendering widgets onto the dashboard, and handling data file imports.

**Widget Logic (`widget_helpers.py`)**

Manages the logic for individual widgets, including new widget creation, filter selection, date range picking, KPI display logic, and rendering each display type.

**Data Processing (`data_tools.py`)**

Handles all data operations — loading data, cleaning, computing KPI values, generating forecast dataframes, and orchestrating calls to the Prophet and Cannibalisation models.

**Data Source**

Nielsen sales data provided as CSV or XLSX files. Files are stored in the `data/` folder on the device running the application and loaded by filename.

**Prophet Model (`prophet_model.py`)**

The core forecasting model. Trains on the processed dataset with yearly seasonality and a promotional regressor. Used by Forecast, Decomposition, Predicted vs Observed, and Backtest Performance widgets. Results are cached via `@st.cache_resource` — the model only retrains when a new input dataframe is passed.

**Cannibalisation Model (`cannibal_model.py`)**

An optional LightGBM-based model that analyses cross-product market share deltas to predict what the Prophet residuals should be. The predicted residuals are added to Prophet's predictions to produce a cannibalisation-corrected output. Used by both **Predicted vs Observed** and **Decomposition** widgets when the cannibalisation toggle is enabled and a SKU is selected. The trained model is cached via `@st.cache_resource`.

**Results Output**

Aggregates the model outputs into the following display types: KPI metrics, Predicted vs Observed sales, Forecasting graph, Decomposition graphs, and Backtest error graphs.

**UI Display**

Renders the final results as interactive charts, dynamic KPIs, and configurable widgets. Layouts can be exported for future sessions.

---

## Sequence Diagrams

### 1. Uploading a Dataset

```mermaid
sequenceDiagram
    actor User
    participant Dashboard as Streamlit Dashboard (app.py)
    participant DataTools as Data Processing (data_tools.py)

    User->>Dashboard: Clicks Upload Dataset
    Dashboard->>User: Opens file picker
    User->>Dashboard: Selects Nielsen CSV or XLSX file
    Dashboard->>DataTools: Passes file for handling
    alt Result already cached
        DataTools-->>Dashboard: Returns cached dataset
    else No cache exists
        DataTools->>DataTools: Load file from data/ folder
        DataTools->>DataTools: Parse dates, clean data, handle edge cases, compute KPI values
        DataTools-->>Dashboard: Returns and caches processed dataset
    end
    Dashboard-->>User: Confirms dataset uploaded successfully
```

---

### 2. Adding and Configuring a Widget

```mermaid
sequenceDiagram
    actor User
    participant Dashboard as Streamlit Dashboard (app.py)
    participant UITools as UI Utilities (ui_tools.py)
    participant WidgetHelpers as Widget Logic (widget_helpers.py)
    participant DataTools as Data Processing (data_tools.py)
    participant Prophet as Prophet Model
    participant Cannibalisation as Cannibalisation Model
    participant UIDisplay as UI Display

    User->>Dashboard: Clicks Add Widget
    Dashboard->>User: Opens configuration panel
    User->>Dashboard: Enters title, selects data source and display type
    User->>Dashboard: Clicks Save & Add
    Dashboard->>WidgetHelpers: Passes initial widget configuration
    WidgetHelpers->>DataTools: Requests full unfiltered dataset
    DataTools-->>WidgetHelpers: Returns cleaned dataset
    alt Display type is Forecast, Decomposition, Predicted vs Observed, or Backtest Performance
        WidgetHelpers->>Prophet: Passes full dataset
        alt Model already cached for this dataset
            Prophet-->>WidgetHelpers: Returns cached model results
        else No cache exists
            Prophet->>Prophet: Trains model on full dataset
            Prophet-->>WidgetHelpers: Returns and caches model results
        end
    end
    WidgetHelpers->>UITools: Requests widget render
    UITools->>UIDisplay: Re-renders widget
    UIDisplay-->>Dashboard: Widget appears on dashboard with unfiltered data

    Note over User,Dashboard: User now configures the widget

    User->>Dashboard: Selects product (Concise or Verbose mode)
    User->>Dashboard: Sets date range
    opt Display type is Predicted vs Observed or Decomposition
        User->>Dashboard: Optionally enables Cannibalisation toggle
    end
    User->>Dashboard: Clicks Confirm Config
    Dashboard->>WidgetHelpers: Passes updated widget configuration
    alt Display type is Forecast, Decomposition, Predicted vs Observed, or Backtest Performance
        WidgetHelpers->>DataTools: Requests filtered dataset
        DataTools-->>WidgetHelpers: Returns cleaned filtered dataset
        alt Model already cached for this filtered dataset
            Prophet-->>WidgetHelpers: Returns cached model results
        else No cache exists for this product/filter combination
            WidgetHelpers->>Prophet: Passes filtered dataset
            Prophet->>Prophet: Trains model on filtered dataset
            Prophet-->>WidgetHelpers: Returns and caches model results
        end
        opt Cannibalisation enabled and SKU selected
            WidgetHelpers->>DataTools: Requests cannibalisation results
            DataTools->>Cannibalisation: Passes cross-product features
            alt Cannibalisation model already cached
                Cannibalisation-->>DataTools: Returns cached predicted residuals
            else No cache exists
                Cannibalisation->>Cannibalisation: Trains LightGBM on residuals
                Cannibalisation-->>DataTools: Returns and caches predicted residuals
            end
            DataTools->>DataTools: Adds predicted residuals to Prophet predictions
            DataTools-->>WidgetHelpers: Returns corrected predictions
        end
    else Display type is KPI
        WidgetHelpers->>DataTools: Requests processed data for KPI computation
        DataTools-->>WidgetHelpers: Returns KPI values
    end
    WidgetHelpers->>UITools: Requests widget render
    UITools->>UIDisplay: Re-renders widget 
    UIDisplay-->>Dashboard: Widget appears on dashboard with unfiltered data
    Dashboard-->>User: Widget updated with selected product and date range
```

---

### 3. Forecast / Promotion Config for Forecast Widget

```mermaid
sequenceDiagram
    actor User
    participant Dashboard as Streamlit Dashboard (app.py)
    participant UITools as UI Utilities (ui_tools.py)
    participant WidgetHelpers as Widget Logic (widget_helpers.py)
    participant DataTools as Data Processing (data_tools.py)
    participant Prophet as Prophet Model
    participant UIDisplay as UI Display

    User->>Dashboard: Clicks Forecast Config or Promotional Config
    Dashboard->>User: Opens configuration panel
    alt Forecast Config
        User->>Dashboard: Adjusts forecast horizon
    else Promotional Config
        User->>Dashboard: Specifies promotional period(s)
    end
    User->>Dashboard: Clicks Confirm
    Dashboard->>WidgetHelpers: Passes updated configuration
    WidgetHelpers->>DataTools: Requests processed data
    DataTools-->>WidgetHelpers: Returns cleaned dataset
    alt Model already cached for this dataset
        Prophet-->>WidgetHelpers: Returns cached model
    else No cache exists
        WidgetHelpers->>Prophet: Trains model on dataset
        Prophet-->>WidgetHelpers: Returns and caches model
    end
    WidgetHelpers->>Prophet: Generates updated forecast with new parameters
    Prophet-->>WidgetHelpers: Returns updated forecast output
    WidgetHelpers->>UITools: Requests widget re-render
    UITools->>UIDisplay: Re-renders forecast chart
    UIDisplay-->>Dashboard: Updated chart rendered
    Dashboard-->>User: Updated forecast displayed
```

---

### 4. Exporting a Layout

```mermaid
sequenceDiagram
    actor User
    participant Dashboard as Streamlit Dashboard (app.py)
    participant UITools as UI Utilities (ui_tools.py)

    User->>Dashboard: Clicks Export Layout
    Dashboard->>UITools: Requests layout export
    UITools->>UITools: Collects and formats widget configurations
    UITools-->>Dashboard: Returns layout as CSV
    Dashboard-->>User: Prompts CSV download
```

---

## Design Patterns

### Modular Architecture
Each module has a clearly defined responsibility with minimal overlap. `data_tools.py` handles all data loading, cleaning, and model orchestration. `widget_helpers.py` handles widget rendering and display logic. `ui_tools.py` handles layout management. `app.py` handles the top-level application structure. Changes to one module do not require changes to others.

### Pipeline Pattern
The application is split into distinct, reusable modules rather than a single monolithic script. This makes the codebase easier to navigate, test, and extend. For example, adding a new widget display type only requires changes to `widget_helpers.py` and `ui_tools.py`, without touching the data or model layer.

### Strategy Pattern
Complex operations are broken down into smaller, single-purpose functions. For example, `get_forecast_df` coordinates data loading, Prophet training, and future date generation, but delegates each step to a dedicated function. This keeps individual functions focused and easier to debug.

### Caching
The application makes extensive use of Streamlit's `@st.cache_data` and `@st.cache_resource` decorators to avoid redundant computation. Results are keyed to function inputs — the cache is automatically invalidated when inputs change, such as when a different product or filename is selected.

| Function | Decorator | What is Cached |
|---|---|---|
| `load_data` | `@st.cache_data` | Loaded and cleaned dataset, keyed by filename |
| `run_prophet_model` | `@st.cache_resource` | Trained Prophet model, keyed by input dataframe |
| `get_performance_metrics` | `@st.cache_data` | Backtest cross-validation results |
| `get_cannibalisation_model` | `@st.cache_data` | Predicted residuals from the cannibalisation model |
| `run_cannibal_model` | `@st.cache_resource` | Trained LightGBM model |
| `add_categories` | `@st.cache_data` | Dataframe with product category columns added |
| `process_categories` | `@st.cache_data` | Processed cross-product features for a given SKU |

---

## Data Storage

The application does not use a database. Nielsen sales data files are stored persistently in a `data/` folder on the device running the application, and are loaded by filename. Widget layout configurations can be exported and saved as CSV files by the user, and re-imported in future sessions. No data is transmitted to external servers.
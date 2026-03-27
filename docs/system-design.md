---
title: System Design
hide:
  - navigation
---

# System Design

*This section outlines the technical architecture of the dashboard, covering the system components, data flow, sequence diagrams, design patterns, and data storage.*

---

## System Architecture

<div class="section" markdown="1">

The diagram below illustrates the end-to-end pipeline of the application, from user interaction through to results output.

<img src="../assets/images/system-architecture.jpeg" alt="Sketch 1" 
    style="width: 100%; max-width:100%" 
    class="fancy-image">

### Component Descriptions

**USER (Marketer / Analyst)**

The end user of the application. The system is designed to serve two distinct user types: Marketing leads who require quick visual insights, and data analysts who require deeper analytical views.

**Streamlit Dashboard (`app.py`)**

The entry point of the application. Handles the general app layout.

**UI Utilities (`ui_tools.py`)**

Responsible for UI-level operations including importing and exporting widget layouts, rendering widgets onto the dashboard, and handling data file imports.

**Widget Logic (`widget_helpers.py`)**

Manages the logic for individual widgets, including new widget creation, filter selection, date range picking, and KPI display logic.

**Data Processing (`data_tools.py`)**

Handles all data operations: loading new data, cleaning, computing KPI values, and managing edge cases in the input data.

**Data Source**

Nielsen sales data provided as CSV files. These files are uploaded by the user and processed locally on the server.

**Prophet Model**

The core forecasting model. Trains on the processed dataset, predicts sales, computes and graphs predictions, and generates forecasts for future windows.

**Cannibalisation Model (Optional)**

An optional LightGBM-based model that performs cross-product comparisons to account for cannibalisation effects within the forecast.

**Results Output**

Aggregates the model outputs into the following display types: KPI metrics, Predicted vs Observed sales, Forecasting graph, Decomposition graphs, and Backtest error graphs.

**UI Display**

Renders the final results as interactive charts, dynamic KPIs, and configurable widgets. Layouts can be exported for future sessions.

</div>

---

## Sequence Diagrams

### 1. Uploading a Dataset

```mermaid
sequenceDiagram
    actor User
    participant Dashboard as Streamlit Dashboard (app.py)
    participant UITools as UI Utilities (ui_tools.py)
    participant DataTools as Data Processing (data_tools.py)

    User->>Dashboard: Clicks Upload Dataset
    Dashboard->>User: Opens file picker
    User->>Dashboard: Selects Nielsen CSV file
    Dashboard->>UITools: Passes file for handling
    UITools->>DataTools: Passes file for loading and cleaning
    DataTools->>DataTools: Load data, clean, handle edge cases
    DataTools-->>UITools: Returns processed dataset
    UITools-->>Dashboard:
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
    participant UIDisplay as UI Display
    participant Prophet as Prophet Model
    participant Cannibalisation as Cannibalisation Model

    User->>Dashboard: Clicks Add Widget
    Dashboard->>User: Opens configuration panel
    User->>Dashboard: Enters title, selects data source and display type
    User->>Dashboard: Clicks Save & Add
    Dashboard->>WidgetHelpers: Passes initial widget configuration
    WidgetHelpers->>DataTools: Requests full dataset for selected source
    DataTools-->>WidgetHelpers: Returns full dataset
    WidgetHelpers->>UITools: Requests widget render with full dataset
    UITools->>UIDisplay: Renders widget showing all products combined
    UIDisplay-->>Dashboard: Widget appears on dashboard

    Note over User,Dashboard: User now configures the widget

    User->>Dashboard: Selects product (Concise or Verbose mode)
    User->>Dashboard: Sets date range
    opt Enable Cannibalisation toggled on
        User->>Dashboard: Enables Cannibalisation toggle
    end
    User->>Dashboard: Clicks Confirm Config
    Dashboard->>WidgetHelpers: Passes widget configuration
    alt Display type is Forecast, Decomposition, Predicted vs Observed, or Backtest Performance
        WidgetHelpers->>DataTools: Requests processed data
        DataTools-->>WidgetHelpers: Returns cleaned dataset
        WidgetHelpers->>Prophet: Trains model and generates output
        Prophet-->>WidgetHelpers: Returns model results
        opt Cannibalisation enabled
            Prophet->>Cannibalisation: Passes residuals for cross-product analysis
            Cannibalisation-->>Prophet: Returns cannibalisation-adjusted results
    end
    else Display type is KPI
        WidgetHelpers->>DataTools: Requests processed data
        DataTools-->>WidgetHelpers: Returns cleaned dataset
        WidgetHelpers->>WidgetHelpers: Computes KPI values directly
    end
    WidgetHelpers->>UITools: Requests widget re-render
    UITools->>UIDisplay: Re-renders widget with filtered data
    UIDisplay-->>Dashboard: Updated widget displayed
    Dashboard-->>User: Widget updated with selected product and date range
```

---

### 3. Forecast / Promotion Config for Forecast Widget

```mermaid
sequenceDiagram
    actor User
    participant Dashboard as Streamlit Dashboard (app.py)
    participant WidgetHelpers as Widget Logic (widget_helpers.py)
    participant Prophet as Prophet Model
    participant Cannibalisation as Cannibalisation Model
    participant Results as Results Output

    User->>Dashboard: Clicks Forecast Config or Promotional Config
    Dashboard->>User: Opens configuration panel
    alt Forecast Config
        User->>Dashboard: Adjusts forecast horizon
    else Promotional Config
        User->>Dashboard: Specifies promotional period(s)
    end
    User->>Dashboard: Clicks Confirm
    Dashboard->>WidgetHelpers: Passes updated configuration
    WidgetHelpers->>Prophet: Retrains model with updated parameters
    opt Cannibalisation enabled
        Prophet->>Cannibalisation: Passes residuals for cross-product analysis
        Cannibalisation-->>Prophet: Returns cannibalisation-adjusted results
    end
    Prophet-->>Results: Returns updated forecast output
    Results-->>Dashboard: Re-renders forecast chart
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
    Dashboard->>UITools: Requests layout serialisation
    UITools->>UITools: Syncs all widget configurations
    UITools-->>Dashboard: Returns layout as CSV
    Dashboard-->>User: Prompts CSV download
```

---

## Design Patterns

### Modular Architecture
The application is structured into distinct modules — `app.py`, `ui_tools.py`, `widget_helpers.py`, and `data_tools.py` — each with a clearly defined responsibility. This separation of concerns ensures that changes to one module do not affect others, improving maintainability and readability.

### Pipeline Pattern
Data flows through the system in a linear pipeline: raw input → data processing → model training → results output → UI display. Each stage transforms the data and passes it to the next, making the flow predictable and easy to debug.

### Strategy Pattern
The widget system applies a strategy pattern for display types. Each display type (KPI, Forecast, Decomposition, Predicted vs Observed, Backtest Performance) implements its own rendering logic, but is invoked through a consistent interface. This allows new display types to be added without modifying the core widget logic.

---

## Data Storage

The application does not use a database. Uploaded Nielsen CSV files are stored in the local file system of the server running the application. Widget layout configurations can be exported and saved as CSV files by the user, and re-imported in future sessions. No data is transmitted to external servers.
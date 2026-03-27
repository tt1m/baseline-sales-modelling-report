---
title: Appendices
hide:
  - navigation
---

# Appendices

*This section serves as the final documentation for user operation, technical deployment, legal compliance, and project tracking, providing the necessary guidance to maintain and scale the application.*

---

## User Manual

<div class="section" markdown="1">

### 1. Overview

This dashboard is an interactive forecasting tool designed to visualise and analyse product sales data. Users can build a custom layout of widgets, each displaying a different model output for a selected product. The underlying forecasting model is built with Prophet, a decomposable time series model that accounts for trend, seasonality, and promotional effects.

  <img src="../assets/images/dashboard-overview.png" 
       class="fancy-image" 
       alt="Dashboard Overview" 
       style="width: 100%; max-width: 100%;">


---

### 2. Getting Started

#### 2.1 Upload Dataset
Before adding any widgets, upload your dataset using the **Upload Dataset** button. Your file must be a CSV / XLSX formatted to the Nielsen standard. Once uploaded, the dataset will be available for all widgets.

  <img src="../assets/images/upload-dataset.png" 
       class="fancy-image" 
       alt="Upload Dataset 1" 
       style="width: 100%; max-width: 100%;">


Click **Browse files** and select your file. Once uploaded, your dataset will appear in the panel.

  <img src="../assets/images/upload-dataset2.png" 
       class="fancy-image" 
       alt="Upload Dataset 2" 
       style="width: 100%; max-width: 100%;">


#### 2.2 Add Widget
Click **Add Widget** to create a new widget on the dashboard. 

  <img src="../assets/images/add-widget.png" 
       class="fancy-image" 
       alt="Add Widget" 
       style="width: 100%; max-width: 100%;">

Fill in the widget title, select your data source, and choose a display type from KPI, Forecast, Decomposition, Predicted Vs. Observed, or Backtest Performance.

  <img src="../assets/images/add-widget2.png" 
       class="fancy-image" 
       alt="Add Widget 2" 
       style="width: 100%; max-width: 100%;">

Once configured, click **Save & Add** to add the widget to the dashboard.

  <img src="../assets/images/add-widget3.png" 
       class="fancy-image" 
       alt="Add Widget 3" 
       style="width: 100%; max-width: 100%;">

#### 2.3 Clear All
Clicking **Clear All** resets the dashboard, removing all widgets and returning the layout to a blank state. This cannot be undone, so ensure you have exported your layout before clearing.

  <img src="../assets/images/clear-all.png" 
       class="fancy-image" 
       alt="Clear All" 
       style="width: 100%; max-width: 100%;">

#### 2.4 Export Layout
Click **Export Layout** to save your current dashboard configuration.

  <img src="../assets/images/export-layout.png" 
       class="fancy-image" 
       alt="Export Layout" 
       style="width: 100%; max-width: 100%;">

Click **Generate CSV** to sync all widgets and prepare the layout file. 

  <img src="../assets/images/export-layout2.png" 
       class="fancy-image" 
       alt="Export Layout 2" 
       style="width: 100%; max-width: 100%;">

Once generated, click **Download CSV** to save the file to your machine. This file can be used to restore your dashboard layout in a future session.

  <img src="../assets/images/export-layout3.png" 
       class="fancy-image" 
       alt="Export Layout 3" 
       style="width: 100%; max-width: 100%;">

#### 2.5 Import Layout
Click **Import Layout** to restore a previously saved layout.

  <img src="../assets/images/import-layout.png" 
       class="fancy-image" 
       alt="Import Layout" 
       style="width: 100%; max-width: 100%;">

Click **Browse Files** and select your layout CSV file. Once uploaded, your file will appear in the panel.

  <img src="../assets/images/import-layout2.png" 
       class="fancy-image" 
       alt="Import Layout 2" 
       style="width: 100%; max-width: 100%;">

Click **Confirm Import** to restore your dashboard layout. Your widgets will be restored to their previous configuration.

  <img src="../assets/images/import-layout3.png" 
       class="fancy-image" 
       alt="Import Layout 3" 
       style="width: 100%; max-width: 100%;">

---

### 3. Selecting a Product

Each widget has its own product selection, allowing you to compare different products across widgets simultaneously. Click the **Select Product** button on any widget to open the selection panel. There are two modes: Concise and Verbose.

  <img src="../assets/images/select-product.png" 
       class="fancy-image" 
       alt="Select Product" 
       style="width: 100%; max-width: 100%;">

#### 3.1 Concise Mode
Concise mode allows you to select a product directly by its SKU code. 

  <img src="../assets/images/select-product2.png" 
       class="fancy-image" 
       alt="Select Product" 
       style="width: 100%; max-width: 100%;">

Once a SKU is selected, you can then filter by the customers who have purchased that product.

  <img src="../assets/images/select-product3.png" 
       class="fancy-image" 
       alt="Select Product" 
       style="width: 100%; max-width: 100%;">

Click **Confirm Config** to apply the selection to the widget.

  <img src="../assets/images/select-product4.png" 
       class="fancy-image" 
       alt="Select Product" 
       style="width: 100%; max-width: 100%;">

#### 3.2 Verbose Mode
Verbose mode lets you filter down to a product step by step:

- **Top Brand** — e.g. Coca-Cola, Dr Pepper, Fanta
- **Flavour**
- **Pack Type** — e.g. PET, Can
- **Pack Size** — e.g. 330mL, 500mL, 1250mL
- **Units per Package** — e.g. x8, x12

  <img src="../assets/images/select-product5.png" 
       class="fancy-image" 
       alt="Select Product" 
       style="width: 100%; max-width: 100%;">

Click **Confirm Config** to apply the selection to the widget.

  <img src="../assets/images/select-product6.png" 
       class="fancy-image" 
       alt="Select Product" 
       style="width: 100%; max-width: 100%;">

#### 3.3 Date Range
Both modes allow you to set the date range used by the widget.

  <img src="../assets/images/select-product7.png" 
       class="fancy-image" 
       alt="Select Product" 
       style="width: 100%; max-width: 100%;">

---

### 4. Widget Types

#### 4.1 KPI
The KPI widget displays total sales over a selected date range, alongside a percentage change compared to the equivalent preceding period. For example, selecting a 30-day range will show total sales for that period versus the 30 days prior.

  <img src="../assets/images/kpi.png" 
       class="fancy-image" 
       alt="KPI" 
       style="width:92%; max-width: 100%;">

#### 4.2 Forecast
The Forecast widget displays a chart projecting future sales from a selected date range. Use **Forecast Config** to adjust how far into the future the forecast extends, and **Promotional Config** to specify promotional periods within the forecast.

  <img src="../assets/images/forecast.png" 
       class="fancy-image" 
       alt="Forecast" 
       style="width:62%; max-width: 100%;">

#### 4.3 Decomposition
The Decomposition widget breaks the sales data down into four components across separate charts: trend, seasonality, promotional uplift, and residuals. You can select a date range to focus on a specific portion of the data.

  <img src="../assets/images/decomposition.png" 
       class="fancy-image" 
       alt="Decomposition" 
       style="width:100%; max-width: 100%;">

#### 4.4 Predicted vs Observed
This widget overlays the model's predictions against actual recorded sales on a single chart, allowing you to visually assess how well the model fits historical data. A date range selector is available to zoom into a specific period.

  <img src="../assets/images/predicted-vs-observed.png" 
       class="fancy-image" 
       alt="Predicted Vs. Observed" 
       style="width:65%; max-width: 100%;">

#### 4.5 Backtest Performance
The Backtest Performance widget evaluates model accuracy using Prophet's rolling cross-validation method, which trains the model on progressively larger historical windows and tests its forecasts against actual observations. This simulates real-world forecasting conditions and produces three error metrics:

- **RMSE** — Root Mean Square Error
- **MAPE** — Mean Absolute Percentage Error
- **MAE** — Mean Absolute Error
  
  <img src="../assets/images/backtest-performance.png" 
       class="fancy-image" 
       alt="Backtest Performance" 
       style="width:70%; max-width: 100%;">

---

### 5. Cannibalisation Analysis *(Beta)*

The Predicted Vs. Observed widget offers an optional **Enable Cannibalisation** toggle. When enabled, a LightGBM model is used in an attempt to account for cannibalisation effects and improve forecast accuracy.

> ⚠️ **This feature is currently in beta.** Results may be inaccurate and should be interpreted with caution.

<img src="../assets/images/enable-cannibalisation.png" 
     class="fancy-image" 
     alt="Enable Cannibalisation" 
     style="width:40%; max-width: 100%;">

</div>

---



## Deployment Manual

<div class="section" markdown="1">

### Prerequisites

Before you begin, ensure you have the following installed on your machine:

- **Git** — [https://git-scm.com/downloads](https://git-scm.com/downloads)
- **Python 3.8+** — [https://www.python.org/downloads](https://www.python.org/downloads)

> **Note:** During Python installation on Windows, make sure to check **"Add Python to PATH"**.

---

### Step 1: Clone the Repository

Open a terminal (macOS/Linux) or Command Prompt / PowerShell (Windows) and run:

```bash
git clone https://github.com/gw3nnipi3/baseline-sales-modelling.git
cd baseline-sales-modelling
```

---

### Step 2: Create a Virtual Environment

A virtual environment keeps the project's dependencies isolated from the rest of your system.


```bash
python -m venv .venv
```

---

### Step 3: Activate the Virtual Environment

**macOS / Linux:**
```bash
source .venv/bin/activate
```

**Windows (Command Prompt):**
```bash
.venv\Scripts\activate.bat
```

**Windows (PowerShell):**
```bash
.venv\Scripts\Activate.ps1
```

> Once activated, your terminal prompt should show `(.venv)` at the beginning, confirming the environment is active.

---

### Step 4: Install Dependencies

With the virtual environment active, install the required packages:

```bash
pip install -r requirements.txt
```

This may take a few minutes depending on your internet speed.

---

### Step 5: Run the Application

Start the Streamlit dashboard:

```bash
streamlit run dashboard/app.py
```

Once running, Streamlit will output something like:

```
  Local URL: http://localhost:8501
  Network URL: http://192.168.x.x:8501
```

Open the **Local URL** in your browser to access the dashboard.

---

### Stopping the Application

To stop the application, press `Ctrl + C` in the terminal.

To deactivate the virtual environment afterwards:

```bash
deactivate
```

---

### Troubleshooting

**`python` not found**

Ensure Python is installed and added to your system PATH. Try restarting your terminal after installation.

**`pip install` fails**

Try upgrading pip first, then re-run the install:
```bash
pip install --upgrade pip
pip install -r requirements.txt
```

**Streamlit not found**

Make sure your virtual environment is active (you should see `(.venv)` in your prompt) before running the Streamlit command.

**Port 8501 already in use**

Run the app on a different port:
```bash
streamlit run dashboard/app.py --server.port 8502
```

</div>

---

## Legal & Compliance

<div class="section" markdown="1">

### Data Confidentiality

#### Overview

The Baseline Sales Dashboard processes proprietary sales data supplied by the user. This data is commercially sensitive and confidential in nature. The application does not collect, transmit, or store any data externally — all processing is performed locally on the device running the application.

#### Data Handling

- **Local Processing Only** — All uploaded data is processed entirely on the device running the application. No data is sent to external servers or third-party services.
- **Local Storage Only** — Uploaded CSV / XLSX files are stored in the `data/` folder on the device running the application. No data is transmitted to external servers or third-party services.
- **No Personal Data** — The application does not process any personally identifiable information (PII). As such, the application does not fall within the scope of GDPR data processing obligations.

#### User Responsibilities

Users are responsible for ensuring they have the appropriate authorisation to upload and process any data used within the application. Proprietary or commercially sensitive data such as retail sales figures should only be used in accordance with the relevant data sharing agreements and confidentiality obligations between the user and the data owner.

---

### External Libraries

#### Licensing Information

All external libraries used in the Baseline Sales Dashboard are open-source and available for commercial use.

#### Backend Libraries

| Library | License | Commercial Use |
|---|---|---|
| Prophet | MIT License | ✅ Permitted |
| LightGBM | MIT License | ✅ Permitted |
| pandas | BSD 3-Clause | ✅ Permitted |
| NumPy | BSD 3-Clause | ✅ Permitted |
| Streamlit | Apache License 2.0 | ✅ Permitted |
| matplotlib | PSF License | ✅ Permitted |
| plotly | MIT License | ✅ Permitted |

#### Compliance Summary

- All external libraries used in this project are available for commercial use.
- All libraries are licensed as open-source (MIT, BSD 3-Clause, Apache 2.0, PSF).

---

### Source Code License

The Baseline Sales Dashboard is a closed-source application developed under University College London. While the application is available for use, its source code, model configurations, and internal processing logic are not publicly accessible.

</div>

---

## Monthly Video

<div class="section" markdown="1">
This project’s progress and technical milestones have been documented in monthly video summaries. These recordings provide a visual walkthrough of our iterative development process, from initial data cleaning to the final dashboard deployment.

🚀 [`Link to Progress Videos`](https://liveuclac-my.sharepoint.com/:f:/r/personal/zcabxng_ucl_ac_uk/Documents/Monthly%20Update%20Videos?csf=1&web=1&e=0ZNigy)
</div>
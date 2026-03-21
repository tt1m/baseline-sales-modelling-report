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

---

### 2. Getting Started

#### 2.1 Upload Dataset
Before adding any widgets, upload your dataset using the Upload Dataset button. Your file must be a CSV formatted to the Nielsen standard. Once uploaded, the dataset will be available for all widgets.

#### 2.2 Add Widget
Click Add Widget to create a new panel on the dashboard. You will be prompted to enter a widget title, select your data source (your uploaded CSV), and choose a display type: KPI, Forecast, Decomposition, Predicted vs Observed, or Backtest Performance.

#### 2.3 Clear All
Clicking Clear All resets the dashboard, removing all widgets and returning the layout to a blank state. This cannot be undone, so ensure you have exported your layout before clearing.

#### 2.4 Export Layout
Your current dashboard layout can be saved by clicking Export Layout. This downloads a CSV file that captures your widget configuration, allowing you to restore it in a future session.

#### 2.5 Import Layout
To restore a previously saved layout, click Import Layout and select your exported CSV file. All widgets will be restored to their previous configuration.

---

### 3. Selecting a Product

Each widget has its own product selection, allowing you to compare different products across widgets simultaneously. There are two ways to select a product: Concise and Verbose.

#### 3.1 Concise Mode
Concise mode allows you to select a product directly by its SKU code. Once a SKU is selected, you can then filter by the customers who have purchased that product.

#### 3.2 Verbose Mode
Verbose mode lets you filter down to a product step by step:
- **Top Brand** — e.g. Coca-Cola, Dr Pepper
- **Flavour**
- **Pack Type** — e.g. PET, can
- **Pack Size**
- **Units per Package** — e.g. 8 or 12 units

#### 3.3 Date Range
Both modes allow you to set a start date, which controls the date range used by the widget.

---

### 4. Widget Types

#### 4.1 KPI
The KPI widget displays total sales over a selected date range, alongside a percentage change compared to the equivalent preceding period. For example, selecting a 30-day range will show total sales for that period versus the 30 days prior.

#### 4.2 Forecast
The Forecast widget displays a chart projecting future sales from a selected start date. The model generates a forecast for the coming months based on historical patterns in the data.

#### 4.3 Decomposition
The Decomposition widget breaks the sales data down into four components across separate charts: trend, seasonality, promotional uplift, and residuals. You can select a date range to focus on a specific portion of the data.

#### 4.4 Predicted vs Observed
This widget overlays the model's predictions against actual recorded sales on a single chart, allowing you to visually assess how well the model fits historical data. A date range selector is available to zoom into a specific period.

#### 4.5 Backtest Performance
The Backtest Performance widget evaluates model accuracy using Prophet's rolling cross-validation method, which trains the model on progressively larger historical windows and tests its forecasts against actual observations. This simulates real-world forecasting conditions and produces three error metrics:
- **RMSE** — Root Mean Square Error
- **MAPE** — Mean Absolute Percentage Error
- **MAE** — Mean Absolute Error

---

### 5. Cannibalization Analysis *(Beta)*

Each widget offers an optional Enable Cannibalization toggle. When enabled, a LightGBM model analyses the residuals from the Prophet forecast in an attempt to account for cannibalization effects and improve forecast accuracy.

> ⚠️ **This feature is currently in beta.** Results may not be fully reliable and should be interpreted with caution.

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

The Baseline Sales Dashboard processes proprietary sales data supplied by the user. This data is commercially sensitive and confidential in nature. The application does not collect, transmit, or store any data externally — all processing is performed locally on the user's machine.

#### Data Handling

- **Local Processing Only** — All uploaded data is processed entirely on the user's device. No data is sent to external servers or third-party services.
- **No Persistent Storage** — Uploaded CSV files are loaded into memory for the duration of the session only. No data is written to disk or retained after the session ends.
- **No Personal Data** — The application does not process any personally identifiable information (PII). As such, the application does not fall within the scope of GDPR data processing obligations.

#### User Responsibilities

Users are responsible for ensuring they have the appropriate authorisation to upload and process any data used within the application. Proprietary or commercially sensitive data such as retail sales figures should only be used in accordance with the relevant data sharing agreements and confidentiality obligations between the user and the data owner.

---

### External Libraries

#### Licensing Information

All external libraries used in the Baseline Sales Dashboard are open-source and available for commercial use.

##### Backend Libraries

| Library | License | Commercial Use |
|---|---|---|
| Prophet | MIT License | ✅ Permitted |
| LightGBM | MIT License | ✅ Permitted |
| pandas | BSD 3-Clause | ✅ Permitted |
| NumPy | BSD 3-Clause | ✅ Permitted |
| Streamlit | Apache License 2.0 | ✅ Permitted |
| matplotlib | PSF License | ✅ Permitted |

##### Compliance Summary

- All external libraries used in this project are available for commercial use.
- All libraries are licensed as open-source (MIT, BSD 3-Clause, Apache 2.0, PSF).

---

### Source Code License

The Baseline Sales Dashboard is a closed-source application developed under University College London. While the application is available for use, its source code, model configurations, and internal processing logic are not publicly accessible.

</div>

---

## Development Blog

<div class="section" markdown="1">

*   **Weeks 1-3:** Problem identification and stakeholder interviews. Defined "Baseline Recovery" as the primary objective.
*   **Weeks 4-6:** Data cleaning and exploratory data analysis (EDA). Identified seasonal non-stationarity.
*   **Weeks 7-9:** Model development (SARIMAX for baselines, LightGBM for cannibalisation). Iterative tuning using MAPE metrics.
*   **Weeks 10-12:** Frontend development (Streamlit). Implemented modular tabs for different user personas.
*   **Weeks 13-14:** Final User Acceptance Testing (UAT) and documentation assembly.
</div>

---

## Monthly Video

<div class="section" markdown="1">
This project’s progress and technical milestones have been documented in monthly video summaries. These recordings provide a visual walkthrough of our iterative development process, from initial data cleaning to the final dashboard deployment.

🚀 [`Link to Progress Videos`](https://liveuclac-my.sharepoint.com/:f:/r/personal/zcabxng_ucl_ac_uk/Documents/Monthly%20Update%20Videos?csf=1&web=1&e=0ZNigy)
</div>
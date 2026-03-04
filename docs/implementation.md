---
title: Implementation
icon: lucide/rocket
hide:
  - navigation
---

# Implementation

*This section documents the technical implementation of the dashboard, outlining the core libraries, data pipelines, and modeling logic used to transform raw Nielsen sales data into actionable business intelligence.*

---

## Data Processing & Seasonal Decomposition
**Libraries Used:** `pandas`, `numpy`, `statsmodels.tsa.seasonal`

**Implementation:**
FMCG data from Nielsen is highly noisy. Before modelling, we built a data pipeline to clean the data, handle missing weeks, and extract underlying seasonal components. We utilize `statsmodels` to perform a Time Series Decomposition, which splits the raw volume data into three distinct parts: **Trend**, **Seasonality**, and **Residuals (Noise)**. This allows analysts to visually isolate recurring seasonal spikes from actual market growth.

```python
import pandas as pd
from statsmodels.tsa.seasonal import seasonal_decompose

# Load and prepare time-series data
df = pd.read_csv("nielsen_sales_data.csv", parse_dates=['Week'], index_col='Week')
sku_data = df[df['SKU'] == '208289'] 

# Decompose the time series (Additive model)
decomposition = seasonal_decompose(sku_data['Total_Volume'], model='additive', period=52)
```

---

## Baseline Sales Forecasting
**Libraries Used:** `statsmodels.tsa.statespace.sarimax`

**Implementation:**
To establish what "normal" sales look like without interventions, we implemented a SARIMAX model. 
* **Handling Non-Stationarity:** The `I` (Integrated) and Seasonal components handle the inherent seasonal nature of the data.
* **Isolating Promotions:** We pass the "promotion flag" to the model as an exogenous variable (`exog`). By doing this, the model learns the exact weight of a promotion. To predict the *baseline*, we simply ask the model to forecast while artificially setting the promotion flag to `0`.

```python
from statsmodels.tsa.statespace.sarimax import SARIMAX

# Define target variable and exogenous variables (Promotions)
y = sku_data['Total_Volume']
X = sku_data[['Promotion_Flag']]

# Train SARIMAX model
model = SARIMAX(y, exog=X, order=(1, 1, 1), seasonal_order=(1, 1, 0, 52))
fitted_model = model.fit(disp=False)

# Recover baseline: Predict sales assuming NO promotions
baseline_exog = X.copy()
baseline_exog['Promotion_Flag'] = 0 
baseline_forecast = fitted_model.predict(exog=baseline_exog)
```

---

## Cannibalisation Modelling
**Libraries Used:** `lightgbm`, `scikit-learn`

**Implementation:**
Understanding cannibalisation requires capturing non-linear relationships across multiple products. We implemented LightGBM for this task. The key to this implementation was **feature engineering**: we created lag features (sales from previous weeks) and cross-pricing features before passing them to the gradient-boosting regressors to predict how a promotion on one SKU impacts the volume of another.

---

## Interactive Dashboard
**Libraries Used:** `streamlit`

**Implementation:**
To serve different stakeholders (Marketing, Analysts, Commercial), we built a modular frontend using Streamlit. To handle large FMCG datasets efficiently, we implemented Streamlit’s `@st.cache_data` decorator, which caches the Nielsen data into memory on the first load. We also used `st.session_state` to allow users to dynamically switch between specific SKUs without losing their filtered parameters.

---

## Dynamic Data Visualisation
**Libraries Used:** `streamlit.line_chart`, `streamlit.bar_chart`

**Implementation:**
Rather than relying on external libraries, we utilized Streamlit’s native charting functions (`st.line_chart` and `st.bar_chart`) to maintain a lightweight, fast-loading interface. These charts are inherently interactive, allowing users to hover over data points for specific values and automatically resizing to the user's browser viewport. By mapping our `baseline_forecast` and `actual_sales` arrays directly to these native components, we provided a seamless visual comparison of core demand versus promotional impact.
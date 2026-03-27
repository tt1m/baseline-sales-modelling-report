---
title: Research
hide:
    - navigation
---

# Research

*This section reviews existing tools and projects relevant to this application, evaluates alternative technology choices, and justifies the decisions made across algorithms, frameworks, and libraries.*

---

## Related Projects Review

<div class="section" markdown="1">

This project has two core components:

1. **Machine Learning Backend** — A time series model that decomposes historical weekly retail sales into         promotional uplift, seasonality, trend, and cannibalisation to estimate baseline demand, and produces sales forecasts.

2. **Interactive Dashboard** — An application allowing users to
   explore model outputs, forecasts, and validation metrics visually.

---

### Backend / Modelling

#### 1. NielsenIQ Byzzer

<div style="display: flex; gap: 1rem; justify-content: center; align-items: flex-start;">
  <img src="/assets/images/nielsenbyzzer.png" 
       class="fancy-image" 
       alt="NielsenIQ" 
       style="width: 370px; max-width: 100%;">
       
  <img src="/assets/images/nielsenbyzzer2.png" 
       class="fancy-image" 
       alt="NielsenIQ 2" 
       style="width: 370px; max-width: 100%;">
</div>

A subscription analytics platform built on Nielsen retail measurement data, which is the
same underlying data source used in this project. It is widely used by Consumer Packaged Goods (CPG) brands
and Fast-Moving Consumer Goods (FMCG) manufacturers to monitor market performance and promotional effectiveness.

**Main Features:**

- Weekly alerts covering market share, pricing, distribution, and promotion efficiency
  across over 90,000 stores
- Smart Reports identifying key business drivers across price, promotion, and assortment
- Pre-built dashboards for category and competitive performance tracking

**What can be learned:**

Byzzer is a descriptive reporting platform, and only shows what happened but does not
model why. It lacks automated baseline estimation, time series decomposition, or
promotional uplift quantification. This project fills that gap: rather than
reporting on observed sales, the Prophet model actively separates the underlying
demand drivers to estimate what sales would have been without promotions.

---

#### 2. o9 Solutions 

  <img src="/assets/images/o91.png" 
       class="fancy-image" 
       alt="NielsenIQ" 
       style="width: 600px; max-width: 100%;">

An enterprise AI platform used by global FMCG companies including Nestlé, Walmart,
and Unilever for demand planning, trade promotion management, and supply chain
optimisation.

**Main Features:**

- Trade promotion planning, evaluation, and Profit and Loss (P&L) simulation in a unified platform
- ML-driven demand forecasting incorporating sales history, seasonality, and promotions
- Scenario planning tools for assessing the impact of pricing and promotional decisions

**What can be learned:**

  <img src="/assets/images/o92.png" 
       class="fancy-image" 
       alt="NielsenIQ 2" 
       style="width: 700px; max-width: 100%;">

o9 is a closed SaaS platform that does not expose its underlying model architecture
or allow clients to inspect or modify the forecasting logic directly. This project provides Coca-Cola
with full documentation of the entire methodology, including how the Prophet and LightGBM model
is structured, how promotional regressors are encoded, and how performance is
validated. This transparency allows the client to understand and challenge every
modelling decision, which an enterprise platform cannot offer.

---

### Dashboard / Visualisation

#### 3. Microsoft Power BI 

<img src="/assets/images/microsoftbi.png" 
     alt="Microsoft BI" 
     style="float: right; width: 200px; max-width: 40%; margin: 0 0 1rem 1rem; border-radius: 8px;">

One of the most widely adopted BI (Business Intelligence) platforms globally, commonly deployed in FMCG
for consolidating sales, pricing, and promotional data into interactive dashboards.

**Main Features:**

- Real-time sales performance tracking across SKUs, regions, and channels
- Period-over-period variance analysis (YoY, MTD, WTD)
- Drag-and-drop report building with broad integration support for SQL databases,
  ERP systems, and Excel

**What can be learned:**

Power BI is a general-purpose BI tool not designed to render ML model outputs directly.
While Python script visuals and Azure ML connectors can be used to surface model outputs,
this introduces additional architectural overhead and a separate scripting layer.
Streamlit was chosen for this project because it renders Prophet outputs, including
decomposed forecast components, predicted vs. observed sales overlays, and cross-validation
performance metrics, directly from Python, with no intermediate transformation layer required.

---

#### 4. Tableau 

<img src="/assets/images/tableau.png" 
     alt="Microsoft BI" 
     style="float: right; width: 200px; max-width: 40%; margin: 0 0 1rem 1rem; border-radius: 8px;">

An industry-leading visualisation platform widely used across retail and FMCG.
A notable deployment is Ocado Retail's supplier analytics platform, where Tableau
gives FMCG suppliers real-time visibility into product performance, promotions,
and customer shopping behaviour.

**Main Features:**

- Interactive drill-down dashboards for sales trends, promotion effectiveness,
  and customer behaviour analytics
- Real-time data connectivity with support for embedding dashboards into external
  supplier platforms
- Strong time-intelligence and geographic visualisation capabilities
- Built-in forecasting capability based on exponential smoothing (ETS), accessible directly within the UI

**What can be learned:**

Tableau includes native forecasting, but it is limited to exponential smoothing models
and does not support custom configurations such as promotional regressors, holiday effects,
or cross-validation diagnostics. While Prophet could technically be integrated via TabPy,
this adds significant architectural complexity. This project instead integrates the Prophet
model and dashboard into a single Streamlit application, meaning all visualisations are
directly coupled to live model outputs, including forecast components, cross-validation
metrics, and promotional uplift estimates, without requiring a separate BI tool or
scripting bridge to interpret pre-processed data.

</div>
---

## Technology Review

<div class="section" markdown="1">


### Project Review

To inform what technologies we select, we must first review our project requirements.

- **Sales Forecasting** — It is clear that our primary objective is to produce a sales forecasting model of high accuracy.
- **Sales Decomposition** — Our next goal is to isolate this sales prediction to different categories like *promotion uplift*, *seasonality*, *trend*, and *cannibalisation*.
- **Interactive BI Dashboard** — Finally, we need to deliver a data visualisation dashboard for the users to interact with.

---

### Model Comparison
As a starting point, our team evaluated several existing methods within the time series forecasting landscape.

#### ARIMA / SARIMA
Autoregressive Integrated Moving Average (ARIMA) was initially investigated but ruled out after visually identifying significant non-stationarity in the data. This was concretely confirmed through **Breusch-Pagan tests** for heteroscedasticity, which yielded p-values below the 0.05 threshold across all assessed categories: total Nielsen volume (9.09×10⁻⁸), the mean of the top 50 selling products (1.11×10⁻²), and the mean of the median 50 selling products (3.80×10⁻²). While techniques like log transformations could mitigate changing variance, they introduce unnecessary complexity. Furthermore, because our chosen model must account for promotional activity, neither ARIMA nor Seasonal ARIMA (SARIMA) is fit for the task.

> 📘 **Note:** The bottom 50 products were excluded to avoid setting an arbitrary cutoff. Many of these product codes totalled fewer than 100 sales over three years, making them unsuitable for consistent testing.

#### SARIMAX
Finally, within the ARIMA family, we considered Seasonal Autoregressive Integrated Moving Average with Exogenous Variables (SARIMAX). SARIMAX addresses the limitations of its predecessors by handling non-stationary data while incorporating **external covariates**, such as promotion indicators, into its forecasting. However, it still suffers from changing variance, requiring log transformations to stabilise the variance. Despite this, it remains a strong candidate.

#### Prophet ✓ **(Chosen for decomposition)**
Prophet, developed by Meta, is similar to SARIMAX, and can handle non-stationary data and include a dedicated parameter for holiday effects that can be repurposed to model promotional events.

Compared to SARIMAX, Prophet demonstrated a significant advantage in **computational speed**. While SARIMAX's latency is largely due to the `auto_arima` stepwise search for optimal parameters, bypassing this automated selection with fixed parameters would likely degrade accuracy across different products, making it a necessary but slow overhead. Furthermore, Prophet offers **native decomposition tools**, whereas SARIMAX requires manual parameter extraction and refitting via statsmodels, unnecessarily complicating the modelling pipeline.

Beyond speed gains, Prophet delivers comparable, if not better, predictive performance. We evaluated **Mean Average Percentage Error (MAPE)** and **Root Mean Square Error (RMSE)** for the top 10 selling SKU product codes. While the MAPE for SKU 641420 initially appeared alarming (peaking over 2000%), an inspection of the sales data revealed frequent dips to zero or near-zero volumes, which artificially inflated MAPE. As shown in *Figure 3*, Prophet outperformed SARIMAX in RMSE across **all 10 products** and achieved a better MAPE in **5 out of 10** instances (with outliers excluded for visualization).

<img src="/images/MAPE-RMSE-rollingmean.png" 
    class="fancy-image" 
    alt="Tableau 2" 
    style="width: 97%; max-width: 100%;">
*Figure 1: Rolling mean of MAPE and RMSE with a window of 4 weeks*

<img src="/images/MAPE-RMSE-meanaggregatewithoutlier.png" 
    class="fancy-image" 
    alt="Tableau 2" 
    style="width: 97%; max-width: 100%;">
*Figure 2: Mean aggregate MAPE and RMSE with outlier*

<img src="/images/MAPE-RMSE-meanaggregatewithoutoutlier.png" 
    class="fancy-image" 
    alt="Tableau 2" 
    style="width: 97%; max-width: 100%;">
*Figure 3: Mean aggregate MAPE and RMSE with outlier removed*

#### LightGBM ✓ **(Chosen for cannibalisation)**
While Prophet effectively models trends, seasonality, and promotional uplift, its **additive linear structure** is not well-suited for capturing the complex dynamics of cannibalisation. Because Prophet assigns fixed weights to each regressor, it cannot easily model non-linear dependencies between products. This 'if-then' relationship is more naturally captured by **gradient-boosted decision trees (GBDT)**. LightGBM was ultimately selected over XGBoost and CatBoost due to its superior **computational efficiency** and proven ability to map high-dimensional, non-linear interactions.

---

### Dashboard Framework Comparison

#### Traditional Web Development
A conventional web approach would involve a Python backend serving model outputs via a **REST API** with a separate front-end built in HTML, CSS, and JavaScript. While flexible, this would require significant front-end development effort outside the scope of the data science work.

#### Streamlit ✓ **(Chosen)**
Traditional BI tools such as Tableau and Power BI, while visually powerful, are often difficult to integrate with custom, iterative machine learning pipelines. This highlighted the need for a framework that tightly couples the model backend with the visualisation frontend. **Streamlit** converts Python scripts into interactive web applications with minimal code, satisfying exactly this requirement. It was chosen because it eliminated the need for any front-end development, allowing the team to focus entirely on the modelling work. Model outputs, charts, and validation metrics are rendered directly from Python with no additional engineering overhead.

---

### Programming Language

Python was chosen as it is the industry standard for data science and machine
learning. It has a rich ecosystem of libraries covering every aspect of this
project, from data manipulation and modelling to dashboard development, all
within a single language.

### Libraries
| Library | Purpose | Why Chosen |
|---|---|---|
| `prophet` | Time series forecasting & decomposition | Handles non-stationarity, native decomposition tools, promotional regressors |
| `lightgbm` | Cannibalisation modelling | Fast, memory-efficient, captures non-linear product interactions |
| `pandas` | Data manipulation | Industry standard for tabular data in Python |
| `numpy` | Numerical computation | Core dependency for array operations |
| `streamlit` | Dashboard and visualisation | Renders ML outputs directly from Python, no front-end needed |
| `matplotlib` | Exploratory plotting & Graphs in dashboard | Quick visualisation during model experimentation and used to plot graphs for dashbaord widgets |
| `statsmodels` | Statistical testing | Used for Breusch-Pagan heteroscedasticity tests |

</div>

---

## Summary of Technical Decisions


| Decision | Choice | Key Reason |
|---|---|---|
| Programming language | Python | Rich ML ecosystem, single language across all project components |
| Forecasting model | Prophet | Interpretable, handles non-stationarity and promotional regressors natively |
| Cannibalisation model | LightGBM | Captures non-linear product interactions, fast and memory-efficient |
| Dashboard framework | Streamlit | No front-end development required, renders ML outputs directly from Python |
| AutoML **rejected** | AutoGluon | Insufficient interpretability for client-facing outputs |
| Statistical model **replaced** | SARIMAX | Slower, requires log transformations, harder to scale across products |
</div>

---

## References

[1] Meta Platforms Inc., "Prophet," 2024. [Online].
    Available: https://facebook.github.io/prophet/

[2] Amazon Web Services, "AutoGluon," 2024. [Online].
    Available: https://auto.gluon.ai/

[3] Streamlit Inc., "Streamlit," 2024. [Online].
    Available: https://streamlit.io/

[4] NielsenIQ, "Byzzer," 2024. [Online].
    Available: https://nielseniq.com/global/en/landing-page/byzzer-retail-data-for-emerging-brands/

[5] o9 Solutions, "o9 Solutions," 2024. [Online].
    Available: https://o9solutions.com/

[6] Microsoft, "Power BI," 2024. [Online].
    Available: https://powerbi.microsoft.com/

[7] Tableau (Salesforce), "Tableau," 2024. [Online].
    Available: https://www.tableau.com/
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

1. **Machine Learning Backend** — The Prophet time series model decomposes weekly
   retail sales into trend, seasonality, promotional uplift, and residual noise
   to estimate baseline demand.

2. **Interactive Dashboard** — A Streamlit application allows stakeholders to
   explore model outputs, forecasts, and validation metrics visually.

---

### Backend / Modelling

#### 1. NielsenIQ Byzzer

<div style="display: flex; gap: 1rem; justify-content: center; align-items: flex-start;">
  <img src="/images/nielsenbyzzer.png" 
       class="fancy-image" 
       alt="NielsenIQ" 
       style="width: 370px; max-width: 100%;">
       
  <img src="/images/nielsenbyzzer2.png" 
       class="fancy-image" 
       alt="NielsenIQ 2" 
       style="width: 370px; max-width: 100%;">
</div>

A subscription analytics platform built on Nielsen retail measurement data, which is the
same underlying data source used in this project. It is widely used by CPG brands
and FMCG manufacturers to monitor market performance and promotional effectiveness.

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

  <img src="/images/o91.png" 
       class="fancy-image" 
       alt="NielsenIQ" 
       style="width: 600px; max-width: 100%;">

An enterprise AI platform used by global FMCG companies including Nestlé, Walmart,
and Unilever for demand planning, trade promotion management, and supply chain
optimisation.

**Main Features:**

- Trade promotion planning, evaluation, and P&L simulation in a unified platform
- ML-driven demand forecasting incorporating sales history, seasonality, and promotions
- Scenario planning tools for assessing the impact of pricing and promotional decisions

**What can be learned:**

  <img src="/images/o92.png" 
       class="fancy-image" 
       alt="NielsenIQ 2" 
       style="width: 700px; max-width: 100%;">

o9 is a closed SaaS platform that does not expose its underlying model architecture
or allow clients to inspect or modify the forecasting logic directly. This project provides Coca-Cola
with full documentation of the entire methodology, including how the Prophet model
is structured, how promotional regressors are encoded, and how performance is
validated. This transparency allows the client to understand and challenge every
modelling decision, which an enterprise platform cannot offer.

---

### Dashboard / Visualisation

#### 3. Microsoft Power BI 

  <img src="/images/microsoftpowerBI.jpeg" 
       class="fancy-image" 
       alt="MicrosoftPowerBI" 
       style="width: 600px; max-width: 100%;">

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

<div style="display: flex; gap: 1rem; justify-content: center; align-items: flex-start;">
  <img src="/images/tableau.png" 
       class="fancy-image" 
       alt="Tableau 1" 
       style="width: 370px; max-width: 100%;">
       
  <img src="/images/tableau2.png" 
       class="fancy-image" 
       alt="Tableau 2" 
       style="width: 370px; max-width: 100%;">
</div>

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

### Possible Solutions

Two broad approaches were considered:

1. **Statistical time series modelling** — Classical models such as SARIMAX decompose
   a time series into interpretable components but require manual parameter tuning
   and assume stationary data.

2. **Automated machine learning (AutoML)** — Platforms such as AutoGluon handle model
   selection and tuning automatically but offer limited interpretability over how
   forecasts are generated.

Prophet was chosen as it sits between both. It is interpretable and decomposable, without
requiring manual parameter specification.

---

### Algorithm Comparison

#### SARIMAX
A classical statistical model that extends ARIMA with seasonal and exogenous
variables. It was the first model trialled but was ultimately replaced due to
insufficient forecast accuracy and the need for manual parameter tuning across
every product SKU, making it difficult to scale.

#### AutoGluon
An AutoML framework developed by Amazon that automatically trains and ensembles
multiple models. It was considered early in the project but rejected because its
ensemble approach does not produce interpretable decomposed outputs, which is a core
requirement for this client-facing tool.

#### Prophet ✓ **(Chosen)**
An open-source forecasting model developed by Meta that decomposes a time series
into trend, seasonality, external regressors, and residual noise. It was chosen
because it requires no manual parameter tuning, handles promotional indicators
as regressors directly, and produces interpretable component outputs that can be
displayed in the dashboard.

---

### Dashboard Framework Comparison

#### Traditional Web Development
A conventional web approach would involve a Python backend serving model outputs
via a REST API with a separate front-end built in HTML, CSS, and JavaScript. While
flexible, this would require significant front-end development effort outside the
scope of the data science work.

#### Streamlit ✓ **(Chosen)**
Streamlit converts Python scripts into interactive web applications with minimal
code. It was chosen because it eliminated the need for any front-end development,
allowing the team to focus entirely on the modelling work. Model outputs, charts,
and validation metrics are rendered directly from Python with no additional
engineering overhead.

---

### Programming Language

Python was chosen as it is the industry standard for data science and machine
learning. It has a rich ecosystem of libraries covering every aspect of this
project, from data manipulation and modelling to dashboard development, all
within a single language.

### Libraries

| Library | Purpose | Why Chosen |
|---|---|---|
| **Prophet** | Time series forecasting | Decomposable, interpretable, handles promotions as regressors |
| **LightGBM** | Cannibalisation modelling | Fast and memory-efficient on tabular data |
| **pandas** | Data manipulation | Industry standard for tabular data in Python |
| **numpy** | Numerical computation | Core dependency for array operations |
| **Streamlit** | Dashboard and visualisation | Renders ML outputs directly from Python, no front-end needed |
| **matplotlib** | Exploratory plotting (notebooks only) | Quick visualisation during model experimentation |

</div>

---

## Summary of Technical Decisions

<div class="section" markdown="1">

| Decision | Choice | Key Reason |
|---|---|---|
| Forecasting algorithm | Prophet | Interpretable, no manual tuning, handles promotional regressors |
| Dashboard framework | Streamlit | No front-end development required |
| Programming language | Python | Rich ML ecosystem, easy to use |
| AutoML **rejected** | AutoGluon | Insufficient interpretability for client-facing outputs |
| Statistical model **replaced** | SARIMAX | Poor forecast accuracy, difficult to scale |
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
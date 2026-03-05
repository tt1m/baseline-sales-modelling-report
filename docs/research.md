---
title: Research
hide:
    - navigation
---

# Research

*This section reviews existing literature and industry standard methodologies for demand forecasting and details the technical rationale behind the final selection of our tools and frameworks.*

---

## Related Projects Review
To inform our approach, we evaluated several existing methodologies within the FMCG demand forecasting landscape:

*   **Promotional Lift Modelling (PLM):** Traditional industry approaches often rely on simple linear regression. Our review identified that while linear models are interpretable, they fail to capture the non-linear "halo" and "cannibalisation" effects inherent in supermarket data. This led us to investigate non-linear alternatives like Gradient Boosted Decision Trees.
*   **Time Series Decomposition Tools:** We reviewed existing open-source decomposition packages (e.g., `Facebook Prophet`, `statsmodels`). We found that while Prophet is automated, it often struggles with the high-frequency seasonal patterns of beverage sales compared to the more granular control offered by `SARIMAX` parameters.
*   **Interactive BI Dashboards:** We analyzed traditional BI tools (e.g., Tableau, PowerBI). While visually powerful, they are often difficult to integrate with custom, iterative machine learning pipelines. This highlighted the need for a framework that tightly couples the model backend with the visualization frontend, leading us to `Streamlit`.

---

## Technology Review
We assessed various technologies based on three criteria: **Predictive Power**, **Interactivity**, and **Development Velocity**.

*   **Modeling Frameworks:** We compared `SARIMAX` and `Exponential Smoothing (ETS)`. `SARIMAX` was chosen due to its ability to incorporate exogenous variables (promotion flags and pricing), which are critical for isolating baseline demand. For cross-product interactions, we compared `Random Forests` and `LightGBM`. We selected `LightGBM` for its superior performance on tabular data and its ability to handle feature interactions efficiently.
*   **Visualization Frameworks:** We compared `Dash (Plotly)`, `Shiny (R)`, and `Streamlit`. `Streamlit` was chosen because it allows the team to build a sophisticated, interactive dashboard using pure Python, minimizing the need for complex HTML/CSS/JavaScript and allowing us to focus on the data science components.

---

## Final Tech Stack
The following stack was selected for its robustness, industry adoption, and compatibility with the project's data-science-first focus:

| Component | Technology | Rationale |
|:---|:---|:---|
| **Language** | `Python 3.9+` | Standard for data science; extensive library support. |
| **Forecasting** | `Statsmodels` | Industry standard for SARIMAX time-series analysis. |
| **ML Engine** | `LightGBM` | High efficiency and performance for non-linear cannibalisation. |
| **Data Handling** | `Pandas / NumPy` | Core tools for data manipulation and vectorization. |
| **Dashboard** | `Streamlit` | Rapid development of reactive, web-based interfaces. |
| **Version Control** | `Git / GitHub` | Essential for team transparency and collaborative codebase management. |

---

## References
1.  **Hyndman, R.J., & Athanasopoulos, G. (2021).** *Forecasting: Principles and Practice, 3rd edition.* OTexts: Melbourne, Australia.
2.  **Statsmodels Documentation.** *Statespace models - SARIMAX.* (https://www.statsmodels.org/).
3.  **LightGBM Documentation.** *A highly efficient gradient boosting decision tree framework.* (https://lightgbm.readthedocs.io/).
4.  **Streamlit API Reference.** *Building high-performance data applications.* (https://docs.streamlit.io/).
5.  **NielsenIQ Methodology Guides.** Internal documentation provided by Coca-Cola regarding FMCG retail volume metrics.

---
title: Algorithms
icon: lucide/rocket
hide:
  - navigation
---
# Algorithms

*This section covers the technical core of the project, documenting the mathematical models used for forecasting, the data preprocessing pipeline, and the experimental results that validate our approach.*

---

## Models
Our predictive engine is built on a two-tier approach to isolate baseline demand and quantify commercial impact:

*   **Baseline Decomposition (SARIMAX):** We utilize the Seasonal Auto-Regressive Integrated Moving Average with eXogenous factors (SARIMAX) model. This is our primary engine for baseline recovery. The `SARIMAX(p, d, q)(P, D, Q)s` structure allows us to capture both the non-stationary trend and the 52-week annual seasonality inherent in FMCG retail data. By including `Promotion_Flag` as an exogenous variable, we train the model to learn the "uplift" attributed to marketing. To recover the baseline, we run an inference pass where all exogenous variables are set to zero, revealing the "organic" demand trajectory.
*   **Cannibalisation Modeling (Gradient Boosted Trees):** To move beyond univariate forecasting, we implemented `LightGBM` (Gradient Boosted Decision Trees). While SARIMAX handles the temporal aspect, LightGBM is trained on a wide feature set—including competitor pricing, cross-category discounts, and lagged sales—to learn non-linear relationships. This model identifies when a promotion on one SKU effectively "steals" volume from another, providing a granular view of the portfolio's ecosystem.

---

## Data
*   **Source:** The project utilizes Nielsen total volume sales data, provided by Coca-Cola.
*   **Preprocessing:** The data underwent a rigorous pipeline:
    *   **Imputation:** Missing weekly sales points were filled using a linear interpolation of neighboring weeks.
    *   **Feature Engineering:** We generated "Lag" features (e.g., $Sales_{t-1}, Sales_{t-2}$) to assist the Gradient Boosted models in understanding momentum.
    *   **Categorization:** Binary flags were created for promotional periods based on price thresholding (where price drops exceed a specified percentage).
    *   **Stationarity:** Log-transformation was applied to stabilize variance, and differencing was performed during SARIMAX initialization.

---

## Experiments
We conducted three primary experiments to validate our approach:
1.  **Backtesting the Baseline:** We trained our SARIMAX model on data up to the final 8 weeks and compared the forecast (with promotions removed) against actual non-promotional weeks. The model achieved a Mean Absolute Percentage Error (MAPE) of <12%.
2.  **Sensitivity Analysis:** We varied the promotional intensity within the model to ensure the "uplift" correlated logically with actual market performance. We confirmed that the model appropriately assigns higher uplift to deeper discounts.
3.  **Cross-Product Impact:** We tested the LightGBM model on two substitute SKUs (e.g., 500ml Pacific Punch Monster vs. alternative flavors). The experiment demonstrated that when the price of SKU A dropped, the model correctly predicted a decline in the volume of SKU B, validating our cannibalisation logic.

---

## Discussions
The experimental results confirm that separating signal from noise is not only possible but essential for accurate commercial planning. The SARIMAX-LightGBM hybrid approach bridges the gap between high-level trend forecasting and granular behavioral modeling. A key realization from our discussion was that stakeholders value "accuracy-with-transparency"; therefore, providing the seasonal decomposition components alongside the final forecast was critical to building user trust. While the model is highly effective for core portfolio items, we identified a limitation in forecasting "limited-time offers" or brand-new SKUs where insufficient historical data exists to establish a stable seasonal baseline.

---

## Conclusion
This project successfully transformed "messy" retail sales data into a structured Demand Intelligence tool. By delivering a decoupled baseline and an interactive Streamlit dashboard, we enabled Coca-Cola to distinguish organic growth from promotional volume. The implementation of SARIMAX and LightGBM models provides a scalable framework that can be expanded to cover the entire product portfolio. We have delivered not just a model, but a decision-making interface that caters to the diverse analytical needs of the business, from executive strategy to ground-level sales analysis.

---

## References
1.  **Box, G. E. P., Jenkins, G. M., Reinsel, G. C., & Ljung, G. M. (2015).** *Time Series Analysis: Forecasting and Control.* Wiley.
2.  **Ke, G., et al. (2017).** *LightGBM: A Highly Efficient Gradient Boosting Decision Tree.* Advances in Neural Information Processing Systems (NeurIPS).
3.  **Makridakis, S., Spiliotis, E., & Assimakopoulos, V. (2020).** *Statistical and Machine Learning Forecasting Methods: Concerns and Ways Forward.* PLOS ONE.
4.  **Statsmodels Development Team (2024).** *SARIMAX Results and Diagnostics.* (https://www.statsmodels.org/).
---
title: Algorithms
hide:
  - navigation
---

<script>
window.MathJax = {
  tex: {
    inlineMath: [['$', '$'], ['\\(', '\\)']]
  },
  svg: {
    fontCache: 'global'
  }
};
</script>

<script src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js"></script>

<script>
document.addEventListener("DOMContentLoaded", function () {
  if (window.MathJax) {
    MathJax.typesetPromise();
  }
});
</script>

# Algorithms

*This section presents the forecasting methodology used to estimate baseline demand from historical retail sales data. The project uses a time series forecasting model to separate organic demand patterns from promotional effects. The workflow consists of three stages: data preprocessing, model training using a decomposable forecasting model, and performance evaluation through backtesting and cross-validation experiments.*

---

## Prophet Time Series Model

<div class="section" markdown="1">

The forecasting model used in this project is **Prophet**, a decomposable time series forecasting algorithm developed by Meta for business forecasting problems such as retail demand and website traffic prediction.

For our project we use the **multiplicative mode** for the seasonality as we believe it better represent how seasonality and promotion interact with the trend of the sales as a multiplier rather than a fixed value. So the sales are calculated as following:

$$
y(t) = g(t) \times (1 + s(t) + h(t) + \beta X(t)) + \epsilon_{t}
$$

Where:

- \(y(t)\) represents the **observed value** at time *t*.
- \(g(t)\) represents the long-term **trend** component.
- \(s(t)\) represents **seasonal patterns** (e.g. weekly or yearly sales cycles).
- \(h(t)\) represents the **holiday effect**.
- \(\beta X(t)\) represents **external regressors**, such as promotional events.
- \(\epsilon_t\) represents **residuals** which could not be explained by the model.

The model is particularly suitable for retail sales data because it can automatically capture:

- long-term demand growth or decline,
- recurring seasonal sales cycles,
- sudden changes caused by marketing promotions.

In this project, promotional activities are incorporated into the model as **extra regressors**, allowing the algorithm to estimate the additional sales uplift caused by promotions. By isolating these effects, the model can approximate the **baseline demand**, defined as the expected sales volume in the absence of promotions.

The decomposable structure of Prophet also enables the dashboard to visualise different components of the forecast, including trend, seasonal demand patterns, promotion uplift, and residual error.

</div>

---

## Dataset

<div class="section" markdown="1">

The dataset used in this project consists of **weekly retail sales data provided by Coca-Cola** from 2023-2025, derived from Nielsen retail measurement services. The dataset contains historical product sales information across consecutive weeks and includes attributes such as:

- product SKU code
- customer identifier
- weekly sales volume
- promotional indicators
- time index (year and week)

These variables allow the system to analyse product-level demand and identify how promotional campaigns influence sales patterns.

</div>

---

## Data Preprocessing

<div class=section markdown="1">

Several preprocessing steps were applied before model training to ensure that the time series data could be used effectively by the forecasting algorithm.

### Missing Value Handling

Retail sales datasets often contain missing weekly observations. To maintain continuity in the time series, missing values were filled using **linear interpolation**, which estimates values based on neighbouring observations.

### Time Index Conversion

The dataset originally used a `yearweek` format. This was converted into a standard datetime format to allow time-based modelling and visualization.

### Promotion Indicator Processing

Promotional periods were encoded as **binary indicator variables**, which were later used as external regressors in the forecasting model. This allowed the algorithm to distinguish between normal demand and promotion-driven sales spikes.

### Data Filtering

The dashboard allows users to filter the dataset by product SKU, customer, and date range. This enables the forecasting model to be applied to specific subsets of the data.

</div>
---

## Training and Testing Sets

<div class=section markdown="1">

For **Prophet**, its built-in cross-validation function was used to evaluate model performance. This approach utilizes Simulated Historical Forecasts (SHF) based on a “rolling origin” or expanding window evaluation. The model initially trains on a specified **365-day baseline**, then incrementing at **90-day periods**, and finally generates forecasts for a **180-day horizon**. These forecasts are then compared against actual historical data. This process iterates until the end of the dataset is reached, and the resulting errors are aggregated to calculate *RMSE*, *MAPE*, and *MAE*. These metrics are then visualized to observe how forecast accuracy fluctuates as the horizon extends [2]. 

For **LightGBM** (Cannibalisation model), rolling origin was used to evaluate model performance.

</div>

---

## Experiment Design

<div class="section" markdown="1">

Two primary experiments were conducted to evaluate the forecasting performance of the system:

1. **Predicted vs Observed Evaluation** —
   The model was trained on historical data and used to generate predictions for the selected time window. Predicted sales values were compared with observed sales values to visually assess model accuracy.
2. **Time Series Cross-Validation** —
   To provide a more rigorous evaluation, Prophet’s rolling cross-validation method was used. This approach repeatedly trains the model on progressively larger historical windows and generates forecasts for future horizons. The resulting predictions are compared against actual observations.

This approach simulates real-world forecasting conditions and provides a more reliable measure of model performance.

</div>

---

## Performance Evaluation Metrics

<div class="section" markdown="1">

Forecast accuracy was measured using three commonly used regression metrics:

<div class="metric-toggle">

<input type="checkbox" id="mae">

<label for="mae" class="metric-title">
  <span class="metric-arrow">▸</span>
  <span class="metric-text">Mean Absolute Error (MAE)</span>
</label>

<div class="metric-content">

Mean Absolute Error measures the **average absolute difference** between predicted and actual values.

$$
MAE = \frac{1}{n} \sum |y_i - \hat{y}_i|
$$

</div>

</div>

<div class="metric-toggle">

<input type="checkbox" id="rmse">

<label for="rmse" class="metric-title">
  <span class="metric-arrow">▸</span>
  <span class="metric-text">Root Mean Squared Error (RMSE)</span>

</label>

<div class="metric-content">

Root Mean Squared Error measures the square root of the **average squared differences** between predicted and actual values.

$$
RMSE = \sqrt{\frac{1}{n}\sum (y_i - \hat{y}_i)^2}
$$

RMSE **penalises large prediction errors** more heavily than MAE because errors are squared before averaging. This makes it particularly useful when large deviations from actual values are undesirable.

</div>

</div>

<div class="metric-toggle">

<input type="checkbox" id="mape">

<label for="mape" class="metric-title">
  <span class="metric-arrow">▸</span>
  <span class="metric-text">Mean Absolute Percentage Error (MAPE)</span>

</label>

<div class="metric-content">

Mean Absolute Percentage Error measures prediction accuracy as a **percentage of the actual values**.

$$
MAPE = \frac{100}{n}\sum \left|\frac{y_i - \hat{y}_i}{y_i}\right|
$$

MAPE expresses the error relative to the magnitude of the observed data, making it easier to interpret model accuracy across different scales.

</div>

</div>

</div>
---


## Experimental Results

<div class="section" markdown="1">

The results of the cross-validation experiments were visualised using Prophet’s built-in performance evaluation functions. These plots show how forecast accuracy changes as the **prediction horizon** increases.

Example results observed during model evaluation include:

| Metric | Example Result |
|------|------|
| MAE | ~45 units |
| RMSE | ~67 units |
| MAPE | ~11–13% |

These values indicate that the model produces **reasonably accurate forecasts** for weekly retail sales data.

</div>

---

## Discussion

<div class="section" markdown="1">

While the Prophet model performs well for most product categories, some forecasting errors were observed in specific scenarios.

Prophet consistently struggle to capture the demand spike during **significant promotional periods** due to a **lack of granularity**. Because the promotion indicator is binary, it fails to distinguish between varying scales of promotion. For instance, a nationwide billboard campaign and a minor in-store price reduction are both represented as a “1”, preventing the model from accounting for **varying levels of promotional intensity**.

Another challenge occurs with **limited historical data**, such as new product launches. Time series models rely on historical patterns to learn seasonality and trend behaviour, and insufficient data can reduce prediction accuracy.

Conversely, our cannibalization model has demonstrated less success. While this can be partially attributed to the time constraint when working on the model and a limited dataset (155 observations per SKU), several structural factors likely impede its performance.

First, for products where the base Prophet model is already highly accurate, the resulting residuals would consist primarily of **noise**. By feeding these residuals into a secondary model, the system is forced to find patterns within the noise, which not only yields poor performance on the secondary model but also **degrades the accuracy of the combined model**.

Furthermore, the design of our **residual-stacking architecture** introduces significant **error propagation**. Because the secondary model is trained on the first model's errors, it inherits any underlying biases or miscalculations from Prophet. In this configuration, the cannibalization model focuses on correcting Prophet’s error rather than learning the **actual drivers of total sales volume**. A better alternative might involve training the cannibalization model directly on total sales volume as a primary feature, rather than using residual.

To improve performance in future work, several enhancements could be explored:

- incorporating additional external regressors such as pricing or competitor promotions,
- integrating hierarchical forecasting methods for multi-product analysis,
- experimenting with hybrid models that combine statistical forecasting with machine learning techniques.

</div>

---

## Conclusion

<div class="section" markdown="1">

This project demonstrates how time series forecasting can be applied to retail sales data to estimate **baseline demand** and evaluate **promotional effectiveness**. By leveraging the Prophet forecasting model, the system can decompose observed sales into interpretable components including trend, seasonal demand, promotional uplift, and residual error.

The integration of the forecasting model into an interactive **Streamlit dashboard** enables business stakeholders to explore sales patterns, compare predicted and observed values, and evaluate forecast performance through visual analytics. The results show that the proposed approach provides a **practical and interpretable solution** for analysing retail demand and supporting data-driven decision making.

</div>

---

## References

[1] S. J. Taylor and B. Letham, “Forecasting at scale,” *The American Statistician*, vol. 72, no. 1, pp. 37–45, 2018.

[2] Meta Platforms Inc., “Prophet: Forecasting at Scale,” 2024. [Online]. Available: https://facebook.github.io/prophet/

[3] R. J. Hyndman and G. Athanasopoulos, *Forecasting: Principles and Practice*, 3rd ed. Melbourne, Australia: OTexts, 2021.

[4] NielsenIQ, “Retail Measurement Services,” 2024.
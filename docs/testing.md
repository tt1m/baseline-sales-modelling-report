---
title: Testing
hide:
  - navigation
---

# Testing

*This section details the testing framework implemented to ensure the reliability, accuracy, and usability of the Coca-Cola Demand Intelligence tool. Our approach ensures that the statistical models are robust, the code pipeline is stable, and the final dashboard meets the strategic needs of business stakeholders.*

---

## Testing Strategy
Our testing strategy follows a "Pyramid" approach, prioritizing foundational stability before validating complex business outcomes:
*   **Base (Unit & Integration Testing):** Ensuring individual functions (data loaders, model trainers) work correctly.
*   **Middle (Model Accuracy Testing):** Quantifying the precision of our SARIMAX and LightGBM models.
*   **Top (User Acceptance Testing):** Ensuring the Streamlit dashboard meets the specific decision-making needs of our business stakeholders.

---

## Model Accuracy Testing
**Why:** In FMCG forecasting, the primary risk is "overfitting"—where a model treats a temporary promotional spike as the "new normal." We must verify that our model correctly separates baseline demand from promotional noise.

*   **Tools:** `scikit-learn.metrics` (RMSE, MAPE), `statsmodels` diagnostics.
*   **Methodology:** 
    1.  **Backtesting:** We withheld the last 8 weeks of historical data from the model as a "test set."
    2.  **Counterfactual Simulation:** We ran our SARIMAX model to forecast those 8 weeks while setting the `Promotion_Flag` to `0` (simulating a baseline).
    3.  **Error Calculation:** We compared our predicted baseline against periods where no promotions occurred using Mean Absolute Percentage Error (MAPE).
*   **Result:** The SARIMAX model achieved a MAPE of <12% for baseline forecasting.

---

## Unit and Integration Testing
**Why:** To ensure the data pipeline does not break during automated updates.

*   **Tools:** `pytest`
*   **Implementation:** We implemented automated test scripts to:
    *   Validate data types (ensuring `Volume` is always numeric).
    *   Verify data integrity (checking for missing `SKU_ID` or negative price values).
    *   Ensure the model trainer handles empty data frames without crashing.

---

## Responsive Design & Compatibility
**Why:** The dashboard must be accessible across diverse hardware, from warehouse tablets to executive laptops.

*   **Methodology:** We utilized browser-based emulation to test the Streamlit layout across various breakpoints (1920x1080, 1024x768, and mobile).
*   **Conclusion:** Streamlit’s responsive container system handles the grid structure well. We verified that the layout remains legible and functional on tablets, which are commonly used in commercial retail environments.

---

## User Acceptance Testing (UAT)
**Why:** To ensure the tool provides actionable insights for specific business roles.

### Simulated Testers
*   **Data Analyst:** Validated model residual plots and seasonal decomposition components.
*   **Marketing Manager:** Validated the promotional uplift quantification accuracy.
*   **Commercial Lead:** Validated portfolio-level summaries and cannibalisation impact toggles.

### Test Cases & Feedback
| Test Case | Description | Feedback / Result |
| :--- | :--- | :--- |
| **Baseline Accuracy** | Verify if the baseline "drops" during a known promotion. | **Pass:** Confirmed accurate signal isolation. |
| **Interactivity** | Switch between SKUs in under 2 seconds. | **Pass:** Achieved via caching strategy. |
| **Abstraction Level** | Marketing lead to identify uplift in one glance. | **Pass:** Refined dashboard to use metric cards. |

---

## Performance Testing
**Why:** To ensure the system remains responsive when scaling from a single product analysis to a multi-SKU portfolio view.

*   **Tools:** `time` module and Streamlit profiler.
*   **Methodology:** We measured "Time-to-Render" for the dashboard when loading varying volumes of data (1, 50, and 100 SKUs).
*   **Result:** The application remains stable and responsive (under 2s load time) up to 50 SKUs. Beyond 100 SKUs, rendering performance begins to degrade, leading us to implement a "Selection Limit" in the UI to prevent system overload.
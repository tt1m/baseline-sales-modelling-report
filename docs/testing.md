---
title: Testing
hide:
  - navigation
---

# Testing

*This section details the testing framework implemented to ensure the reliability, accuracy, and usability of the Coca-Cola Demand Intelligence tool. Our approach ensures that the statistical models are robust, the code pipeline is stable, and the final dashboard meets the strategic needs of business stakeholders.*


---

## Testing Strategy

The overall testing strategy combines **automated unit and integration testing**, model evaluation and performance checks by industry partners and our client. This ensures that each component of the system, from data ingestion to baseline forecasting, functions as expected individually and when integrated into the full system.

### Unit and Integration Testing

<div class="section" markdown="1">

Testing was conducted using the `pytest` framework to ensure both the correctness of individual functions and the reliability of the overall system.

At the function level, core modules such as `data_tools`, `prophet_model`, `ui_tools`, and `widget_helpers` were tested with controlled inputs to verify expected outputs. This included validating data transformations, KPI calculations, forecast outputs, and utility behaviours such as configuration handling and input parsing. Edge cases, such as empty datasets, were also tested to ensure proper error handling.

To keep tests efficient and independent, mocking was used for external dependencies such as data loading and forecasting models. This allowed the logic of each function to be verified without relying on expensive computations or UI runtime environments.

Integration between components was also tested by simulating realistic workflows, such as the data pipeline **(data loading → processing → forecasting)** and UI rendering logic. These tests ensured that modules interact correctly and that the correct functions are triggered based on widget configurations.

  <img src="/images/tests.png" 
       class="fancy-image" 
       alt="Tests" 
       style="width: 800px; max-width: 100%;"
       border: 0>

In total, **16 tests** were implemented across four modules, providing sufficient coverage of key functionality. All tests passed successfully, confirming that the system is stable, accurate, and functioning as intended.

</div>

---

### Test Coverage Summary

| Test File | Test Name | Description |
|----------|----------|------------|
| **test_data_tools.py** | `test_process_data` | Verifies that raw data is processed correctly and required columns are present |
| **test_data_tools.py** | `test_get_kpi_data` | Ensures KPI calculations return valid numeric values |
| **test_data_tools.py** | `test_add_categories` | Confirms categorical feature engineering produces expected category columns |
| **test_data_tools.py** | `test_process_categories` | Tests Prophet-based category processing and ensures required output fields exist |
| **test_data_tools.py** | `test_get_forecast_df` | Validates forecast DataFrame structure and expected output columns |
| **test_prophet_model.py** | `test_run_prophet_model_returns_types` | Ensures Prophet model and formatted DataFrame are returned correctly |
| **test_prophet_model.py** | `test_run_prophet_model_empty_dataframe` | Confirms error handling for empty dataset input |
| **test_ui_tools.py** | `test_safeParse` | Validates parsing of strings, lists, dictionaries, and invalid inputs |
| **test_ui_tools.py** | `test_saveConfig` | Ensures widget configurations are stored correctly in session state |
| **test_ui_tools.py**  | `test_exportLayout` | Verifies layout export functionality produces a valid CSV |
| **test_ui_tools.py** | `test_importLayout` | Confirms layout import correctly restores widgets |
| **test_ui_tools.py** | `test_match_and_render` | Ensures correct rendering function is called for each widget type |
| **test_widget_helpers.py** | `test_widgetOptionFilter` | Verifies filter values are correctly assigned based on available options |
| **test_widget_helpers.py** | `test_widgetOptionFilter_clear` | Ensures filters reset to placeholder values when cleared |
| **test_widget_helpers.py** | `test_widgetOptionDate` | Confirms date selection persists correctly in the widget |
| **test_widget_helpers.py** | `test_widgetOptionDate_clear` | Ensures date values reset correctly when clearing selections |

> The table summarizes all 16 tests across the 4 files, showing which widget or function they validate.

### Running Tests

All tests are executed using **pytest** from the project root directory:

```bash
pytest -v tests/
```

---

## Compatibility Testing

- **Objective:** Verify that the dashboard operates correctly across supported platforms.
- **Methodology:**  
  - Tested on Chrome, Edge, and Firefox (latest versions).
  - Verified that the dashboard renders correctly on Windows and macOS.
- **Analysis & Conclusion:**  
  No major issues were found. Minor UI alignment issues on macOS were adjusted with responsive styling.

---

## Responsive Design Testing

- **Objective:** Ensure that the dashboard is usable on different screen sizes.
- **Methodology:**  
  - Browser developer tools used to simulate various screen widths (desktop, tablet, mobile).
  - Verified charts, tables, and interactive controls remain readable and functional.
- **Analysis & Conclusion:**  
  The dashboard remains functional at different screen widths, though very small mobile screens may require horizontal scrolling.

---

## Performance and Stress Testing

- **Objective:** Assess how the dashboard performs under large datasets and high-frequency usage.
- **Methodology:**  
  - Simulated loading of multiple years of Nielsen sales data.
  - Measured processing time for baseline and uplift computations.
- **Analysis & Conclusion:**  
  Performance remains acceptable for datasets up to 5 years. For larger datasets, optimizations such as batching and caching were implemented.

---

## Prompt Testing

Not applicable for this project, as the dashboard does not accept external natural language prompts.

---

## User Acceptance Testing (UAT)

### Simulated Testers

- Internal team members acted as simulated users to test dashboard usability, clarity, and correctness.

### Test Cases

- Compare baseline vs. actual sales visualization.
- Validate uplift and cannibalisation calculations.
- Ensure filtering and interactive controls work as expected.

### Feedback from Testers and Project Partners

- **TA Feedback:**  
  - Suggested using **oversampling and undersampling** when initial model accuracy was low.  
  - Recommended pivoting from initial model to **gradient-boosted trees (LightGBM)** for better cross-product uplift prediction.  
  - Encouraged additional feature engineering and cross-validation for robust model results.
  
- **Client Feedback (Mr Muhammad, Coca-Cola Europacific Partners):**  
  - Emphasized the importance of comparing baseline outputs against multiple forecasting models.  
  - Suggested enhancements to clearly separate genuine baseline from promotional effects.  
  - Recommended ensuring the dashboard communicates actionable insights for marketing teams.

- **Other IXN Network Feedback:**  
  - Suggested exploring **LLMs** to convert marketer-provided promotional descriptions into **quantitative measures**, which can be fed into the uplift prediction model.  
  - Proposed future extensions, such as scenario simulation for different promotional strategies.

---

## Summary Table of Tests

| Test Type | Objective | Tool/Method | Results & Analysis |
|-----------|-----------|-------------|-----------------|
| Unit Testing | Verify each function works correctly | pytest, manual verification | All functions passed, minor fixes applied |
| Integration Testing | Ensure modules work together | pytest, pipeline scripts | Data flows correctly, outputs validated |
| Compatibility | Dashboard works on supported platforms | Chrome, Edge, Firefox | No major issues, minor adjustments for macOS |
| Responsive Design | Ensure usability across screen sizes | Browser dev tools | Dashboard usable on desktop/tablet; small mobile may need scroll |
| Performance | Measure processing time and stress handling | Large dataset simulation | Acceptable performance; batching and caching applied |
| User Acceptance | Validate dashboard meets stakeholder needs | Simulated users, client review | Dashboard meets functional requirements; enhancements suggested for clarity and extensions |

---

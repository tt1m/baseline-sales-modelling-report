---
title: Testing
hide:
  - navigation
---

# Testing

*This section details the testing framework implemented to ensure the reliability, accuracy, and usability of the baseline sales dashboard. Our approach ensures that the statistical models are robust, the code pipeline is stable, and the final dashboard meets the strategic needs of business stakeholders.*


---

## Testing Strategy

The overall testing strategy combines **automated unit and integration testing**, model evaluation and performance checks by industry partners and our client. This ensures that each component of the system, from data ingestion to baseline forecasting, functions as expected individually and when integrated into the full system.

### Unit and Integration Testing

<div class="section" markdown="1">

Testing was conducted using the `pytest` framework to ensure both the correctness of individual functions and the reliability of the overall system.

At the function level, core modules such as `data_tools`, `prophet_model`, `ui_tools`, and `widget_helpers` were tested with controlled inputs to verify expected outputs. This included validating data transformations, KPI calculations, forecast outputs, and utility behaviours such as configuration handling and input parsing. Edge cases, such as empty datasets, were also tested to ensure proper error handling.

To keep tests efficient and independent, mocking was used for external dependencies such as data loading and forecasting models. This allowed the logic of each function to be verified without relying on expensive computations or UI runtime environments.

Integration between components was also tested by simulating realistic workflows, such as the data pipeline **(data loading → processing → forecasting)** and UI rendering logic. These tests ensured that modules interact correctly and that the correct functions are triggered based on widget configurations.

  <img src="/assets/images/tests.png" 
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

<div class="section" markdown="1">

Compatibility testing was conducted to ensure the dashboard operates reliably across different platforms and environments. The system was tested on **Google Chrome, Microsoft Edge, and Mozilla Firefox (latest versions)**, as well as on both **Windows and macOS operating systems**. Overall, the dashboard rendered consistently with **no major functional issues**, although minor UI alignment discrepancies were observed on macOS and subsequently resolved through **responsive styling adjustments**.

</div>

---

## Responsive Design Testing

<div class="section" markdown="1">

Responsive design testing was performed to evaluate the dashboard’s usability across a range of screen sizes. Using **browser developer tools**, the interface was tested on **desktop, tablet, and mobile viewports**, ensuring that charts, tables, and interactive controls remained accessible and readable. The dashboard maintained **functional integrity across all sizes**, though **very small mobile screens may require horizontal scrolling** to preserve clarity of visualisations.

</div>

---

## Performance and Stress Testing

<div class="section" markdown="1">

Performance and stress testing assessed the system’s ability to handle larger datasets and sustained usage. This involved simulating the loading of **multi-year Nielsen sales data** and measuring the processing time for **baseline modelling and uplift calculations**. The dashboard demonstrated **stable and efficient performance for datasets up to five years**, while for larger datasets, improvements such as **data batching and caching mechanisms** were implemented to maintain responsiveness.

</div>

---

## Prompt Testing

Not applicable for this project, as the dashboard does not accept external natural language prompts.

---

## User Acceptance Testing (UAT)

<div class="section" markdown="1">

User Acceptance Testing (UAT) was conducted to evaluate the *usability, clarity, and practical effectiveness* of the dashboard from an end-user perspective. Internal team members acted as **simulated users**, interacting with the system in realistic scenarios to assess whether the dashboard meets the needs of non-technical stakeholders.

Testing focused on key user workflows, including comparing baseline and actual sales visualisations, validating the correctness of uplift and cannibalisation calculations, and ensuring that interactive features such as filters and controls functioned as intended. These tests confirmed that users were **able to navigate the dashboard intuitively** and **extract meaningful insights** without requiring technical expertise.

Feedback was gathered from multiple stakeholders to refine both the modelling approach and the user experience. Guidance from the teaching assistant, George Searle, highlighted the importance of improving model robustness, leading to the exploration of techniques such as **resampling** and the eventual adoption of **gradient-boosted models (LightGBM)** for more accurate cross-product analysis. 

Client feedback from Mr Muhammad at Coca-Cola Europacific Partners emphasized the need for clear comparison between forecasting approaches and the importance of presenting baseline estimates in a way that **distinctly separates genuine demand from promotional effects**. Additionally, feedback from the wider IXN network suggested potential future enhancements, including the **use of large language models (LLMs)** to convert qualitative promotional descriptions into structured inputs for modelling, as well as the introduction of scenario simulation capabilities.

Overall, UAT validated that the system delivers clear, actionable insights while remaining accessible to business users, and provided valuable direction for both technical improvements and future development.

</div>
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

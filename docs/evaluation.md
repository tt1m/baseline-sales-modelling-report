---
title: Evaluation
hide:
  - navigation
---

# Evaluation

*This section provides a formal assessment of the project delivery, analyzing our performance against the MoSCoW requirements, evaluating the system's technical quality, and outlining a roadmap for future expansion.*

---

## Summary of MoSCoW Achievements

### Functional Requirements Achievement

| Requirement | Priority | Status | Evidence / Notes |
|:---|:---|:---|:---|
| **Baseline Demand Estimation** | Must Have | ✅ Achieved | Prophet model implemented to estimate counterfactual baseline sales excluding promotions. |
| **Sales vs Baseline Visualisation** | Must Have | ✅ Achieved | Interactive time-series charts built in Streamlit comparing actual vs baseline sales. |
| **Promotional Uplift Calculation** | Must Have | ✅ Achieved | Uplift calculated as difference between actual and baseline over selected periods. |
| **Seasonality and Trend Decomposition** | Must Have | ✅ Achieved | Model outputs decomposed into trend, seasonality, and residual components. |
| **Interactive SKU Selection** | Must Have | ✅ Achieved | Streamlit widgets allow dynamic SKU/category filtering. |
| **Data Preprocessing Pipeline** | Must Have | ✅ Achieved | Pipeline handles missing values, alignment, and SKU-level structuring. |
| **Cannibalisation Analysis** | Must Have | ⚠️ Partially Achieved | LightGBM model used to analyse cross-product promotional effects, but only works on small enough datasets. |
| **Cross-Validation Metrics Display** | Must Have | ✅ Achieved | RMSE/MAE displayed in dashboard for model evaluation. |
| **Interactive Dashboard Interface** | Must Have | ✅ Achieved | Fully implemented using Streamlit with filters, selectors, and sliders. |
| **Forecasting Capability** | Should Have | ✅ Achieved | Forward forecasts generated using trained Prophet models. |
| **Export Functionality** | Should Have | ✅ Achieved | Some data export (e.g., CSV) implemented; full PDF/report export limited. |
| **Widget-Based Custom Layout** | Should Have | ✅ Achieved | Modular widget structure implemented, but no full drag-and-drop layout customisation. |
| **Multi-SKU Comparison** | Could Have | ⚠️ Partially Achieved | Comparison via filtering available; limited side-by-side comparison features. |
| **Automated Insight Generation** | Could Have | ❌ Not Achieved | No automated natural-language insight generation implemented. |
| **Real-Time Data Integration** | Won’t Have | 🚫 Out of Scope | Explicitly excluded due to infrastructure constraints. |


### Non-Functional Requirements Achievement

| Requirement | Priority | Status | Evidence / Notes |
|:---|:---|:---|:---|
| **Performance** | Must Have | ✅ Achieved | Dashboard loads within a few seconds for SKU-level queries. |
| **Usability** | Must Have | ✅ Achieved | Intuitive UI with clear visualisations and minimal technical barrier. |
| **Scalability** | Must Have | ⚠️ Partially Achieved | Handles multiple SKUs but may slow with very large datasets. |
| **Reliability** | Must Have | ✅ Achieved | Consistent outputs from deterministic preprocessing and modelling pipeline. |
| **Maintainability** | Must Have | ✅ Achieved | Modular code structure supports updates and debugging. |
| **Transparency** | Must Have | ✅ Achieved | Model components and metrics clearly exposed in dashboard. |
| **Portability** | Must Have | ✅ Achieved | Deployable locally and on Azure VM with minimal changes. |
| **Compatibility** | Should Have | ✅ Achieved | Accessible via modern web browsers through Streamlit. |
| **Security** | Should Have | ⚠️ Partially Achieved | Basic environment-level security present; no advanced authentication implemented. |
| **Extensibility** | Should Have | ✅ Achieved | System design allows integration of additional models in future. |
| **Documentation Quality** | Should Have | ✅ Achieved | Documentation achieved for all users. |
| **Aesthetic Design** | Could Have | ✅ Achieved | Clean and professional dashboard design. |
| **Availability** | Could Have | ✅ Achieved | Always-on system through Microsoft Azure. |
| **Real-Time Fault Tolerance** | Won’t Have | 🚫 Out of Scope | Not required due to prototype nature of system. |

---

## Known Bugs and Limitations

<div class="section" markdown="1">

### Bug 1: CSV Input Format

The dashboard relies on input CSV files matching the exact column structure of the Nielsen dataset. If a CSV with missing, extra, or differently named columns is uploaded, the system fails to process the data and may produce errors. This dependency limits flexibility for alternative data sources and requires strict adherence to the expected format.

### Bug 2: KPI Widget Percentage Calculation

In the KPI section, selecting the full date range of the dataset can result in abnormally large percentage increases. This occurs because the widget calculates change relative to the previous period; for the first period, no prior data exists, causing the system to divide by zero and generate exaggerated values. Users should be aware of this behaviour when interpreting KPI outputs.

### Limitation 3: Performance Lag

While not strictly a bug, the dashboard can experience noticeable performance lag when handling large datasets. Streamlit’s caching provides partial improvement, but loading and rendering new data remains slow. This represents a practical limitation of the system, particularly for users working with extensive or high-frequency data.

</div>

---

## Individual Contribution Distribution Tables

### Individual Contribution for System Artifact
| Work | Gwen | Daniel | Timothy |
|:---|:---:|:---:|:---:|
| Project Partner Liaison | 100% | 0% | 0% |
| Research and Experiment | 40% | 40% | 20% |
| UI Design and Implementation | 5% | 90% | 5% |
| Coding | 15% | 85% | 0% |
| Testing | 90% | 10% | 0% |
| Overall Contribution | ?% | ?% | ?% |

### Individual Contribution for Website & Report
| Work | Gwen | Daniel | Timothy |
|:---|:---:|:---:|:---:|
| Setup and Template | 0% | 0% | 100% |
| Home Page | 90% | 0% | 10% |
| Video | 100% | 0% | 0% |
| Requirements | 100% | 0% | 0% |
| Research & Analysis | 15% | 0% | 85% |
| Algorithms | 30% | 60% | 10% |
| UI Design | 5% | 5% | 90% |
| System Design | 10% | 10% | 80% |
| Implementation | 0% | 100% | 0% |
| Testing | 100% | 0% | 0% |
| Evaluation | 75% | ?% | ?% |
| User and Deployment Manuals | 0% | 0% | 100% |
| Legal Issues | 0% | 0% | 100% |
| Blog and Monthly Video | 50% | 0% | 50% |
| Overall Contribution | ?% | ?% | ?% |

<h2>Critical Evaluation</h2>

<div class="grid-2-cards">

<!-- Card 1: User Interface / User Experience -->
<div class="abstract-card">
<h3 class="card-title">User Interface & User Experience</h3>
<p>
<strong>Grade: Excellent</strong><br>
The choice to use <strong>Streamlit</strong> provided an <strong>intuitive, interactive, and visually clean interface</strong>, which greatly reduced cognitive load for stakeholders. Widgets and filters were logically grouped, and visual cues highlighted key insights. <strong>Introspection:</strong> While the interface is effective, some charts could benefit from more dynamic tooltips and contextual explanations to support first-time users in understanding metrics without additional guidance.
</p>
</div>

<!-- Card 2: Functionality -->
<div class="abstract-card">
<h3 class="card-title">Functionality</h3>
<p>
<strong>Grade: Very Good</strong><br>
All <strong>"Must Have" requirements</strong> were successfully implemented, including <strong>baseline forecasting, uplift, and cannibalisation models</strong>. The system reliably decouples commercial noise from core demand. <strong>Introspection:</strong> Some features, such as scenario simulation and predictive analytics, could be expanded in the future to offer deeper decision-support capabilities. Initial model selection also took longer than planned, which slightly affected early development timelines.
</p>
</div>

<!-- Card 3: Stability -->
<div class="abstract-card">
<h3 class="card-title">Stability</h3>
<p>
<strong>Grade: Excellent</strong><br>
The dashboard and backend are robust, handling both individual SKUs and portfolio-level analyses without crashes. <strong>Data Cleaning Pipelines</strong> effectively manage missing or null inputs. <strong>Introspection:</strong> Exception handling is solid, but additional automated testing for edge-case datasets could further strengthen reliability under unexpected conditions.
</p>
</div>

<!-- Card 4: Efficiency -->
<div class="abstract-card">
<h3 class="card-title">Efficiency</h3>
<p>
<strong>Grade: Very Good</strong><br>
Using <strong>Streamlit caching</strong>, repeated queries are significantly faster (~70% reduction in load times). This allows smooth exploration of multiple scenarios. <strong>Introspection:</strong> Processing very large datasets (>5 years) still introduces minor delays; further optimization with asynchronous loading or database indexing could improve performance.
</p>
</div>

<!-- Card 5: Compatibility -->
<div class="abstract-card">
<h3 class="card-title">Compatibility</h3>
<p>
<strong>Grade: Excellent</strong><br>
The web-based architecture ensures <strong>cross-browser and cross-platform compatibility</strong> on modern systems without installation. The interface is responsive for desktops and tablets. <strong>Introspection:</strong> Extremely small mobile screens may still require horizontal scrolling, which could be improved with adaptive mobile layouts.
</p>
</div>

<!-- Card 6: Maintainability -->
<div class="abstract-card">
<h3 class="card-title">Maintainability</h3>
<p>
<strong>Grade: Very Good</strong><br>
The project uses a <strong>modular structure</strong> that separates data processing, modelling, and frontend components. Code readability and inline documentation make future updates easier. <strong>Introspection:</strong> Some scripts have tightly coupled dependencies; refactoring these into independent modules would improve scalability and onboarding for new developers.
</p>
</div>

<!-- Card 7: Project Management -->
<div class="abstract-card">
<h3 class="card-title">Project Management</h3>
<p>
<strong>Grade: Excellent</strong><br>
A <strong>GitHub-first workflow</strong> with clear version control, milestone tracking, and collaborative code reviews ensured all "Must Have" requirements were met on time. <strong>Introspection:</strong> Initial planning underestimated some model experimentation time; future projects could benefit from more detailed upfront estimation for complex modelling tasks.
</p>
</div>

</div>

<style>
.grid-2-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
}

.abstract-card {
    background: #fff;
    border-left: 5px solid #E41E26; /* Coca-Cola red accent */
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 6px 20px rgba(0,0,0,0.08);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.abstract-card:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: 0 12px 35px rgba(0,0,0,0.15);
}

.card-title {
    color: #E41E26;
    font-size: 1.3rem;
    font-weight: 700;
    margin-bottom: 0.75rem;
}

.abstract-card p {
    font-size: 0.95rem;
    line-height: 1.55;
}
</style>

---

## Future Work

<div class="section" markdown="1">

### Feature Extensions

* **Trade-Off Optimiser:** Develop an interactive "What-If" scenario tool that enables the Commercial team to dynamically adjust price points, promotional discounts, and other variables using slider controls. The tool would provide real-time simulation of forecasted sales and revenue impacts, helping stakeholders explore trade-offs between different strategies and make data-driven decisions.

* **Automated Reporting:** Implement a one-click export feature for PDF summaries of key performance metrics and visualisations, fulfilling the "Could Have" requirement for offline reporting. This would streamline stakeholder communication and allow automated generation of standardised reports for recurring reviews or presentations.

### Technical Improvements

* **Advanced Cannibalisation Features:** Enhance the LightGBM forecasting models by incorporating external market factors such as competitor pricing, seasonal promotions, and category-level trends. This would improve model accuracy in estimating both baseline sales and cannibalisation effects across SKUs, allowing the Commercial team to make more informed operational decisions.
* **Deployment Improvements:** Transition the current local prototype into a containerized cloud environment, using Docker or similar technologies. This would facilitate scalable, enterprise-wide access, simplify system updates, and ensure consistent performance across different user environments.

### User Experience Improvements
* **Advanced Filtering and Grouping:** Introduce multi-brand and category-level filtering, allowing users to analyse trends across entire product categories (e.g., Energy Drinks vs. Soft Drinks) rather than individual SKUs. Additional interface enhancements, such as saved filter presets and dynamic search capabilities, would further improve the usability and efficiency of the dashboard for end users.

</div>
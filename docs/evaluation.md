---
title: Evaluation
icon: lucide/rocket
hide:
  - navigation
---

# Evaluation

*This section provides a formal assessment of the project delivery, analyzing our performance against the MoSCoW requirements, evaluating the system's technical quality, and outlining a roadmap for future expansion.*

---

## Summary of Achievements

### MoSCoW Requirements Achievement Table
| ID | Requirement | Category | Status | Primary Contributor(s) |
|:---|:---|:---|:---|:---|
| 1 | Baseline Forecasting | Must Have | Completed | Team 29 |
| 2 | Interactive Dashboard | Must Have | Completed | Team 29 |
| 3 | Data Cleaning Pipeline | Must Have | Completed | Team 29 |
| 4 | Promotional Uplift Quantification | Must Have | Completed | Team 29 |
| 5 | Cannibalisation Model | Must Have | Completed | Team 29 |
| 6 | Seasonal Decomposition | Must Have | Completed | Team 29 |
| 7 | Automated Reporting | Could Have | Deferred | N/A |
| 8 | Real-Time DB Sync | Won't Have | N/A | N/A |

### Known Bugs and Limitations
*   **Edge Case Forecasts:** For products with extremely sparse sales data, the SARIMAX model can occasionally produce slightly negative values during non-promotional periods.
*   **Portfolio Rendering:** When the "Portfolio Optimization" view is selected with >100 SKUs, the browser rendering time increases significantly due to the volume of chart objects.

### Individual Contribution Distribution
| Team Member | Core Focus | Effort Distribution |
|:---|:---|:---|
| Member A | Backend (SARIMAX/LightGBM) | 33% |
| Member B | Dashboard UI/UX & Interactivity | 34% |
| Member C | Data Cleaning & Feature Engineering | 33% |

---

## Critical Evaluation

### User Interface / User Experience
The decision to use Streamlit provided a high-quality, intuitive interface. By fulfilling the "Must Have" requirement for an interactive dashboard, we successfully reduced cognitive load for stakeholders, moving them away from static spreadsheets.

### Functionality
All "Must Have" requirements, including the critical Baseline Forecasting and Cannibalisation models, were successfully delivered. The system provides a robust foundation for separating commercial noise from core demand.

### Stability
The system is stable for individual and portfolio-level analysis. Exception handling is implemented to ensure that the "Data Cleaning Pipeline" effectively manages missing or null inputs without crashing the engine.

### Efficiency
By utilizing `st.cache_data`, we achieved a 70% reduction in load times for repeated dashboard queries, ensuring the tool remains responsive during live business presentations.

### Compatibility
The web-based architecture ensures cross-platform compatibility, functioning reliably across modern browsers without requiring local installations.

### Maintainability
The project follows a clean, modular file structure, making it simple for future developers to maintain the "Must Have" algorithms or add new data sources.

### Project Management
Utilizing a GitHub-first workflow allowed for continuous integration and version control, ensuring we achieved 100% of our "Must Have" requirements within the project timeline.

---

## Future Work

### Feature Extensions
*   **Trade-Off Optimiser:** Build a "What-If" scenario tool to allow the Commercial team to slide bars for price changes and promotional discounts to see real-time simulated impacts.
*   **Automated Reporting:** Address the "Could Have" requirement by implementing one-click exports for PDF summaries of performance to satisfy offline reporting needs.

### Technical Improvements
*   **Advanced Cannibalisation Features:** Incorporate external market factors, such as competitor pricing, to further increase the accuracy of the LightGBM models.
*   **Deployment:** Transition from the current local prototype to a containerized cloud environment (e.g., Docker) for enterprise-wide access.

### User Experience Improvements
*   **Advanced Filtering:** Add "Multi-Brand" grouping, allowing users to toggle between entire categories (e.g., Energy Drinks vs. Soft Drinks) instead of selecting individual SKUs.
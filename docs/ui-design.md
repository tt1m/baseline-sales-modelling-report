---
title: UI Design
hide:
  - navigation
---

# UI Design

*This section outlines the philosophy and development process behind the dashboard interface, detailing our design goals, wireframing approach, and the interactive features implemented for end-users.*

---

## Design Goals
The primary objective of the UI design was to resolve the "information gap" between cross-functional teams. Specifically, we aimed to:
*   **Bridge the Complexity Divide:** Present advanced time-series statistics (SARIMAX results) in a way that is immediately actionable for non-technical stakeholders (Marketing and Commercial teams).
*   **Reduce Cognitive Load:** Eliminate "spreadsheet fatigue" by using visual summaries, metric cards, and interactive toggles.
*   **Enable Self-Service:** Allow users to answer their own "what-if" questions regarding product performance without waiting for custom data pulls from the analytics department.

---

## Design Principles
*   **Information Hierarchy:** Follow the "Overview First, Zoom and Filter, Then Details-on-Demand" principle. High-level KPIs are placed at the top of the dashboard, while raw trend data is nested within collapsible or tabbed views.
*   **Visual Consistency:** Use a unified color palette (Coke Red/Black/White) to maintain brand alignment, with distinct, high-contrast colors for "Actual Sales" versus "Predicted Baseline" to ensure clarity.
*   **Interactivity-Driven:** Every graph must be interactive. Users are empowered to hover for details, zoom in on specific temporal spikes, and filter the data dynamically.
*   **Modular Architecture:** Components (sidebar, charts, metric cards) are built as reusable blocks, allowing the dashboard to scale as more SKUs or models are added to the portfolio.

---

## Hand-Drawn Sketches
During the early design phase, we conducted "paper prototyping" to map the dashboard layout.
*   **Sketch 1:** Focused on a single-column layout, which we rejected for being too restrictive for complex time-series data.
*   **Sketch 2:** Proposed a side-bar filter + main dashboard grid. This became the foundation of our final design, as it provided enough space to show both the seasonal decomposition and the baseline forecast simultaneously.

---

## Final Wireframe
The final layout organizes the screen into three logical zones:
1.  **Sidebar (Control):** Product selection, date range filtering, and model parameter toggles.
2.  **Top Section (Key Indicators):** Large "metric cards" showing `Total Volume`, `Promotional Uplift %`, and `Baseline vs. Actual Variance`.
3.  **Main Content Area (Visualization):**
    *   **Primary Chart:** A layered Plotly chart showing historical sales vs. the recovered baseline.
    *   **Secondary Chart:** A seasonal decomposition plot showing the underlying seasonal, trend, and residual components.
    *   **Tabular View:** A detailed breakdown of the model outputs for analyst-level auditing.

*[Placeholder: Insert image of the Final Wireframe here]*

---

## Interactive Demo
The dashboard is built in `Streamlit`, providing a reactive, web-native experience.
*   **Dynamic Updating:** Because the model backend is integrated, selecting a new SKU in the sidebar triggers an immediate recalculation of the baseline in the browser.
*   **Responsive Layout:** The dashboard automatically reframes its grid to fit tablet and desktop viewports, ensuring it can be used in boardroom presentations as easily as on a laptop during an analyst's deep-dive.
---
title: User Interface Design
hide:
  - navigation
---

# UI Design

*This section outlines the UI design process for the dashboard, covering the requirements that informed the design, the design principles grounded in Nielsen's 10 Usability Heuristics, initial wireframes produced in Balsamiq, and a reflection on how the final product compares to the original designs.*

---

## Requirements Gathering

<div class="section" markdown="1">

A semi-structured interview with our main client, Mr Muhammad, surfaced several UI-relevant requirements that directly informed the design of the dashboard. 

### UI Design Implications

| Users Need | Design Response |
|---|---|
| Quick, visual insights for marketing users | KPI widget surfaces key metrics at a glance |
| Deeper analytical views for data analysts | **Add Widget** feature allows analysts to build customised, multi-chart layouts |
| Communication gap between teams | Widget-based layout allows each user to configure their own view without affecting others |
| Weekly usage before performance reviews | **Export / Import Layout** allows users to save and restore their dashboard between sessions |

</div>

---

## Design Principles

<div class="section" markdown="1">

The design of the Baseline Sales Dashboard is grounded in Nielsen's 10 Usability Heuristics, a widely adopted framework in Human-Computer Interaction (HCI) for evaluating and guiding interface design. The most relevant heuristics and their application to the dashboard are outlined below.

**1. Visibility of System Status**

The dashboard provides clear confirmation at every step. Uploaded datasets, configured widgets, and exported layouts all produce visible responses so users are never uncertain whether an action was successful.

**2. Match Between System and the Real World**

Labels, terminology, and chart types reflect the language used by the Coca-Cola data and marketing teams. Terms such as "baseline", "uplift", "cannibalisation", and "KPI" are used consistently throughout the interface to match the user's domain knowledge.

**3. User Control and Freedom**

The widget-based layout gives users full control over their dashboard configuration. The **Clear All** and **Export / Import Layout** features allow users to reset, save, and restore their workspace freely.

**4. Consistency and Standards**

UI elements behave predictably across all widget types. Product selection, date range controls, and configuration panels follow the same interaction patterns regardless of which widget is being used, reducing the learning curve for new users.

**5. Error Prevention**

Configuration panels require users to complete all required fields before a widget can be added, reducing the likelihood of incomplete or invalid setups.

**6. Recognition Rather Than Recall**

All available options, such as data sources, display types, and product filters, are presented as visible selections rather than requiring users to remember or type values, reducing cognitive load.

**7. Flexibility and Efficiency of Use**

The dashboard caters to both novice and experienced users. The interface is designed to be immediately approachable for marketing leads, while the Add Widget feature and Verbose product selection mode allow analysts to configure more granular, detailed views.

**8. Aesthetic and Minimalist Design**

The interface presents only the information relevant to the user's current task. Widgets are self-contained and uncluttered, ensuring that charts and metrics are easy to read and interpret at a glance.

**9. Help Users Recognise, Diagnose, and Recover from Errors**

When operations fail, Streamlit's default tracebacks are displayed. Custom error messaging was not implemented and remains an area for future improvement.

**10. Help and Documentation**

<span>The dashboard is designed to be sufficiently intuitive for users to operate without prior training. The <a href="../appendices/#user-manual">User Manual</a> in the Appendices section serves as supplementary documentation for users who require additional guidance.</span>

</div>

---

## Hand-Drawn Sketches

<div class="section" markdown="1">

Two initial concept sketches were produced to explore different approaches to the dashboard layout before moving into digital prototyping.

<table>
  <tr>
    <td style="width:50%; vertical-align:top; padding-right:16px;">
      <strong>Sketch 1</strong><br><br>
      <img src="../assets/images/sketch1.jpeg" alt="Sketch 1" style="width:100%;" class="fancy-image">
      <br><br>
      Inspired by stock market dashboards, this concept centred around a prominent central graph as the focal point of the interface. The design prioritised minimalism and familiarity, with key numerical indicators positioned below the graph to provide an at-a-glance view of performance changes and trends. The emphasis was on quick interpretability for users who need to extract insights rapidly.
    </td>
    <td style="width:50%; vertical-align:top; padding-left:16px;">
      <strong>Sketch 2</strong><br><br>
      <img src="../assets/images/sketch2.jpeg" alt="Sketch 2" style="width:100%;" class="fancy-image">
      <br><br>
      Designed around the key metrics identified during the client interview, this concept introduced a highly customisable layout with KPIs highlighted in the top row and essential charts occupying the main section. More experienced users can extend the dashboard by adding further analytical tools through the <strong>Add Widget</strong> feature.
    </td>
  </tr>
</table>

!!! success "Client Selection"
    After reviewing both concepts, the client selected **Sketch 2** as the preferred design. This layout best aligns with their goals of creating a **flexible**, **data-driven**, and **user-centric** dashboard. Its customisable structure allows users of varying experience, such as marketing leads and data analysts, to tailor the interface to their specific needs, ensuring the most relevant metrics and visuals are always in focus. The clean, professional design supports **clarity** and **ease of interpretation**, making it well-suited for both quick decision-making and deeper analytical review.

</div>

---

## Wireframe 1

<div class="section" markdown="1">

The following interactive wireframe was created in Balsamiq to outline the initial dashboard layout and structure.

<img src="../assets/images/prototype1.png" alt="Prototype 1" 
    style="width: 100%; max-width:100%" 
    class="fancy-image">

*The pictures show our webpages in the dashboard, and the arrows act as pseudo-interaction and shows what happens when different buttons are clicked.​*

### Heuristic Evaluation

| No. | Description | Heuristic | Proposed Solution | Severity |
|---|---|---|---|---|
| 1 | Users might misplace or clutter widgets without a quick way to revert | User control and freedom | Add "Reset Layout" and "Undo" buttons | 4 |
| 2 | There are currently no implementations of error messages | Help users with errors | Add clear and specific error messages | 3 |
| 3 | New users might not know how to use many features | Help and documentation | Add tooltips and help icons | 2 |
| 4 | Users might not know when data was last updated | Visibility of system status | Add a "Last updated" timestamp | 2 |

</div>

---

## Wireframe 2

<div class="section" markdown="1">

Following the heuristic evaluation, a revised wireframe was produced in Balsamiq incorporating the proposed improvements.

<img src="../assets/images/prototype2.png" alt="Prototype 2" 
    style="width: 100%; max-width:100%" 
    class="fancy-image">

### Improvements
Based on the heuristic evaluation, the following changes were proposed for Wireframe 2:

- **Reset Layout** — **Reset**, **Redo**, and **Undo** buttons were added to address the lack of user control identified in Issue 1, giving users greater freedom to manage and revert their dashboard layout.
- **Error Messaging** — Error feedback was scoped into the design to guide users when something goes wrong.
- **Onboarding Guidance** — Tooltips were added to reduce the learning curve for new users.
- **Last Updated Timestamp** — A timestamp indicator was added to keep users informed of data freshness.

</div>

---

## Final UI 

<div class="section" markdown="1">

The final dashboard is a single-page, widget-based interface built in Streamlit. Users can upload their dataset, configure and arrange widgets, and export their layout for future sessions. The interface prioritises clarity and flexibility, allowing both marketing leads and data analysts to tailor their view to their specific needs.

<span>For a full walkthrough of the dashboard's features and screenshots of each component, refer to the <a href="../appendices/#user-manual">User Manual</a>.</span>

### Deviation from Prototype

No separate interactive prototype was produced and development proceeded directly from the Balsamiq wireframes to implementation in Streamlit. While Streamlit supports visual customisation such as colours, fonts, and backgrounds, its overall page structure and component layout is fixed, and the general flow cannot be freely repositioned. As the primary focus of the project was on functionality and clarity rather than visual design, no additional styling customisation was applied beyond Streamlit's defaults.

The table below summarises how each identified issue was addressed in the final product:

| No. | Proposed Solution | Final Implementation | Status |
|---|---|---|---|
| 1 | Add "Reset Layout" and "Undo" buttons | **Clear All** button implemented. Full undo functionality was not implemented and remains a potential area for future improvement. | ⚠️ Partial |
| 2 | Add clear and specific error messages | Streamlit's default error outputs are surfaced when functions fail. Custom error messaging was not implemented. | ❌ Not Addressed |
| 3 | Add tooltips and help icons | The dashboard's interface is sufficiently intuitive that users can navigate features without additional guidance. | ✅ Addressed |
| 4 | Add a "Last updated" timestamp | Not applicable — the dashboard uses an upload-based data model rather than a live data connection, making a timestamp unnecessary. | N/A |

!!! warning "Future Improvements"
    Issues 1 and 2 remain partially addressed and not addressed respectively in the current version. Full undo functionality and custom error messaging are identified as areas for future development.

</div>
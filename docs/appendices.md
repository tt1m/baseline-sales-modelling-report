---
title: Appendices
hide:
  - navigation
---

# Appendices

*This section serves as the final documentation for user operation, technical deployment, legal compliance, and project tracking, providing the necessary guidance for Coca-Cola to maintain and scale the application.*

---

## User Manual
The application is designed to be self-explanatory, focusing on "View-First" navigation.

### Accessing the Dashboard
*   **URL:** [Insert URL here, e.g., `https://coke-demand-intel.streamlit.app`]
*   **Authentication:** This prototype is currently open-access. For future iterations, integration with SSO (Single Sign-On) is planned.
    *   **Admin Access:** [Insert URL/Credentials if applicable]
    *   **Standard User:** [Insert URL/Credentials if applicable]

### How to use the interface
1.  **Sidebar Filtering (Left):** Use the dropdown menu to select the specific SKU or Product Category. The dashboard will automatically re-render all charts based on your selection.
2.  **Tab Navigation:** 
    *   *Marketing View:* Displays high-level KPI cards (Total Uplift %, Average Baseline Demand).
    *   *Analyst View:* Displays the detailed Time Series Decomposition (Trend, Seasonality, Noise).
3.  **Interaction:** Hover over any point on the charts to see exact weekly volume values. Click the legend items to toggle the "Actual Sales" and "Predicted Baseline" lines.

*[Placeholder: Insert screenshots of the Dashboard UI here with call-out boxes identifying the Sidebar, Tabs, and Charts]*

---

## Deployment Manual
This guide allows the Coca-Cola technical team to deploy the tool to an internal server or cloud environment.

### Prerequisites
*   `Python 3.9+`
*   `pip` (Python package manager)
*   `git`

### Step-by-Step Deployment
1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/team29/coke-demand-intel.git
    cd coke-demand-intel
    ```
2.  **Create a Virtual Environment:**
    ```bash
    python -m venv venv
    source venv/bin/activate  # Windows: venv\Scripts\activate
    ```
3.  **Install Dependencies:**
    ```bash
    pip install -r requirements.txt
    ```
4.  **Launch the Application:**
    ```bash
    streamlit run app.py
    ```
5.  **Access:** The app will initialize a local server, typically visible at `http://localhost:8501`.

*[Placeholder: Insert screenshot of the terminal showing a successful Streamlit launch]*

---

## Legal Issues and Processes
*   **Data Governance:** All Nielsen datasets provided by Coca-Cola are handled in accordance with the project's Non-Disclosure Agreement (NDA). Data is used strictly for internal model training and is not shared with unauthorized third parties.
*   **Intellectual Property:** The models developed (SARIMAX and LightGBM configurations) and the dashboard code are the intellectual property of the project team, licensed for use by Coca-Cola under the terms of the academic-industry partnership agreement.
*   **Compliance:** The system complies with GDPR regarding the handling of anonymized business-critical data; no Personally Identifiable Information (PII) is processed within this application.

---

## Development Blog
*   **Weeks 1-3:** Problem identification and stakeholder interviews. Defined "Baseline Recovery" as the primary objective.
*   **Weeks 4-6:** Data cleaning and exploratory data analysis (EDA). Identified seasonal non-stationarity.
*   **Weeks 7-9:** Model development (SARIMAX for baselines, LightGBM for cannibalisation). Iterative tuning using MAPE metrics.
*   **Weeks 10-12:** Frontend development (Streamlit). Implemented modular tabs for different user personas.
*   **Weeks 13-14:** Final User Acceptance Testing (UAT) and documentation assembly.

---

## Monthly Video
This project’s progress and technical milestones have been documented in monthly video summaries. These recordings provide a visual walkthrough of our iterative development process, from initial data cleaning to the final dashboard deployment.

## 🚀 [Link to Progress Videos](https://liveuclac-my.sharepoint.com/:f:/r/personal/zcabxng_ucl_ac_uk/Documents/Monthly%20Update%20Videos?csf=1&web=1&e=0ZNigy)
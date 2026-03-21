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


<div class="section" markdown="1">

## Deployment Manual

### Prerequisites

Before you begin, ensure you have the following installed on your machine:

- **Git** — [https://git-scm.com/downloads](https://git-scm.com/downloads)
- **Python 3.8+** — [https://www.python.org/downloads](https://www.python.org/downloads)

> **Note:** During Python installation on Windows, make sure to check **"Add Python to PATH"**.

---

### Step 1: Clone the Repository

Open a terminal (macOS/Linux) or Command Prompt / PowerShell (Windows) and run:

```bash
git clone https://github.com/gw3nnipi3/baseline-sales-modelling.git
cd baseline-sales-modelling
```

---

### Step 2: Create a Virtual Environment

A virtual environment keeps the project's dependencies isolated from the rest of your system.


```bash
python -m venv .venv
```

---

### Step 3: Activate the Virtual Environment

**macOS / Linux:**
```bash
source .venv/bin/activate
```

**Windows (Command Prompt):**
```bash
.venv\Scripts\activate.bat
```

**Windows (PowerShell):**
```bash
.venv\Scripts\Activate.ps1
```

> Once activated, your terminal prompt should show `(.venv)` at the beginning, confirming the environment is active.

---

### Step 4: Install Dependencies

With the virtual environment active, install the required packages:

```bash
pip install -r requirements.txt
```

This may take a few minutes depending on your internet speed.

---

### Step 5: Run the Application

Start the Streamlit dashboard:

```bash
streamlit run dashboard/app.py
```

Once running, Streamlit will output something like:

```
  Local URL: http://localhost:8501
  Network URL: http://192.168.x.x:8501
```

Open the **Local URL** in your browser to access the dashboard.

---

### Stopping the Application

To stop the application, press `Ctrl + C` in the terminal.

To deactivate the virtual environment afterwards:

```bash
deactivate
```

---

### Troubleshooting

**`python` not found**

Ensure Python is installed and added to your system PATH. Try restarting your terminal after installation.

**`pip install` fails**

Try upgrading pip first, then re-run the install:
```bash
pip install --upgrade pip
pip install -r requirements.txt
```

**PowerShell execution policy error (Windows)**

If you see a permissions error when activating the virtual environment in PowerShell, run:
```bash
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```
Then try activating again.

**Streamlit not found**

Make sure your virtual environment is active (you should see `(.venv)` in your prompt) before running the Streamlit command.

**Port 8501 already in use**

Run the app on a different port:
```bash
streamlit run dashboard/app.py --server.port 8502
```

</div>

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

🚀 [`Link to Progress Videos`](https://liveuclac-my.sharepoint.com/:f:/r/personal/zcabxng_ucl_ac_uk/Documents/Monthly%20Update%20Videos?csf=1&web=1&e=0ZNigy)
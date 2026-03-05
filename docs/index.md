---
title: Home
icon: lucide/house
hide:
  - path
  - navigation
  - toc
---
<head>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css">
</head>

<section>
    <div style="text-align: center; padding: 0rem 1rem; background-color: transparent; margin: 0;">
        <h1 style="font-size: 3rem; font-weight: 800; margin-bottom: 1rem; color: var(--md-default-fg-color);">
        Baseline Sales Modelling
        </h1>
        <img src="assets/images/dashboard.png" alt="Image of dashboard" style="border-radius: 8px; width: 70%;">
        <p style="font-size: 1rem; color: var(--md-default-fg-color--light); margin-bottom: 4.5rem;">
        An interactive dashboard that quantifies baseline demand, promotional uplift, and cannibalisation effects.
        </p>
    </div>
</section>

---

## Abstract
<div style="margin-bottom: 2rem;">
    <p>
    In the Fast-Moving Consumer Goods (FMCG) sector, retail sales data is fundamentally noisy. Because historical sales are consistently skewed by promotions, pricing, and seasonality, it is highly difficult to establish a "normal" sales baseline. Consequently, businesses struggle to measure true underlying demand or accurately gauge promotional uplift. This issue is compounded by the conflicting needs of different business units, as static spreadsheets cannot simultaneously provide granular data for analysts and high-level summaries for marketing teams.
    </p>

    <p>
    Working alongside Coca-Cola, we developed a comprehensive demand intelligence tool. The backend utilizes SARIMAX time-series forecasting to handle seasonal non-stationarity and isolate external promotional variables, effectively recovering the true sales baseline. This is augmented by feature-engineered gradient-boosted models (LightGBM and XGBoost) to analyze cross-product cannibalisation. To bridge the gap between complex data and business utility, we deployed a fully interactive, modular dashboard using Streamlit, allowing users to dynamically switch between SKU-level and portfolio-level analyses.
    </p>

    <p>
    The project successfully decouples core consumer demand from commercial noise. By providing distinct layers of abstraction tailored to specific stakeholders, the dashboard unifies cross-functional decision-making. The delivered prototype and transparent codebase provide Coca-Cola with a clean reference point for measuring promotional performance and serve as a scalable foundation for future trade uplift and portfolio optimisation modelling.
    </p>
</div>


---

## Video
<div style="display:flex; justify-content: center; align-items: center; margin-bottom: 2rem;">
    <video width="100%" controls>
        <source src="movie.mp4" type="video/mp4">
    Your browser does not support the video tag.
    </video>
</div>


---

## Meet the Team
<div class="team-wrapper">
    <div class="team">
    
        <div class="card">
            <img src="assets/images/gwen.png" alt="Avatar">
            <div class="container">
                <h4><b>Gwen Tan</b></h4>
                <div class="social-icons">
                    <a href="https://github.com/gw3nnipi3"><i class="fa-brands fa-github"></i></a>
                    <a href="https://linkedin.com/"><i class="fa-brands fa-linkedin"></i></a>
                </div>
                <p>Client Liaison, Programmer, Tester</p>
            </div>
        </div>

        <div class="card">
            <img src="assets/images/daniel.png" alt="Avatar">
            <div class="container">
                <h4><b>Daniel Htet</b></h4>
                <div class="social-icons">
                    <a href="https://github.com/Daniel-Htet"><i class="fa-brands fa-github"></i></a>
                    <a href="https://linkedin.com/"><i class="fa-brands fa-linkedin"></i></a>
                </div>
                <p>Programmer, Tester, Researcher</p>
            </div>
        </div>

        <div class="card">
            <img src="assets/images/timothy.png" alt="Avatar">
            <div class="container">
                <h4><b>Timothy Liu</b></h4>
                <div class="social-icons">
                    <a href="https://github.com/tt1m"><i class="fa-brands fa-github"></i></a>
                    <a href="https://linkedin.com/in/timothyliu-dev/"><i class="fa-brands fa-linkedin"></i></a>
                </div>
                <p>Programmer, Tester</p>
            </div>
        </div>
    </div>
</div>
<br>

---

## Project Timeline
<div style="display:flex; justify-content: center; align-items: center; margin-bottom: 2rem;">
    <img width="100%" src="assets/images/gantt_chart.png" alt="Gantt Chart"></img>
</div>

<style>
    .md-header__source {
        display: none;
    }

    .team-wrapper {
        padding-top: 20px;
        padding-bottom: 0;
        display: flex;
        justify-content: center;
    }

    .team {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 20px;
        width: 100%;
        max-width: 1200px;
        margin-bottom: 0;
    }

    .card {
        flex: 1 1 300px;              
        max-width: 350px;
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        border-radius: 8px;
        overflow: hidden;
        text-align: start;
        padding: 1rem;
    }

    .card img {
        width: 100%;
        height: auto;
    }
</style>
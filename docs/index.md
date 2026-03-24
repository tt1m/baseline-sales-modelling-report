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

<div class="wrapper">

<section>
    <div style="text-align: center; padding: 2rem 1rem; background-color: transparent; margin: 0;">
        <h1 class="static-title">
            <img src="/images/cocacolalogo.png" alt="Coca-Cola Logo" style="height: 100px; vertical-align: middle; margin-right: 0.5rem;">
           Baseline Sales Modelling
        </h1>
        <img src="/images/dashboard.png" alt="Image of dashboard" class="dashboard-image">
        <p style="
            font-size: 1rem; 
            color: var(--md-default-fg-color--light); 
            margin-bottom: 4.5rem;
            max-width: 800px;
            margin-left: auto;
            margin-right: auto;
        ">
        An interactive dashboard that quantifies baseline demand, promotional uplift, and cannibalisation effects.
        </p>
    </div>
</section>

<style>
/* Title styling */
.static-title {
    font-size: 3.2rem !important; /* bigger for impact */
    font-weight: 900;
    color: #800000; /* deep maroon */
    line-height: 1.2;
    letter-spacing: 1px;
    text-shadow: 3px 3px 10px rgba(0,0,0,0.25);
    margin-bottom: 0.5rem;
}

/* Dashboard image styling */
.dashboard-image {
    border-radius: 12px; 
    width: 70%; 
    box-shadow: 0 12px 30px rgba(0,0,0,0.2);
}
</style>

<hr>

<h2>Abstract</h2>

<div class="grid-3-cards">

    <div class="abstract-card">
        <h3 class="card-title">The Challenge</h3>
        <p>
        In the Fast-Moving Consumer Goods (FMCG) sector, retail sales data is inherently noisy. Historical sales are skewed by promotions, pricing, and seasonality, making it difficult to establish a “normal” sales baseline and measure true demand.
        </p>
    </div>

    <div class="abstract-card">
        <h3 class="card-title">Our Approach</h3>
        <p>
        Working with Coca-Cola, we used SARIMAX forecasting to isolate baseline demand and gradient-boosted models (LightGBM/XGBoost) to analyze cross-product cannibalisation. All outputs are visualized in an interactive Streamlit dashboard.
        </p>
    </div>

    <div class="abstract-card">
        <h3 class="card-title">Impact</h3>
        <p>
        The project decouples core consumer demand from commercial noise, providing tailored insights for analysts, marketing, and commercial teams. The dashboard unifies cross-functional decision-making and offers a scalable foundation for future portfolio optimisation.
        </p>
    </div>

</div>

<hr>

<h2>Video</h2>

<div style="display:flex; justify-content: center; align-items: center; margin-bottom: 2rem;">

    <video width="100%" controls>
        <source src="movie.mp4" type="video/mp4">
    Your browser does not support the video tag.
    </video>
</div>


<hr>

<h2>Meet the Team</h2>

<div class="team-wrapper">


    <div class="team">
    
        <div class="card">
            <img src="/images/gwen.jpg" alt="Avatar" class="circle-image">
            <div class="container">
                <h4><b>Gwen Tan</b></h4>
                <div class="social-icons">
                    <a href="https://github.com/gw3nnipi3"><i class="fa-brands fa-github"></i></a>
                    <a href="https://linkedin.com/in/gwendolyntan343/"><i class="fa-brands fa-linkedin"></i></a>
                </div>
                <p>Client Liaison, Programmer, Report Editor, Tester</p>
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

<hr>

<h2>Project Timeline<h2>

<div style="display:flex; justify-content: center; align-items: center; margin-bottom: 2rem;">
    <img width="100%" src="assets/images/gantt_chart.png" alt="Gantt Chart"></img>
</div>

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
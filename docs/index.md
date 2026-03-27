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
            <img src="assets/images/cocacolalogo.png" alt="Coca-Cola Logo" style="height: 100px; vertical-align: middle; margin-right: 0.5rem;">
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
            <img src="assets/images/gwen.jpg" alt="Avatar" class="circle-image">
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

<h2>Project Timeline</h2>

<div class="gantt-container">

  <!-- Header -->
  <div class="gantt-header">
    <div>Task</div>
    <div>W1</div><div>W2</div><div>W3</div><div>W4</div><div>W5</div><div>W6</div>
    <div>W7</div><div>W8</div><div>W9</div><div>W10</div><div>W11</div><div>W12</div>
    <div>W13</div><div>W14</div><div>W15</div><div>W16</div><div>W17</div><div>W18</div>
    <div>W19</div><div>W20</div><div>W21</div><div>W22</div><div>W23</div><div>W24</div>
  </div>

  <!-- ===================== -->
  <!-- PROJECT RESEARCH -->
  <!-- ===================== -->

  <div class="section-title">Project Research</div>

  <div class="gantt-row">
    <div>Gathering Requirements</div>
    <div></div>
    <div class="p100 span-3"></div>
  </div>

  <div class="gantt-row">
    <div>Research Existing Models/Apps</div>
    <div></div>
    <div class="p100 span-4"></div>
  </div>

  <div class="gantt-row">
    <div>UI Design</div>
    <div></div><div></div>
    <div class="p100 span-4"></div>
  </div>

  <div class="gantt-row">
    <div>Model Selection</div>
    <div></div><div></div><div></div>
    <div class="p100 span-3"></div>
  </div>

  <!-- ===================== -->
  <!-- BACKEND -->
  <!-- ===================== -->

  <div class="section-title">Backend Development</div>

  <div class="gantt-row">
    <div>Data Loading & Preprocessing</div>
    <div></div><div></div><div></div><div></div>
    <div class="p100 span-6"></div>
  </div>

  <div class="gantt-row">
    <div>Model Experimentation</div>
    <div></div><div></div><div></div><div></div><div></div>
    <div class="p66 span-6"></div>
  </div>

  <div class="gantt-row">
    <div>SARIMAX Modelling</div>
    <div></div><div></div><div></div><div></div><div></div><div></div>
    <div class="p100 span-4"></div>
  </div>

  <div class="gantt-row">
    <div>Prophet Modelling (Final)</div>
    <div></div><div></div><div></div><div></div><div></div><div></div>
    <div></div>
    <div class="p90 span-5"></div>
  </div>

  <div class="gantt-row">
    <div>Accuracy Metrics (RMSE, MAPE)</div>
    <div></div><div></div><div></div><div></div><div></div><div></div>
    <div></div><div></div>
    <div class="p66 span-4"></div>
  </div>

  <!-- ===================== -->
  <!-- FRONTEND -->
  <!-- ===================== -->

  <div class="section-title">Frontend Development</div>

  <div class="gantt-row">
    <div>Streamlit Setup</div>
    <div></div><div></div><div></div><div></div><div></div>
    <div class="p100 span-3"></div>
  </div>

  <div class="gantt-row">
    <div>Interface Design</div>
    <div></div><div></div><div></div><div></div><div></div>
    <div class="p90 span-6"></div>
  </div>

  <div class="gantt-row">
    <div>Widget Rendering</div>
    <div></div><div></div><div></div><div></div><div></div><div></div>
    <div class="p90 span-5"></div>
  </div>

  <div class="gantt-row">
    <div>Widget Filters</div>
    <div></div><div></div><div></div><div></div><div></div><div></div>
    <div></div>
    <div class="p66 span-5"></div>
  </div>

  <div class="gantt-row">
    <div>Importing Data</div>
    <div></div><div></div><div></div><div></div><div></div><div></div>
    <div></div><div></div>
    <div class="p66 span-4"></div>
  </div>

  <div class="gantt-row">
    <div>Layout Export / Import</div>
    <div></div><div></div><div></div><div></div><div></div><div></div>
    <div></div><div></div><div></div>
    <div class="p66 span-4"></div>
  </div>

  <div class="gantt-row">
    <div>Forecast Options</div>
    <div></div><div></div><div></div><div></div><div></div><div></div>
    <div></div><div></div><div></div><div></div>
    <div class="p66 span-4"></div>
  </div>

  <!-- ===================== -->
  <!-- FINAL -->
  <!-- ===================== -->

  <div class="section-title">Final Stages</div>

  <div class="gantt-row">
    <div>Unit Testing</div>
    <div></div><div></div><div></div><div></div><div></div><div></div>
    <div></div><div></div><div></div><div></div><div></div>
    <div class="p90 span-4"></div>
  </div>

  <div class="gantt-row">
    <div>Demos</div>
    <div></div><div></div><div></div><div></div><div></div><div></div>
    <div></div><div></div><div></div><div></div><div></div><div></div>
    <div class="p100 span-3"></div>
  </div>

  <div class="gantt-row">
    <div>Project Showcase</div>
    <div></div><div></div><div></div><div></div><div></div><div></div>
    <div></div><div></div><div></div><div></div><div></div><div></div>
    <div class="p90 span-3"></div>
  </div>

  <div class="gantt-row">
    <div>Report Writing</div>
    <div></div><div></div><div></div><div></div><div></div><div></div>
    <div></div><div></div><div></div>
    <div class="p90 span-6"></div>
  </div>

  <div class="gantt-row">
    <div>Report Website</div>
    <div></div><div></div><div></div><div></div><div></div><div></div>
    <div></div><div></div><div></div><div></div>
    <div class="p90 span-5"></div>
  </div>

  <div class="gantt-row">
    <div>Deployment</div>
    <div></div><div></div><div></div><div></div><div></div><div></div>
    <div></div><div></div><div></div><div></div><div></div>
    <div class="p100 span-2"></div>
  </div>

</div>

<style>
.gantt-container {
    display: grid;
    gap: 2px;
    background: #ddd;
    border-radius: 10px;
    overflow-x: auto;
    font-size: 12px;
}

/* Header */
.gantt-header {
    display: grid;
    grid-template-columns: 200px repeat(24, 1fr);
    background: #8B1A1A;
    color: white;
    font-weight: bold;
    text-align: center;
}

/* Rows */
.gantt-row {
    display: grid;
    grid-template-columns: 200px repeat(24, 1fr);
    background: white;
}

.gantt-row div {
    border: 1px solid #eee;
    height: 28px;
    padding: 4px 8px;
}

/* Section titles */
.section-title {
    background: #ffe5e5;
    font-weight: bold;
    padding: 0.5rem;
}

/* Progress colours */
.p33 { background: #ffb3c1; }
.p66 { background: #ff4d6d; }
.p90, .p100 { background: #E41E26; }

/* Span helpers */
[class*="span-"] {
    grid-column: span var(--span);
}
.span-2 { grid-column: span 2; }
.span-3 { grid-column: span 3; }
.span-4 { grid-column: span 4; }
.span-5 { grid-column: span 5; }
.span-6 { grid-column: span 6; }

</style>

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
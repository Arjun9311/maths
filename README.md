# Election Opinion Poll Simulator

> **An Interactive Sampling & Estimation Learning Tool**  
> An educational web application designed for students and researchers to explore survey sampling, statistical distributions, point and interval estimation, and the Central Limit Theorem through client-side stochastic simulations.

---

## 1. Project Overview

The **Election Opinion Poll Simulator** is an interactive, browser-based laboratory that brings textbook statistics to life. Rather than merely presenting static equations, the simulator allows users to:
1. Define a ground-truth population of 10,000 simulated voters with categorical preferences (**Option A**, **Option B**, **Option C**) and continuous demographic variables (**Voter Age**).
2. Choose from three fundamental sampling methodologies: **Simple Random Sampling (SRS)**, **Systematic Sampling**, and **Stratified Sampling**.
3. Draw random samples of varying sample sizes ($n = 50, 100, 250, 500, 1000$) to observe how sample statistics fluctuate around the true population parameters.
4. Calculate and visualize point estimates, standard errors with Finite Population Correction (FPC), and 95% confidence intervals (Wald and Wilson Score).
5. Generate repeated sample batches ($M = 100, 500, 1000$) to empirically construct the **Sampling Distribution** and verify the **Central Limit Theorem (CLT)**.
6. Explore key classical distributions used in inferential statistics:
   - **Student's t-distribution** for population mean inference with unknown variance.
   - **Chi-Square distribution ($\chi^2$)** for testing categorical goodness-of-fit.
   - **F-distribution** for One-Way Analysis of Variance (ANOVA) variance ratios across demographic groups.

> **Important Educational Note:**  
> This project is strictly for educational statistics instruction. All voter preferences and demographics are synthetically generated. It contains no real election data, makes no real-world predictions, and does not rank or endorse candidates or political entities.

---

## 2. Core Statistical Concepts Demonstrated

### A. Sampling Protocols
- **Simple Random Sampling (SRS):** Every member of population $N$ has an equal probability of selection: $P = \frac{n}{N}$.
- **Systematic Sampling:** Observations are sampled at fixed intervals $k = \lfloor N/n \rfloor$ starting from a randomly selected initial index $r \in [0, k-1]$.
- **Stratified Sampling:** The population is divided into non-overlapping strata (e.g., choice preferences), and random samples are drawn proportionally from each stratum ($n_h = n \cdot \frac{N_h}{N}$), eliminating stratum variance.

### B. Point & Interval Estimation
- **Sample Proportion ($\hat{p}$):** An unbiased estimator of the population proportion $P$:
  $$\hat{p} = \frac{x}{n}, \quad \mathbb{E}[\hat{p}] = P$$
- **Finite Population Correction (FPC):** Applied when sampling without replacement from a finite universe:
  $$\text{FPC} = \sqrt{\frac{N - n}{N - 1}}$$
- **Standard Error ($SE$):**
  $$SE(\hat{p}) = \sqrt{\frac{\hat{p}(1 - \hat{p})}{n}} \times \text{FPC}$$
- **Wald 95% Confidence Interval:**
  $$\hat{p} \pm z_{\alpha/2} \cdot SE(\hat{p}) \quad (\text{where } z_{0.025} \approx 1.960)$$
- **Wilson Score Interval:** Robust interval preventing probability boundary violations for small sample sizes or proportions near 0 or 1.

### C. The Central Limit Theorem (CLT)
Demonstrates that regardless of population skewness, the distribution of sample proportions and sample means becomes approximately Gaussian ($\mathcal{N}(P, \sigma^2/n)$) as sample size $n$ increases, with standard error shrinking proportional to $1/\sqrt{n}$.

### D. Classical Inferential Distributions
1. **Student's t-Distribution:**
   Used for inference on the continuous variable **Voter Age** when population standard deviation $\sigma$ is unknown:
   $$t = \frac{\bar{x} - \mu}{s / \sqrt{n}}, \quad df = n - 1$$
   The UI includes an interactive degrees-of-freedom slider ($df = 1 \dots 60$) displaying how heavier tails transition to the Gaussian normal curve.
2. **Chi-Square Distribution ($\chi^2$):**
   Tests categorical goodness-of-fit:
   $$\chi^2 = \sum_{i=1}^k \frac{(O_i - E_i)^2}{E_i}, \quad df = k - 1 = 2$$
   Calculates the test statistic, $p$-value, and plots the rejection region on the $\chi^2$ density curve.
3. **F-Distribution (One-Way ANOVA):**
   Examines whether voter age variance differs across the three choice groups:
   $$F = \frac{MS_{\text{between}}}{MS_{\text{within}}}, \quad df_1 = 2, \quad df_2 = n - 3$$

---

## 3. Technology Stack

- **Framework:** React.js 19
- **Build Tool:** Vite 8 (Hot Module Replacement, fast bundling)
- **Charts & Data Visualization:** Recharts
- **Icons:** Lucide React
- **Styling:** Modern Vanilla CSS design system with custom properties, responsive flexbox/grid, and academic dashboard aesthetics.
- **Computation Engine:** Pure client-side JavaScript implementing Lanczos log-gamma approximations, continued fractions for incomplete Beta and Gamma functions, and Peter J. Acklam's inverse normal algorithm.

---

## 4. Installation & Local Execution

### Prerequisites
- Node.js (v18 or higher recommended; verified on Node v24)
- npm (v9 or higher)

### Steps to Run

1. Clone or navigate to the project directory:
   ```bash
   cd "c:\Users\hp\projects\maths project"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Launch the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:5173/
   ```

5. To create a production bundle:
   ```bash
   npm run build
   ```

---

## 5. Project Directory Structure

```
maths-project/
├── index.html                        # App shell, SEO meta, and typography imports
├── package.json                      # Project manifest and scripts
├── vite.config.js                    # Vite configuration
├── README.md                         # Documentation and user guide
├── src/
│   ├── main.jsx                      # React 19 root mounting
│   ├── App.jsx                       # Main application state and dashboard composition
│   ├── index.css                     # Complete academic design system & UI tokens
│   ├── components/
│   │   ├── Header.jsx                # Header, navigation links, simulation badge
│   │   ├── Introduction.jsx          # Problem statement, definitions, and visual pipeline
│   │   ├── KpiCards.jsx              # 4 Live KPI metrics (N, n, Estimate, 95% CI)
│   │   ├── PopulationSetup.jsx       # Population sliders, validation, and Donut chart
│   │   ├── SamplingMethod.jsx        # SRS, Systematic, and Stratified interactive cards
│   │   ├── SampleControls.jsx        # Sample size presets, custom slider, action buttons
│   │   ├── SampleResults.jsx         # Frequency table, comparison bar chart, narrative
│   │   ├── PointEstimation.jsx       # Unbiased point estimator & population projection
│   │   ├── ConfidenceInterval.jsx    # Wald & Wilson formulas, Forest plot interval chart
│   │   ├── SamplingDistribution.jsx  # Batch generator (100-1000 draws), proportion histogram
│   │   ├── CLTDemo.jsx               # Visual CLT comparison (n = 10, 30, 100)
│   │   ├── VoterAgeDemo.jsx          # Continuous variable demo (mean, std dev, t-interval)
│   │   ├── TDistribution.jsx         # t-distribution vs Normal, interactive DF slider
│   │   ├── ChiSquareDistribution.jsx # Goodness-of-fit test, observed vs expected, χ² curve
│   │   ├── FDistribution.jsx         # One-Way ANOVA variance ratio, F curve
│   │   ├── EducationalPanel.jsx      # "What Did We Learn?" 8 summary cards
│   │   ├── TooltipIcon.jsx           # Accessible hover glossary tooltips
│   │   ├── AboutModal.jsx            # Project methodology and viva exam notes
│   │   └── Footer.jsx                # Official educational disclaimer and academic notes
│   ├── utils/
│   │   ├── statistics.js             # Means, variances, standard errors, Normal PDF/CDF/Inverse
│   │   ├── sampling.js               # Population generation, SRS, Systematic, Stratified
│   │   ├── confidenceIntervals.js    # Wald, Wilson Score, and Student's t CI formulas
│   │   └── distributions.js          # Gamma/Beta continued fractions, t, χ², and F distributions
│   └── data/
│       └── constants.js              # Simulation defaults, color palette, statistical glossary
```

---

## 6. How the Simulator Works: An Example Walkthrough

1. **Step 1: Population Ground Truth**
   The student opens the app to find an initial universe of $N = 10,000$ simulated voters: Option A (48% / 4,800 voters), Option B (32% / 3,200 voters), Option C (20% / 2,000 voters).
2. **Step 2: Choose Sampling Method**
   The student selects **Simple Random Sampling**, **Systematic Sampling**, or **Stratified Sampling**. An educational card highlights how each method draws observations.
3. **Step 3: Choose Sample Size**
   The student selects $n = 500$ (a 5.0% sampling fraction).
4. **Step 4: Generate Sample**
   Clicking **"Generate Random Sample"** draws 500 records from the population.
5. **Step 5: Inspect Point & Interval Estimates**
   - The **Sample Results** table displays counts (e.g., Option A = 241, 48.2%).
   - The **Comparison Bar Chart** visually contrasts sample percentages with true population percentages.
   - The **Confidence Interval Forest Plot** displays horizontal interval spans (e.g., 43.8% – 52.6%) and confirms whether the interval covers the true parameter (48.0%).
6. **Step 6: Explore Sampling Distributions**
   The student clicks **"Generate 100 Samples"** (or sets 500/1000 iterations) to build an empirical histogram of sample proportions, observing the mean converging to 48.0%.
7. **Step 7: Compare Sample Sizes in CLT**
   The **Central Limit Theorem** section compares distributions for $n = 10$, $n = 30$, and $n = 100$, demonstrating how standard error contracts with $1/\sqrt{n}$.
8. **Step 8: Numerical & Hypothesis Testing Modules**
   The student inspects the continuous **Voter Age** variable ($18-80$), analyzes degrees of freedom on the **Student's t-distribution**, checks **Chi-Square Goodness-of-Fit** residuals, and observes **F-distribution** ANOVA variance ratios.

---

## 7. Viva & Academic Examination Checklist

- **Why does the sample proportion vary from sample to sample?**  
  Because of *sampling error* / natural random variation inherent in selecting a subset rather than surveying the entire population.
- **What is the meaning of a 95% Confidence Interval?**  
  It does *not* mean there is a 95% probability that the true parameter lies in this specific calculated interval. Rather, in 95% of repeated samples taken under identical conditions, the constructed intervals will contain the true parameter.
- **When is the Finite Population Correction (FPC) necessary?**  
  When the sampling fraction $n/N > 0.05$ (5%), sampling without replacement substantially reduces variance compared to sampling from an infinite population.
- **Why use the t-distribution instead of the normal distribution for means?**  
  When population standard deviation $\sigma$ is unknown and replaced by sample standard deviation $s$, the extra estimation variability yields fatter tails, requiring larger critical values for the same confidence level.

---

## 8. License & Usage

Created for educational institutions, statistics classrooms, and viva demonstrations. Free for academic use.

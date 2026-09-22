/**
 * Educational Constants, Visual Configurations & Statistical Pedagogy
 */

export const DEFAULT_CONFIG = {
  populationSize: 10000,
  pctA: 48,
  pctB: 32,
  pctC: 20,
  sampleSize: 500,
  samplingMethod: 'srs', // 'srs' | 'systematic' | 'stratified'
  confidenceLevel: 0.95
};

export const COLOR_PALETTE = {
  optionA: '#3b82f6', // Rich Royal Blue
  optionB: '#8b5cf6', // Violet / Purple
  optionC: '#10b981', // Emerald Green
  sampleA: '#60a5fa',
  sampleB: '#a78bfa',
  sampleC: '#34d399',
  accent: '#6366f1',
  neutral: '#64748b',
  critical: '#ef4444',
  highlight: '#f59e0b'
};

export const SAMPLE_SIZE_PRESETS = [50, 100, 250, 500, 1000];
export const REPEATED_SAMPLES_PRESETS = [100, 500, 1000];
export const CLT_SAMPLE_SIZES = [10, 30, 100];

export const STATISTICAL_GLOSSARY = {
  sampling: "Selecting a representative subset of observations from a population to draw inferences about the entire population.",
  population: "The entire group of items, individuals, or simulated voters being studied (parameter N).",
  sample: "A smaller subset of observations selected from the population upon which statistics are measured (size n).",
  pointEstimate: "A single numerical value computed from sample data used as a best guess for an unknown population parameter.",
  confidenceInterval: "An interval estimate computed from sample data that expresses the degree of uncertainty associated with the point estimate.",
  samplingDistribution: "The theoretical or empirical probability distribution of a given sample statistic (e.g., sample proportion) obtained from repeated independent samples of the same size.",
  centralLimitTheorem: "The fundamental theorem stating that the distribution of sample means or proportions approaches a normal distribution as sample size n grows large, regardless of the underlying population shape.",
  degreesOfFreedom: "The number of independent values or quantities that can vary in an analysis without violating given statistical constraints (e.g., df = n - 1 for sample mean).",
  standardError: "The standard deviation of the sampling distribution of a statistic, measuring the statistical dispersion of estimates from sample to sample.",
  fpc: "Finite Population Correction: A factor sqrt((N-n)/(N-1)) applied when sampling without replacement from a finite population, accounting for reduced uncertainty as sample size approaches population size.",
  tDistribution: "Student's t-distribution: A symmetric bell curve with heavier tails than the standard normal distribution, appropriate for estimating population means when population standard deviation is unknown.",
  chiSquareDistribution: "A right-skewed continuous probability distribution used to test categorical goodness-of-fit, independence, and population variances.",
  fDistribution: "A continuous probability distribution formed by the ratio of two independent chi-square variables divided by their respective degrees of freedom, foundational to ANOVA and variance comparison."
};

/**
 * 4. "Teach Me" Mini Lessons for Interactive Modals
 */
export const TEACH_ME_LESSONS = {
  population: {
    title: "Understanding Population",
    steps: [
      {
        title: "The Complete Group",
        body: "A population is the total set of individuals, objects, or events you want to study. In our simulator, the population is 10,000 simulated voters.",
        highlight: "N = 10,000",
        takeaway: "Studying every single person (a census) is often too expensive or impossible in the real world."
      },
      {
        title: "The Unknown Truth (Parameters)",
        body: "Numbers describing the entire population are called parameters (like P, the true proportion of voters who prefer Option A).",
        highlight: "Parameter P",
        takeaway: "In real life, parameters are usually unknown because we cannot ask all 10,000 people."
      },
      {
        title: "The Need for a Proxy",
        body: "Because studying everyone is impractical, we select a smaller, representative group to study instead.",
        highlight: "Proxy Approach",
        takeaway: "This leads us directly to the concept of Sampling."
      }
    ]
  },
  sampling: {
    title: "Understanding Sampling",
    steps: [
      {
        title: "Selecting a Smaller Group",
        body: "Sampling is the process of choosing a manageable subset of observations from the population.",
        highlight: "Sample Size n = 500",
        takeaway: "A well-designed sample reflects the diversity of the larger population."
      },
      {
        title: "Avoiding Bias",
        body: "To be reliable, every member must have a known chance of selection (like in Simple Random Sampling, Systematic, or Stratified Sampling).",
        highlight: "Random Selection",
        takeaway: "Randomization eliminates researcher bias and ensures valid statistical inference."
      },
      {
        title: "The Trade-off: Efficiency vs Certainty",
        body: "Working with 500 people takes 95% less effort than 10,000, but introduces slight sampling variation.",
        highlight: "Smart Trade-off",
        takeaway: "Statistics gives us tools to measure and control this uncertainty."
      }
    ]
  },
  pointEstimate: {
    title: "Understanding Point Estimation",
    steps: [
      {
        title: "From Sample to Number",
        body: "Once we collect our sample of 500 voters, we calculate a sample statistic (such as p̂ = 48.2% voting for Option A).",
        highlight: "Statistic p̂ = 48.2%",
        takeaway: "A statistic is a number calculated strictly from the sample data."
      },
      {
        title: "Using It as Our Best Guess",
        body: "Point estimation means using this single sample number as our best estimate for the unknown population parameter P.",
        highlight: "p̂ ≈ P",
        takeaway: "We use the known sample value to estimate the unobserved population truth."
      },
      {
        title: "The Limitation of One Number",
        body: "If we picked another 500 people, we might get 47.6% or 49.1%. A single number hides this variability.",
        highlight: "One Number is Incomplete",
        takeaway: "That's why we need an interval estimate (Confidence Interval)."
      }
    ]
  },
  confidenceInterval: {
    title: "Understanding Confidence Intervals",
    steps: [
      {
        title: "Adding a Margin of Error",
        body: "Instead of saying 'The true proportion is 48.2%', we say 'The estimate is 48.2% ± 3.8%'.",
        highlight: "Estimate ± Margin of Error",
        takeaway: "This creates a plausible range of values (e.g. 44.4% to 52.0%)."
      },
      {
        title: "What 95% Confidence Means",
        body: "If we drew 100 separate random samples and built an interval for each, about 95 of those intervals would capture the true population parameter.",
        highlight: "95 out of 100 Samples",
        takeaway: "Confidence describes the reliability of the estimation procedure over repeated sampling."
      },
      {
        title: "Controlling Interval Width",
        body: "Increasing sample size makes the interval narrower (more precise). Increasing confidence level (e.g. to 99%) makes the interval wider.",
        highlight: "Width vs Precision",
        takeaway: "Larger samples give narrower intervals without sacrificing confidence."
      }
    ]
  },
  samplingDistribution: {
    title: "Understanding Sampling Distributions",
    steps: [
      {
        title: "What if We Repeated the Experiment?",
        body: "Imagine taking a sample of 100 people today, another tomorrow, and repeating 500 times.",
        highlight: "Repeated Samples",
        takeaway: "Each sample gives a slightly different estimate (p̂₁, p̂₂, p̂₃...)."
      },
      {
        title: "The Collection of All Estimates",
        body: "If we plot all 500 estimates as a histogram, we get the Sampling Distribution of the statistic.",
        highlight: "Histogram of Estimates",
        takeaway: "The estimates cluster closely around the true population proportion."
      },
      {
        title: "Measuring Spread (Standard Error)",
        body: "The standard deviation of this distribution is called the Standard Error (SE). It quantifies typical estimation error.",
        highlight: "Standard Error",
        takeaway: "Standard Error shrinks as the sample size increases by 1/√n."
      }
    ]
  },
  clt: {
    title: "Understanding the Central Limit Theorem (CLT)",
    steps: [
      {
        title: "The Magic of Averages",
        body: "Even if individual voters make binary choices (Yes/No), the average of many random samples forms a smooth bell curve.",
        highlight: "Bell Curve Emergence",
        takeaway: "The CLT applies even when the original population is not bell-shaped."
      },
      {
        title: "Effect of Sample Size (n)",
        body: "At small sample sizes (n = 5), the distribution may be choppy. At n = 30 or 100, it becomes remarkably normal.",
        highlight: "Rule of Thumb: n ≥ 30",
        takeaway: "Larger sample sizes tighten the bell curve around the true population parameter."
      },
      {
        title: "Why it Matters Everywhere",
        body: "CLT allows statisticians to use the standard Normal distribution for confidence intervals and hypothesis testing.",
        highlight: "Universal Bridge",
        takeaway: "It transforms complex real-world data into predictable mathematical models."
      }
    ]
  },
  distributionLab: {
    title: "Understanding Statistical Distributions",
    steps: [
      {
        title: "Normal vs Student's t",
        body: "When we don't know the population standard deviation and rely on sample estimates with small samples, Student's t-distribution has fatter tails to protect against unexpected variability.",
        highlight: "t-Distribution (Unknown Variance)",
        takeaway: "As sample size grows, the t-distribution becomes identical to the Normal Z-curve."
      },
      {
        title: "Chi-Square (χ²)",
        body: "Used to test whether observed counts across categories (e.g. Option A, B, C) match expected demographic proportions.",
        highlight: "Goodness of Fit",
        takeaway: "A large Chi-square statistic means observed counts deviate significantly from expectation."
      },
      {
        title: "F-Distribution",
        body: "Compares the ratio of two variances. In ANOVA, it tests whether average differences between groups exceed random variation within groups.",
        highlight: "Variance Ratio",
        takeaway: "The F-distribution helps evaluate multiple group differences at once."
      }
    ]
  }
};

/**
 * 5. "Why?" Explanations
 */
export const WHY_EXPLANATIONS = {
  sampling: {
    question: "Why do we use sampling instead of studying everyone?",
    answer: "Because conducting an exhaustive census of a large population (like 10,000 or 100,000,000 citizens) takes immense time, money, and logistical effort. A scientifically chosen sample of just a few hundred or thousand gives surprisingly accurate answers at a tiny fraction of the cost."
  },
  pointEstimate: {
    question: "Why do we estimate instead of measuring directly?",
    answer: "Because the true population parameter is hidden or practically unobservable. Our calculated sample statistic (such as p̂) is the best, most unbiased single-number substitute available."
  },
  confidenceInterval: {
    question: "Why give an interval instead of just one number?",
    answer: "Because different random samples naturally yield slightly different results. Stating an interval (like 45% to 51%) honestly communicates the uncertainty of our estimate and shows the margin of error."
  },
  repeatedSampling: {
    question: "Why study repeated sampling if we only take one sample in real life?",
    answer: "Even though a researcher only collects one sample, statistical theory is built on knowing how all possible samples would behave. Repeated sampling reveals the long-run pattern (the sampling distribution), proving why our single sample can be trusted."
  },
  clt: {
    question: "Why is the Central Limit Theorem called 'the heart of statistics'?",
    answer: "Because it guarantees that sample averages follow a predictable normal bell curve regardless of the original population distribution shape, provided the sample size is large enough. This allows us to calculate exact probabilities and confidence intervals."
  },
  tDistribution: {
    question: "Why do we need Student's t-distribution instead of Normal Z?",
    answer: "In real life, we almost never know the true population standard deviation (σ); we must estimate it using the sample standard deviation (s). This extra estimation adds uncertainty, especially for small samples. The t-distribution has heavier tails to account for this."
  },
  chiSquare: {
    question: "Why do we use the Chi-Square test?",
    answer: "It measures the total discrepancy between what we actually observed in categories and what we theoretically expected. If the difference is large, it suggests our assumptions or hypotheses about the population need revision."
  },
  fDistribution: {
    question: "Why do we use the F-distribution?",
    answer: "When comparing variances or testing whether three or more group means are truly different (ANOVA), the F-distribution models the ratio of between-group variation to within-group variation."
  }
};

/**
 * 7. "How Do I Explain This?" Spoken Elevator Pitches (15-20 Seconds)
 */
export const HOW_TO_EXPLAIN = {
  sampling: {
    title: "Sampling (20-Second Viva Pitch)",
    text: "We have a large population of 10,000 voters. Instead of polling every person, which is impractical, we draw a representative sample of 500 using random selection. This guarantees that every individual has an equal chance of being picked, allowing us to learn about the big group from the small group."
  },
  pointEstimate: {
    title: "Point Estimation (15-Second Viva Pitch)",
    text: "Point estimation uses a single statistic calculated from our sample—such as the sample proportion p̂ = 48.2%—as our best single-number guess for the unknown true population proportion P. It's a quick, unbiased estimate."
  },
  confidenceInterval: {
    title: "Confidence Interval (20-Second Viva Pitch)",
    text: "A single number doesn't reveal sampling uncertainty. A confidence interval provides a range—like 44.1% to 52.3%—calculated with 95% confidence. This means 95% of intervals constructed with this procedure across repeated samples will capture the true population parameter."
  },
  samplingDistribution: {
    title: "Sampling Distribution (20-Second Viva Pitch)",
    text: "A sampling distribution is the distribution of statistics obtained if we repeated our sampling procedure hundreds of times. It shows how the sample statistic varies from sample to sample, clustering symmetrically around the true population parameter."
  },
  clt: {
    title: "Central Limit Theorem (20-Second Viva Pitch)",
    text: "The Central Limit Theorem states that as sample size n grows large (typically n ≥ 30), the distribution of sample averages approaches a normal bell curve, even if the underlying population is skewed or categorical. It is the mathematical backbone of inference."
  },
  tDistribution: {
    title: "Student's t-Distribution (15-Second Viva Pitch)",
    text: "We use the t-distribution when estimating a population mean and the true population standard deviation is unknown. It has fatter tails than the normal curve to compensate for the added uncertainty of small samples."
  },
  chiSquare: {
    title: "Chi-Square Test (15-Second Viva Pitch)",
    text: "Chi-square measures the squared differences between observed category counts and expected counts. If the chi-square statistic is large, it proves the observed distribution deviates significantly from theoretical expectations."
  },
  fDistribution: {
    title: "F-Distribution (15-Second Viva Pitch)",
    text: "The F-distribution evaluates the ratio of two variances. In Analysis of Variance (ANOVA), it determines whether the variability between multiple groups is significantly greater than the random noise within the groups."
  }
};

/**
 * 9 & 39. Full Viva Explanation Deck (10s, 30s, 1m)
 */
export const VIVA_EXPLANATIONS = {
  short10s: {
    duration: "10 Seconds",
    heading: "The Elevator Pitch",
    script: "This simulator visually demonstrates how we can draw a small random sample from a large population, calculate statistics, estimate unknown parameters with confidence intervals, and understand uncertainty through sampling distributions and the Central Limit Theorem."
  },
  medium30s: {
    duration: "30 Seconds",
    heading: "The Core Statistical Story",
    script: "We simulate an electorate of 10,000 voters where true preferences are unknown. By drawing a representative sample of 500, we calculate sample statistics as point estimates. Because samples naturally vary, we construct 95% confidence intervals to quantify uncertainty. By repeating this process hundreds of times, we demonstrate empirical sampling distributions and verify the Central Limit Theorem live in the browser."
  },
  full1m: {
    duration: "1 Minute",
    heading: "Comprehensive Academic Explanation",
    script: `Respected examiner, this project is an interactive statistical laboratory addressing the core challenge of inferential statistics: learning about an entire population when an exhaustive census is impossible.

1. Problem & Population: We define a universe of 10,000 observations with unknown parameters.
2. Sampling: We extract random, systematic, or stratified samples (e.g. n = 500) to balance cost and precision.
3. Estimation: We compute sample statistics (p̂) as point estimates, and expand them into confidence intervals with finite population correction to capture uncertainty.
4. Sampling Distribution: By automating hundreds of repeated draws, we visualize the empirical sampling distribution clustering around the true parameter.
5. Central Limit Theorem: We prove that as sample size increases, the distribution converges to a normal bell curve.
6. Diagnostic Distributions: Finally, we provide an interactive laboratory for Normal, Student's t, Chi-Square, and F distributions.

Every single visual element is powered by live mathematical algorithms, making abstract formulas tangible and intuitive.`
  }
};

/**
 * 27. Interactive Statistics Dictionary Entries
 */
export const STATISTICS_DICTIONARY = [
  {
    term: "Population",
    symbol: "N",
    category: "Basics",
    definition: "The entire collection of individuals, items, or events about which information is sought.",
    analogy: "All the soup in a large cooking pot.",
    example: "All 10,000 voters registered in an election district."
  },
  {
    term: "Sample",
    symbol: "n",
    category: "Basics",
    definition: "A subset of the population selected for observation and analysis.",
    analogy: "A single spoonful of soup taken to taste.",
    example: "500 voters contacted randomly for an opinion poll."
  },
  {
    term: "Parameter",
    symbol: "P, μ, σ",
    category: "Basics",
    definition: "A fixed, numerical summary value that describes a characteristic of the entire population (usually unknown).",
    analogy: "The exact overall saltiness of the entire pot of soup.",
    example: "The exact true percentage of all 10,000 voters who prefer Option A."
  },
  {
    term: "Statistic",
    symbol: "p̂, x̄, s",
    category: "Basics",
    definition: "A numerical summary value computed from sample data, used to estimate population parameters.",
    analogy: "The saltiness tasted in your single spoonful.",
    example: "The 48.2% preference for Option A observed among the 500 sampled voters."
  },
  {
    term: "Point Estimate",
    symbol: "p̂",
    category: "Estimation",
    definition: "A single number calculated from a sample that serves as the best guess for the unknown population parameter.",
    analogy: "Saying: 'I think the pot needs 1 more pinch of salt based on this spoonful.'",
    example: "Claiming the electorate proportion is approximately 48.2% based on our sample."
  },
  {
    term: "Confidence Interval",
    symbol: "[L, U]",
    category: "Estimation",
    definition: "A range of values, calculated with a specified confidence level (e.g. 95%), that is likely to contain the true parameter.",
    analogy: "Saying: 'The soup saltiness is between mild and moderate.'",
    example: "[44.1%, 52.3%] communicates our margin of error around the 48.2% estimate."
  },
  {
    term: "Standard Error",
    symbol: "SE",
    category: "Inference",
    definition: "The standard deviation of the sampling distribution of a statistic, measuring how much estimates vary across samples.",
    analogy: "How much the taste might differ if you took 10 different spoonfuls.",
    example: "SE = √(p(1-p)/n) ≈ 2.2%."
  },
  {
    term: "Sampling Distribution",
    symbol: "f(p̂)",
    category: "Inference",
    definition: "The theoretical probability distribution of a statistic obtained from repeated independent samples of size n.",
    analogy: "A logbook recording the taste of 1,000 separate spoonfuls.",
    example: "A histogram of 500 sample proportions centered around the true parameter."
  },
  {
    term: "Central Limit Theorem",
    symbol: "CLT",
    category: "Theory",
    definition: "States that the sampling distribution of the mean approaches normality as sample size increases, regardless of the population distribution shape.",
    analogy: "Rolling 10 dice: individual dice give flat 1-6 values, but their average almost always forms a smooth bell curve around 3.5.",
    example: "Sample proportions from binary Yes/No voters forming a bell-shaped histogram."
  },
  {
    term: "Degrees of Freedom",
    symbol: "df",
    category: "Distributions",
    definition: "The number of independent pieces of information available to estimate another parameter.",
    analogy: "If you have 7 hats for 7 days, you can choose freely for 6 days, but on the 7th day you must wear whatever is left (df = 6).",
    example: "In a sample of size n, df = n - 1 for estimating variance."
  }
];

/**
 * 28. Real-Life Analogies
 */
export const REAL_LIFE_ANALOGIES = {
  soup: {
    title: "Tasting a Pot of Soup",
    concept: "Sampling & Estimation",
    description: "You don't need to drink the entire pot of soup to know if it needs salt. You stir it well (randomization) and taste one spoonful (sample). That one spoonful lets you estimate the taste of the entire pot."
  },
  bloodTest: {
    title: "A Routine Blood Test",
    concept: "Representative Sample",
    description: "When a doctor checks your cholesterol, they don't drain all 5 liters of your blood. A small vial (a tiny sample) gives an accurate diagnostic reading of your entire circulatory system."
  },
  manufacturing: {
    title: "Factory Quality Control",
    concept: "Sampling without Destruction",
    description: "If a lightbulb factory tested every single bulb until it burned out to measure average lifespan, they'd have no bulbs left to sell! Testing a sample of 100 bulbs protects the inventory while providing reliable quality estimates."
  }
};

/**
 * 8. Presentation Mode (10 Slides)
 */
export const PRESENTATION_SLIDES = [
  {
    id: 1,
    slideNumber: "01",
    title: "What is the Problem?",
    subtitle: "We cannot easily study every single member of a large population.",
    points: [
      "A complete census takes immense time, financial cost, and logistical effort.",
      "In many cases (e.g. testing product lifespans), studying everything destroys the items.",
      "The Goal: Find a scientific method to learn about the whole without testing the whole."
    ],
    takeaway: "Studying everyone is impractical. We need a reliable proxy."
  },
  {
    id: 2,
    slideNumber: "02",
    title: "What is a Population?",
    subtitle: "The complete collection of observations we wish to understand.",
    points: [
      "Denoted by capital N (in our project, N = 10,000 simulated voters).",
      "Summary values describing populations are called Parameters (e.g. true proportion P).",
      "Parameters are typically fixed but unknown in real-world scenarios."
    ],
    takeaway: "The population is the 'big picture' containing the unknown truth."
  },
  {
    id: 3,
    slideNumber: "03",
    title: "What is a Sample?",
    subtitle: "A carefully selected, representative subset of the population.",
    points: [
      "Denoted by lowercase n (in our project, n = 500 voters).",
      "Because n << N, data collection is fast, affordable, and practical.",
      "A sample is only useful if it accurately mirrors the underlying population."
    ],
    takeaway: "A small sample acts as a lens into the large population."
  },
  {
    id: 4,
    slideNumber: "04",
    title: "How Does Sampling Work?",
    subtitle: "Randomization eliminates selection bias and guarantees mathematical validity.",
    points: [
      "Simple Random Sampling (SRS): Every member has an identical probability of selection.",
      "Systematic Sampling: Pick a random starting point, then select every k-th item.",
      "Stratified Sampling: Divide population into subgroups and sample proportionally from each."
    ],
    takeaway: "Good sampling design prevents biased, misleading results."
  },
  {
    id: 5,
    slideNumber: "05",
    title: "What is a Statistic?",
    subtitle: "A numerical summary computed directly from the sample data.",
    points: [
      "Examples: sample proportion (p̂), sample mean (x̄), sample standard deviation (s).",
      "Unlike population parameters, sample statistics are fully observable.",
      "Because samples vary, different samples produce slightly different statistics."
    ],
    takeaway: "A statistic is a number calculated strictly from our sample."
  },
  {
    id: 6,
    slideNumber: "06",
    title: "What is Estimation?",
    subtitle: "Using known sample statistics to make inferences about unknown population parameters.",
    points: [
      "Point Estimation: Offering one single number (e.g. p̂ = 48.2%) as our best guess for P.",
      "It is simple and concise, but hides sampling uncertainty.",
      "We know the estimate is close, but rarely exactly equal to the parameter."
    ],
    takeaway: "Point estimation gives one best-guess number."
  },
  {
    id: 7,
    slideNumber: "07",
    title: "What is a Confidence Interval?",
    subtitle: "Quantifying uncertainty by providing a plausible range around the estimate.",
    points: [
      "Formula: Estimate ± Margin of Error (e.g. 48.2% ± 3.8% → [44.4%, 52.0%]).",
      "95% Confidence: Over many repeated samples, 95% of intervals will contain the true parameter.",
      "Increasing sample size n narrows the interval, giving greater precision."
    ],
    takeaway: "A confidence interval provides a range that communicates uncertainty."
  },
  {
    id: 8,
    slideNumber: "08",
    title: "What is a Sampling Distribution?",
    subtitle: "The probability distribution of a statistic across repeated independent samples.",
    points: [
      "If we draw 100, 500, or 1000 different samples of size n, each gives an estimate.",
      "Plotting all estimates creates a histogram: the Sampling Distribution.",
      "The center equals the true parameter, and the spread is the Standard Error (SE)."
    ],
    takeaway: "The sampling distribution reveals the long-run behavior of our estimator."
  },
  {
    id: 9,
    slideNumber: "09",
    title: "What Does the Central Limit Theorem Show?",
    subtitle: "Averages from large random samples form a normal bell curve.",
    points: [
      "Even if the original population is not bell-shaped, sample means/proportions are normal for n ≥ 30.",
      "Standard error shrinks at the rate of 1/√n as sample size increases.",
      "This theorem allows us to calculate exact probabilities and confidence intervals."
    ],
    takeaway: "CLT provides the mathematical foundation for modern inferential statistics."
  },
  {
    id: 10,
    slideNumber: "10",
    title: "Final Takeaway",
    subtitle: "Sampling and estimation allow us to make confident decisions under uncertainty.",
    points: [
      "Population (N) → Sample (n) → Statistic (p̂) → Estimate (p̂ ≈ P) → Confidence Interval.",
      "Repeated sampling proves the reliability of our single sample.",
      "Statistical inference turns uncertain sample data into rigorous scientific insight."
    ],
    takeaway: "We learned about 10,000 voters by studying only 500—with measurable precision!"
  }
];

/**
 * 30. Guided Tour Steps (60-Second Tour)
 */
export const GUIDED_TOUR_STEPS = [
  {
    targetId: "hero-intro-section",
    title: "1. The Big Picture",
    description: "Welcome! This simulator demonstrates how we can learn about 10,000 voters by examining just a small sample of 500."
  },
  {
    targetId: "population-visualizer-section",
    title: "2. Visual Population",
    description: "Here are simulated voters represented as colored dots. Watch them highlight and extract into the sample container."
  },
  {
    targetId: "sampling-method",
    title: "3. Sampling Methods",
    description: "Choose how samples are drawn: Simple Random, Systematic (every k-th item), or Stratified (demographic groups)."
  },
  {
    targetId: "sample-results-section",
    title: "4. Sample vs Population",
    description: "Compare the sample statistics against the underlying population truth to see how closely the sample mirrors reality."
  },
  {
    targetId: "estimation-section",
    title: "5. Point Estimation",
    description: "We use the observed sample statistic (p̂) as our single best-guess point estimate for the unknown population parameter (P)."
  },
  {
    targetId: "ci-section",
    title: "6. Confidence Intervals",
    description: "Because samples vary, we surround our point estimate with a 95% confidence interval to communicate uncertainty."
  },
  {
    targetId: "sampling-dist-section",
    title: "7. Sampling Distribution",
    description: "Simulate drawing 100 or 500 repeated samples. Watch how estimates pile up to form a normal distribution!"
  },
  {
    targetId: "distributions-section",
    title: "8. Distribution Lab",
    description: "Explore the theoretical curves: Normal Z, Student's t, Chi-Square goodness-of-fit, and F-distribution ANOVA."
  }
];

/**
 * 31. Interactive Quiz Questions
 */
export const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "What is the primary difference between a parameter and a statistic?",
    options: [
      { text: "A parameter describes the population; a statistic is calculated from a sample.", isCorrect: true },
      { text: "A parameter is calculated from a sample; a statistic describes the population.", isCorrect: false },
      { text: "Parameters and statistics are identical terms with no difference.", isCorrect: false },
      { text: "A parameter is always larger than a statistic.", isCorrect: false }
    ],
    explanation: "Correct! Parameters (like P or μ) describe the entire population and are usually unknown. Statistics (like p̂ or x̄) are computed from sample data."
  },
  {
    id: 2,
    question: "What happens to a confidence interval when you increase the sample size (n)?",
    options: [
      { text: "The interval becomes wider because there is more data.", isCorrect: false },
      { text: "The interval becomes narrower, providing a more precise estimate.", isCorrect: true },
      { text: "The interval width remains completely unchanged.", isCorrect: false },
      { text: "The confidence level drops to 0%.", isCorrect: false }
    ],
    explanation: "Correct! Standard error shrinks by 1/√n as sample size increases, which narrows the margin of error and creates a tighter, more precise interval."
  },
  {
    id: 3,
    question: "What does a 95% confidence interval actually mean?",
    options: [
      { text: "There is a 95% chance that the sample proportion equals exactly 48.2%.", isCorrect: false },
      { text: "95% of all voters voted for Option A.", isCorrect: false },
      { text: "Across repeated samples, approximately 95% of intervals generated will capture the true population parameter.", isCorrect: true },
      { text: "The researcher is 5% confident in the calculation.", isCorrect: false }
    ],
    explanation: "Correct! Confidence refers to the long-run success rate of the statistical procedure across repeated random sampling."
  },
  {
    id: 4,
    question: "Why does the Central Limit Theorem matter for opinion polling?",
    options: [
      { text: "It allows us to assume sample averages are normally distributed even when individual votes are categorical (Yes/No).", isCorrect: true },
      { text: "It guarantees that polls are 100% error-free.", isCorrect: false },
      { text: "It forces everyone in the population to vote the same way.", isCorrect: false },
      { text: "It eliminates the need for confidence intervals.", isCorrect: false }
    ],
    explanation: "Correct! Even with binary categorical voter choices, sample averages and proportions form a normal bell curve when n is sufficiently large (n ≥ 30)."
  }
];

/**
 * 32. Mission-Style Learning Checklist
 */
export const LEARNING_MISSIONS = [
  {
    id: 'mission1',
    title: 'Mission 1: Draw Your First Sample',
    desc: 'Click "Generate Live Sample" to draw observations and calculate your first sample statistic.',
    criteria: 'sampleDrawn'
  },
  {
    id: 'mission2',
    title: 'Mission 2: Increase Precision',
    desc: 'Increase sample size to 500 or higher and observe how standard error shrinks.',
    criteria: 'largeSample'
  },
  {
    id: 'mission3',
    title: 'Mission 3: Build a Sampling Distribution',
    desc: 'Simulate 500 repeated samples to see the histogram form a bell curve.',
    criteria: 'repeatedDone'
  },
  {
    id: 'mission4',
    title: 'Mission 4: Compare Confidence Levels',
    desc: 'Toggle between 90%, 95%, and 99% confidence levels to see the interval width expand.',
    criteria: 'confidenceToggled'
  }
];

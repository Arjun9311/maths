/**
 * Advanced Statistical Distributions
 * Implementations for Student's t-distribution, Chi-square distribution,
 * and F-distribution using Lanczos approximation for log-gamma and
 * continued fractions for incomplete gamma & beta functions.
 */

import { normalInverseCDF } from './statistics.js';

/**
 * Log-Gamma function ln(Gamma(x)) using Lanczos approximation (g=7, n=9).
 * High precision across positive real numbers.
 */
export function logGamma(x) {
  if (x <= 0) return 0;
  const p = [
    0.99999999999980993,
    676.5203681218851,
    -1259.1392167224028,
    771.32342877765313,
    -176.61502916214059,
    12.507343278686905,
    -0.13857109583659912,
    9.9843695780195716e-6,
    1.5056327351493116e-7
  ];
  const g = 7;
  if (x < 0.5) {
    // Reflection formula
    return Math.log(Math.PI / Math.sin(Math.PI * x)) - logGamma(1 - x);
  }
  x -= 1;
  let a = p[0];
  const t = x + g + 0.5;
  for (let i = 1; i < p.length; i++) {
    a += p[i] / (x + i);
  }
  return 0.5 * Math.log(2 * Math.PI) + (x + 0.5) * Math.log(t) - t + Math.log(a);
}

export function gamma(x) {
  return Math.exp(logGamma(x));
}

/**
 * Regularized lower incomplete gamma function P(a, x) = gamma(a, x) / Gamma(a)
 */
export function regularizedGammaP(a, x) {
  if (x < 0 || a <= 0) return 0;
  if (x === 0) return 0;

  // For x < a + 1 use series expansion
  if (x < a + 1) {
    let sum = 1 / a;
    let term = sum;
    for (let n = 1; n < 150; n++) {
      term *= x / (a + n);
      sum += term;
      if (Math.abs(term) < Math.abs(sum) * 1e-12) break;
    }
    return sum * Math.exp(-x + a * Math.log(x) - logGamma(a));
  }

  // Otherwise use Legendre continued fraction for upper incomplete gamma Q(a, x)
  let b = x + 1 - a;
  let c = 1 / 1e-30;
  let d = 1 / b;
  let h = d;
  for (let i = 1; i < 150; i++) {
    const an = -i * (i - a);
    b += 2;
    d = an * d + b;
    if (Math.abs(d) < 1e-30) d = 1e-30;
    c = b + an / c;
    if (Math.abs(c) < 1e-30) c = 1e-30;
    d = 1 / d;
    const del = d * c;
    h *= del;
    if (Math.abs(del - 1) < 1e-12) break;
  }
  const q = Math.exp(-x + a * Math.log(x) - logGamma(a)) * h;
  return 1 - q;
}

/**
 * Continued fraction for incomplete beta function (Numerical Recipes betacf)
 */
function betacf(a, b, x) {
  const MAXIT = 200;
  const EPS = 1e-14;
  const FPMIN = 1e-30;
  const qab = a + b;
  const qap = a + 1.0;
  const qam = a - 1.0;
  let c = 1.0;
  let d = 1.0 - (qab * x) / qap;
  if (Math.abs(d) < FPMIN) d = FPMIN;
  d = 1.0 / d;
  let h = d;

  for (let m = 1; m <= MAXIT; m++) {
    const m2 = 2 * m;
    let aa = (m * (b - m) * x) / ((qam + m2) * (a + m2));
    d = 1.0 + aa * d;
    if (Math.abs(d) < FPMIN) d = FPMIN;
    c = 1.0 + aa / c;
    if (Math.abs(c) < FPMIN) c = FPMIN;
    d = 1.0 / d;
    h *= d * c;

    aa = -((a + m) * (qab + m) * x) / ((a + m2) * (qap + m2));
    d = 1.0 + aa * d;
    if (Math.abs(d) < FPMIN) d = FPMIN;
    c = 1.0 + aa / c;
    if (Math.abs(c) < FPMIN) c = FPMIN;
    d = 1.0 / d;
    const del = d * c;
    h *= del;

    if (Math.abs(del - 1.0) <= EPS) break;
  }
  return h;
}

/**
 * Regularized incomplete beta function I_x(a, b)
 */
export function regularizedBeta(x, a, b) {
  if (x <= 0) return 0;
  if (x >= 1) return 1;

  const bt = Math.exp(
    logGamma(a + b) - logGamma(a) - logGamma(b) + a * Math.log(x) + b * Math.log(1.0 - x)
  );

  if (x < (a + 1.0) / (a + b + 2.0)) {
    return (bt * betacf(a, b, x)) / a;
  } else {
    return 1.0 - (bt * betacf(b, a, 1.0 - x)) / b;
  }
}

/* ==============================================================
   1. STUDENT'S T-DISTRIBUTION
   ============================================================== */

/**
 * Probability density function of Student's t-distribution:
 * f(t, df) = Gamma((df+1)/2) / (sqrt(pi*df) * Gamma(df/2)) * (1 + t^2/df)^(-(df+1)/2)
 */
export function tPDF(t, df) {
  if (df <= 0) return 0;
  const logNumerator = logGamma((df + 1) / 2);
  const logDenominator = 0.5 * Math.log(Math.PI * df) + logGamma(df / 2);
  const power = -(df + 1) / 2;
  return Math.exp(logNumerator - logDenominator) * Math.pow(1 + (t * t) / df, power);
}

/**
 * Cumulative distribution function of Student's t-distribution
 */
export function tCDF(t, df) {
  if (df <= 0) return 0;
  if (t === 0) return 0.5;
  const x = df / (df + t * t);
  const ib = regularizedBeta(x, df / 2, 0.5);
  if (t > 0) {
    return 1 - 0.5 * ib;
  } else {
    return 0.5 * ib;
  }
}

/**
 * Calculates two-tailed critical t-value for given confidence level and degrees of freedom.
 * E.g. confidenceLevel = 0.95, df = 10 -> returns ~2.228.
 * Uses Hill's Cornish-Fisher approximation with binary search refinement.
 */
export function getCriticalT(confidenceLevel = 0.95, df = 30) {
  if (df >= 500) {
    return normalInverseCDF(1 - (1 - confidenceLevel) / 2);
  }
  const alpha = 1 - confidenceLevel;
  const pTarget = 1 - alpha / 2;

  // Initial estimate using Cornish-Fisher expansion for t
  const z = normalInverseCDF(pTarget);
  let tEst = z + (z * z * z + z) / (4 * df) +
             (5 * Math.pow(z, 5) + 16 * Math.pow(z, 3) + 3 * z) / (96 * df * df);

  // Binary search refinement for exactness
  let low = Math.max(0, tEst - 0.5);
  let high = tEst + 0.5;
  for (let iter = 0; iter < 40; iter++) {
    const mid = (low + high) / 2;
    const cdfVal = tCDF(mid, df);
    if (Math.abs(cdfVal - pTarget) < 1e-7) return mid;
    if (cdfVal < pTarget) {
      low = mid;
    } else {
      high = mid;
    }
  }
  return (low + high) / 2;
}

/* ==============================================================
   2. CHI-SQUARE DISTRIBUTION
   ============================================================== */

/**
 * Probability density function of Chi-Square distribution:
 * f(x, k) = 1 / (2^(k/2) * Gamma(k/2)) * x^(k/2 - 1) * exp(-x/2) for x > 0
 */
export function chiSquarePDF(x, df) {
  if (x <= 0 || df <= 0) return 0;
  const kHalf = df / 2;
  const logCoeff = -kHalf * Math.log(2) - logGamma(kHalf);
  const logVal = (kHalf - 1) * Math.log(x) - x / 2;
  return Math.exp(logCoeff + logVal);
}

/**
 * Cumulative distribution function of Chi-Square distribution
 */
export function chiSquareCDF(x, df) {
  if (x <= 0 || df <= 0) return 0;
  return regularizedGammaP(df / 2, x / 2);
}

/**
 * p-value for Chi-Square test (right-tailed area: P(X >= chiSquare))
 */
export function chiSquarePValue(stat, df) {
  if (stat <= 0 || df <= 0) return 1.0;
  return Math.max(0, Math.min(1, 1 - chiSquareCDF(stat, df)));
}

/**
 * Critical value for Chi-Square distribution at alpha (e.g. 0.05 right tail)
 */
export function getCriticalChiSquare(alpha = 0.05, df = 2) {
  const pTarget = 1 - alpha;
  // Wilson-Hilferty transformation approximation
  const z = normalInverseCDF(pTarget);
  let low = 0;
  let high = Math.max(20, df + 4 * Math.sqrt(2 * df) + 10);
  for (let iter = 0; iter < 50; iter++) {
    const mid = (low + high) / 2;
    const val = chiSquareCDF(mid, df);
    if (Math.abs(val - pTarget) < 1e-6) return mid;
    if (val < pTarget) {
      low = mid;
    } else {
      high = mid;
    }
  }
  return (low + high) / 2;
}

/* ==============================================================
   3. F-DISTRIBUTION
   ============================================================== */

/**
 * Probability density function of F-Distribution:
 * f(x, d1, d2) = 1 / B(d1/2, d2/2) * (d1/d2)^(d1/2) * x^(d1/2 - 1) * (1 + d1/d2 * x)^(-(d1+d2)/2)
 */
export function fPDF(x, d1, d2) {
  if (x <= 0 || d1 <= 0 || d2 <= 0) return 0;
  const a = d1 / 2;
  const b = d2 / 2;
  const logBeta = logGamma(a) + logGamma(b) - logGamma(a + b);
  const logNumerator = a * Math.log(d1 / d2) + (a - 1) * Math.log(x);
  const logDenominator = logBeta + (a + b) * Math.log(1 + (d1 / d2) * x);
  return Math.exp(logNumerator - logDenominator);
}

/**
 * Cumulative distribution function of F-Distribution
 */
export function fCDF(x, d1, d2) {
  if (x <= 0 || d1 <= 0 || d2 <= 0) return 0;
  const y = (d1 * x) / (d1 * x + d2);
  return regularizedBeta(y, d1 / 2, d2 / 2);
}

/**
 * p-value for F-test (right-tailed area: P(X >= F))
 */
export function fPValue(stat, d1, d2) {
  if (stat <= 0 || d1 <= 0 || d2 <= 0) return 1.0;
  return Math.max(0, Math.min(1, 1 - fCDF(stat, d1, d2)));
}

/**
 * Critical value for F-Distribution at alpha (e.g. 0.05 right tail)
 */
export function getCriticalF(alpha = 0.05, d1 = 2, d2 = 30) {
  const pTarget = 1 - alpha;
  let low = 0;
  let high = 50;
  for (let iter = 0; iter < 50; iter++) {
    const mid = (low + high) / 2;
    const val = fCDF(mid, d1, d2);
    if (Math.abs(val - pTarget) < 1e-6) return mid;
    if (val < pTarget) {
      low = mid;
    } else {
      high = mid;
    }
  }
  return (low + high) / 2;
}

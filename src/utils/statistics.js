/**
 * Core Statistical Utilities
 * High-precision algorithms for means, variances, standard errors,
 * normal distribution PDF/CDF, and inverse normal (probit).
 */

/**
 * Calculates the arithmetic mean of an array of numbers.
 */
export function calculateMean(values) {
  if (!values || values.length === 0) return 0;
  const sum = values.reduce((acc, val) => acc + val, 0);
  return sum / values.length;
}

/**
 * Calculates sample variance (unbiased with n - 1 denominator).
 */
export function calculateSampleVariance(values) {
  if (!values || values.length < 2) return 0;
  const mean = calculateMean(values);
  const sumSqDiff = values.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0);
  return sumSqDiff / (values.length - 1);
}

/**
 * Calculates sample standard deviation.
 */
export function calculateSampleStdDev(values) {
  return Math.sqrt(calculateSampleVariance(values));
}

/**
 * Calculates population variance (denominator N).
 */
export function calculatePopulationVariance(values) {
  if (!values || values.length === 0) return 0;
  const mean = calculateMean(values);
  const sumSqDiff = values.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0);
  return sumSqDiff / values.length;
}

/**
 * Calculates population standard deviation.
 */
export function calculatePopulationStdDev(values) {
  return Math.sqrt(calculatePopulationVariance(values));
}

/**
 * Finite Population Correction (FPC) factor.
 * Applied when sampling without replacement from a finite population N.
 * FPC = sqrt((N - n) / (N - 1))
 */
export function getFPC(populationSize, sampleSize) {
  if (!populationSize || populationSize <= 1 || sampleSize >= populationSize) return 0;
  return Math.sqrt((populationSize - sampleSize) / (populationSize - 1));
}

/**
 * Standard error of a sample proportion.
 * SE = sqrt( p * (1 - p) / n ) * FPC
 */
export function calculateProportionSE(p, sampleSize, populationSize = null) {
  if (sampleSize <= 0) return 0;
  let se = Math.sqrt((p * (1 - p)) / sampleSize);
  if (populationSize && populationSize > sampleSize) {
    se *= getFPC(populationSize, sampleSize);
  }
  return se;
}

/**
 * Standard error of a sample mean.
 * SE = s / sqrt(n) * FPC
 */
export function calculateMeanSE(stdDev, sampleSize, populationSize = null) {
  if (sampleSize <= 0) return 0;
  let se = stdDev / Math.sqrt(sampleSize);
  if (populationSize && populationSize > sampleSize) {
    se *= getFPC(populationSize, sampleSize);
  }
  return se;
}

/**
 * Standard Normal Probability Density Function (PDF): phi(z)
 */
export function normalPDF(z, mean = 0, stdDev = 1) {
  const diff = (z - mean) / stdDev;
  return (1 / (stdDev * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * diff * diff);
}

/**
 * Error function erf(x) approximation (Abramowitz & Stegun formula 7.1.26, max error < 1.5e-7).
 */
export function erf(x) {
  const sign = x < 0 ? -1 : 1;
  const absX = Math.abs(x);

  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;

  const t = 1.0 / (1.0 + p * absX);
  const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-absX * absX);

  return sign * y;
}

/**
 * Standard Normal Cumulative Distribution Function (CDF): Phi(z)
 */
export function normalCDF(z, mean = 0, stdDev = 1) {
  const x = (z - mean) / (stdDev * Math.SQRT2);
  return 0.5 * (1 + erf(x));
}

/**
 * High-precision Inverse Normal CDF (Probit function).
 * Implementation of Peter J. Acklam's algorithm.
 * Relative error < 1.15e-9.
 */
export function normalInverseCDF(p) {
  if (p <= 0 || p >= 1) {
    if (p === 0) return -Infinity;
    if (p === 1) return Infinity;
    return NaN;
  }

  // Coefficients in rational approximations
  const a = [
    -3.969683028665376e+01,
     2.209460984245205e+02,
    -2.759285104469687e+02,
     1.383577518672690e+02,
    -3.066479806614716e+01,
     2.506628277459239e+00
  ];

  const b = [
    -5.447609879822406e+01,
     1.615858368580409e+02,
    -1.556989798598866e+02,
     6.680131188771972e+01,
    -1.328068155288572e+01
  ];

  const c = [
    -7.784894002430293e-03,
    -3.223964580411365e-01,
    -2.400758277161838e+00,
    -2.549732539343734e+00,
     4.374664141464968e+00,
     2.938163982698783e+00
  ];

  const d = [
     7.784695709041462e-03,
     3.224671290700398e-01,
     2.445134137142996e+00,
     3.754408661907416e+00
  ];

  const p_low = 0.02425;
  const p_high = 1 - p_low;

  let q, r;

  // Rational approximation for lower region
  if (p < p_low) {
    q = Math.sqrt(-2 * Math.log(p));
    return (((((c[0]*q + c[1])*q + c[2])*q + c[3])*q + c[4])*q + c[5]) /
           ((((d[0]*q + d[1])*q + d[2])*q + d[3])*q + 1);
  }

  // Rational approximation for central region
  if (p <= p_high) {
    q = p - 0.5;
    r = q * q;
    return (((((a[0]*r + a[1])*r + a[2])*r + a[3])*r + a[4])*r + a[5])*q /
           (((((b[0]*r + b[1])*r + b[2])*r + b[3])*r + b[4])*r + 1);
  }

  // Rational approximation for upper region
  q = Math.sqrt(-2 * Math.log(1 - p));
  return -(((((c[0]*q + c[1])*q + c[2])*q + c[3])*q + c[4])*q + c[5]) /
          ((((d[0]*q + d[1])*q + d[2])*q + d[3])*q + 1);
}

/**
 * Get critical Z-value for confidence level (e.g. 0.95 -> 1.95996)
 */
export function getCriticalZ(confidenceLevel = 0.95) {
  const alpha = 1 - confidenceLevel;
  return normalInverseCDF(1 - alpha / 2);
}

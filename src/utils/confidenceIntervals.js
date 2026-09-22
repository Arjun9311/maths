/**
 * Confidence Intervals Utilities
 * Proportion Confidence Intervals (Wald and Wilson Score)
 * Mean Confidence Intervals (Student's t-distribution)
 */

import { getCriticalZ, calculateProportionSE, calculateMeanSE } from './statistics.js';
import { getCriticalT } from './distributions.js';

/**
 * Calculates Wald Confidence Interval for a proportion:
 * CI = p +/- z * SE
 * where SE = sqrt(p*(1-p)/n) * FPC
 */
export function calculateWaldProportionCI(p, sampleSize, populationSize = null, confidenceLevel = 0.95) {
  if (sampleSize <= 0) {
    return { lower: 0, upper: 0, marginOfError: 0, p, standardError: 0 };
  }

  const z = getCriticalZ(confidenceLevel);
  const se = calculateProportionSE(p, sampleSize, populationSize);
  const moe = z * se;

  const lower = Math.max(0, p - moe);
  const upper = Math.min(1, p + moe);

  return {
    pointEstimate: p,
    standardError: se,
    marginOfError: moe,
    lower,
    upper,
    confidenceLevel,
    criticalValue: z,
    formula: `p ± z * sqrt(p(1-p)/n)`
  };
}

/**
 * Calculates Wilson Score Interval for a proportion.
 * Recommended when sample size is small or p is close to 0 or 1.
 */
export function calculateWilsonProportionCI(p, sampleSize, confidenceLevel = 0.95) {
  if (sampleSize <= 0) {
    return { lower: 0, upper: 0, marginOfError: 0, p };
  }

  const z = getCriticalZ(confidenceLevel);
  const z2 = z * z;
  const denom = 1 + z2 / sampleSize;
  const center = (p + z2 / (2 * sampleSize)) / denom;
  const term = (z / denom) * Math.sqrt((p * (1 - p)) / sampleSize + z2 / (4 * sampleSize * sampleSize));

  const lower = Math.max(0, center - term);
  const upper = Math.min(1, center + term);

  return {
    pointEstimate: p,
    center,
    lower,
    upper,
    marginOfError: (upper - lower) / 2,
    confidenceLevel,
    criticalValue: z
  };
}

/**
 * Calculates Student's t Confidence Interval for a sample mean.
 * CI = xBar +/- t_crit * (s / sqrt(n)) * FPC
 */
export function calculateMeanCI(sampleMean, sampleStdDev, sampleSize, populationSize = null, confidenceLevel = 0.95) {
  if (sampleSize <= 1) {
    return { lower: sampleMean, upper: sampleMean, marginOfError: 0, standardError: 0 };
  }

  const df = sampleSize - 1;
  const tCrit = getCriticalT(confidenceLevel, df);
  const se = calculateMeanSE(sampleStdDev, sampleSize, populationSize);
  const moe = tCrit * se;

  return {
    pointEstimate: sampleMean,
    degreesOfFreedom: df,
    criticalValue: tCrit,
    standardError: se,
    marginOfError: moe,
    lower: sampleMean - moe,
    upper: sampleMean + moe,
    confidenceLevel
  };
}

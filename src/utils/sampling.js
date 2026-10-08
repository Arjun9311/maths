/**
 * Sampling Simulation Utilities
 * Generates synthetic voter populations and implements:
 * 1. Simple Random Sampling (SRS)
 * 2. Systematic Sampling
 * 3. Stratified Sampling
 * 4. Sampling Distribution Batch Simulations
 */

import { calculateMean, calculateSampleStdDev } from './statistics.js';

/**
 * Generates a synthetic voter population with Option A, B, C preferences
 * and synthetic numerical age demographic (18 to 80).
 */
export function generatePopulation(size = 10000, pctA = 48, pctB = 32, pctC = 20) {
  // Ensure valid size
  const N = Math.max(10, Math.floor(size));

  // Determine exact counts
  const countA = Math.round((pctA / 100) * N);
  const countB = Math.round((pctB / 100) * N);
  const countC = Math.max(0, N - countA - countB);

  const population = [];

  // Helper to generate realistic voter age (mean ~44, SD ~14, clipped [18, 82])
  // Using Box-Muller transform
  function randomAge(mean = 44, sd = 14) {
    const u1 = Math.random();
    const u2 = Math.random();
    const z = Math.sqrt(-2.0 * Math.log(u1 || 0.0001)) * Math.cos(2.0 * Math.PI * u2);
    const age = Math.round(mean + z * sd);
    return Math.max(18, Math.min(82, age));
  }

  let idCounter = 1;

  for (let i = 0; i < countA; i++) {
    population.push({
      id: idCounter++,
      choice: 'Option A',
      age: randomAge(45, 13) // Slight demographic variation for ANOVA demonstration
    });
  }

  for (let i = 0; i < countB; i++) {
    population.push({
      id: idCounter++,
      choice: 'Option B',
      age: randomAge(43, 14)
    });
  }

  for (let i = 0; i < countC; i++) {
    population.push({
      id: idCounter++,
      choice: 'Option C',
      age: randomAge(41, 15)
    });
  }

  // Shuffle population so ordered list has mixed sequence
  for (let i = population.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [population[i], population[j]] = [population[j], population[i]];
  }

  return population;
}

/**
 * 1. Simple Random Sampling (SRS)
 * Every member of the population has an equal probability of selection without replacement.
 */
export function sampleSimpleRandom(population, n) {
  const N = population.length;
  const sampleSize = Math.min(n, N);

  // Fisher-Yates partial shuffle of indices
  const indices = new Array(N);
  for (let i = 0; i < N; i++) indices[i] = i;

  const sample = [];
  for (let i = 0; i < sampleSize; i++) {
    const randomIndex = i + Math.floor(Math.random() * (N - i));
    const selectedIdx = indices[randomIndex];
    indices[randomIndex] = indices[i];
    indices[i] = selectedIdx;
    sample.push(population[selectedIdx]);
  }

  return sample;
}

/**
 * 2. Systematic Sampling
 * Selects members at regular interval k = floor(N / n) from an ordered population
 * with random starting index r in [0, k-1].
 */
export function sampleSystematic(population, n) {
  const N = population.length;
  const sampleSize = Math.min(n, N);
  if (sampleSize <= 0) return [];

  const k = Math.max(1, Math.floor(N / sampleSize));
  const randomStart = Math.floor(Math.random() * k);

  const sample = [];
  for (let i = 0; i < sampleSize; i++) {
    const idx = (randomStart + i * k) % N;
    sample.push(population[idx]);
  }

  return sample;
}

/**
 * 3. Stratified Sampling
 * Divides the population into strata (by Option preference)
 * and takes proportional random samples from each stratum.
 */
export function sampleStratified(population, n) {
  const N = population.length;
  const sampleSize = Math.min(n, N);
  if (sampleSize <= 0) return [];

  // Group by stratum
  const strata = {
    'Option A': [],
    'Option B': [],
    'Option C': []
  };

  for (let i = 0; i < N; i++) {
    const voter = population[i];
    if (strata[voter.choice]) {
      strata[voter.choice].push(voter);
    }
  }

  const sample = [];
  const stratumKeys = Object.keys(strata);
  let totalAllocated = 0;

  stratumKeys.forEach((key, index) => {
    const stratumCount = strata[key].length;
    let stratumSampleSize;
    if (index === stratumKeys.length - 1) {
      stratumSampleSize = sampleSize - totalAllocated;
    } else {
      stratumSampleSize = Math.round(sampleSize * (stratumCount / N));
    }
    stratumSampleSize = Math.max(0, Math.min(stratumCount, stratumSampleSize));
    totalAllocated += stratumSampleSize;

    const subSample = sampleSimpleRandom(strata[key], stratumSampleSize);
    sample.push(...subSample);
  });

  return sample;
}

/**
 * Executes a chosen sampling method on the population.
 */
export function drawSample(population, n, method = 'srs') {
  switch (method) {
    case 'systematic':
      return sampleSystematic(population, n);
    case 'stratified':
      return sampleStratified(population, n);
    case 'srs':
    default:
      return sampleSimpleRandom(population, n);
  }
}

/**
 * Summarizes sample counts, proportions, and percentages for each choice.
 */
export function summarizeSample(sample, populationSize = null) {
  const counts = { 'Option A': 0, 'Option B': 0, 'Option C': 0 };
  const agesByChoice = { 'Option A': [], 'Option B': [], 'Option C': [] };
  const allAges = [];

  sample.forEach(voter => {
    if (counts[voter.choice] !== undefined) {
      counts[voter.choice]++;
      agesByChoice[voter.choice].push(voter.age);
    }
    allAges.push(voter.age);
  });

  const n = sample.length;

  const results = {
    sampleSize: n,
    counts,
    proportions: {
      'Option A': n > 0 ? counts['Option A'] / n : 0,
      'Option B': n > 0 ? counts['Option B'] / n : 0,
      'Option C': n > 0 ? counts['Option C'] / n : 0
    },
    percentages: {
      'Option A': n > 0 ? ((counts['Option A'] / n) * 100).toFixed(1) : '0.0',
      'Option B': n > 0 ? ((counts['Option B'] / n) * 100).toFixed(1) : '0.0',
      'Option C': n > 0 ? ((counts['Option C'] / n) * 100).toFixed(1) : '0.0'
    },
    estimatedPopulationCounts: {
      'Option A': populationSize && n > 0 ? Math.round((counts['Option A'] / n) * populationSize) : 0,
      'Option B': populationSize && n > 0 ? Math.round((counts['Option B'] / n) * populationSize) : 0,
      'Option C': populationSize && n > 0 ? Math.round((counts['Option C'] / n) * populationSize) : 0
    },
    // Numeric age statistics
    ageMean: calculateMean(allAges),
    ageStdDev: calculateSampleStdDev(allAges),
    agesByChoice,
    allAges
  };

  return results;
}

/**
 * Generates a sampling distribution by repeatedly drawing samples of size n.
 * Returns distribution statistics and histogram bins suitable for Recharts.
 */
export function simulateSamplingDistribution(population, sampleSize, numSamples = 100, targetOption = 'Option A') {
  const proportions = [];

  for (let s = 0; s < numSamples; s++) {
    const sample = sampleSimpleRandom(population, sampleSize);
    const count = sample.filter(v => v.choice === targetOption).length;
    proportions.push(count / sampleSize);
  }

  const meanProportion = calculateMean(proportions);
  const empiricalSE = calculateSampleStdDev(proportions);

  const truePopCount = population.filter(v => v.choice === targetOption).length;
  const N = population.length || 1;
  const trueProportion = truePopCount / N;
  const fpc = (N > sampleSize && N > 1) ? Math.sqrt((N - sampleSize) / (N - 1)) : 1;
  const theoreticalSE = Math.sqrt((trueProportion * (1 - trueProportion)) / sampleSize) * fpc;

  // Group into histogram bins
  const minVal = Math.min(...proportions);
  const maxVal = Math.max(...proportions);
  const binCount = 18;
  const range = Math.max(0.04, maxVal - minVal);
  const binWidth = range / binCount;
  const startBin = Math.max(0, minVal - binWidth * 0.5);

  const bins = [];
  for (let i = 0; i < binCount; i++) {
    const low = startBin + i * binWidth;
    const high = low + binWidth;
    const center = (low + high) / 2;
    const label = `${(center * 100).toFixed(1)}%`;
    bins.push({
      binIndex: i,
      rangeLabel: label,
      range: label,
      center: center,
      low: low,
      high: high,
      frequency: 0,
      count: 0
    });
  }

  proportions.forEach(p => {
    let assigned = false;
    for (let i = 0; i < bins.length; i++) {
      if (p >= bins[i].low && (p < bins[i].high || i === bins.length - 1)) {
        bins[i].frequency++;
        bins[i].count++;
        assigned = true;
        break;
      }
    }
    if (!assigned && bins.length > 0) {
      if (p < bins[0].low) {
        bins[0].frequency++;
        bins[0].count++;
      } else {
        bins[bins.length - 1].frequency++;
        bins[bins.length - 1].count++;
      }
    }
  });

  return {
    numSamples,
    sampleSize,
    proportions,
    sampleProportions: proportions,
    meanProportion,
    empiricalMean: meanProportion,
    empiricalSE,
    theoreticalSE,
    trueProportion,
    histogramData: bins,
    bins: bins
  };
}

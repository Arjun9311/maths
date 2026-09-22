import { calculateMean, calculateSampleStdDev, normalInverseCDF, normalCDF, getCriticalZ } from './src/utils/statistics.js';
import { getCriticalT, chiSquareCDF, chiSquarePValue, getCriticalChiSquare, fCDF, fPValue, getCriticalF, tCDF } from './src/utils/distributions.js';
import { calculateWaldProportionCI, calculateWilsonProportionCI, calculateMeanCI } from './src/utils/confidenceIntervals.js';
import { generatePopulation, sampleSimpleRandom, sampleSystematic, sampleStratified, summarizeSample, simulateSamplingDistribution } from './src/utils/sampling.js';

console.log('--- Testing Statistical Engine ---');

// 1. Normal inverse CDF
const z95 = getCriticalZ(0.95);
console.log('Critical Z for 95% CI:', z95.toFixed(5), '(Expected: ~1.95996)');
if (Math.abs(z95 - 1.95996) > 0.001) throw new Error('Z-critical calculation error');

// 2. Student t critical value
const t10 = getCriticalT(0.95, 10);
console.log('Critical t for df=10 (95%):', t10.toFixed(4), '(Expected: ~2.2281)');
if (Math.abs(t10 - 2.2281) > 0.01) throw new Error('t-critical calculation error');

// 3. Chi-square critical value & p-value
const chi2_crit = getCriticalChiSquare(0.05, 2);
console.log('Chi-square critical for df=2 (alpha=0.05):', chi2_crit.toFixed(4), '(Expected: ~5.9915)');
if (Math.abs(chi2_crit - 5.9915) > 0.05) throw new Error('Chi-square critical calculation error');

// 4. F critical value
const f_crit = getCriticalF(0.05, 2, 30);
console.log('F critical for df1=2, df2=30 (alpha=0.05):', f_crit.toFixed(4), '(Expected: ~3.3158)');
if (Math.abs(f_crit - 3.3158) > 0.05) throw new Error('F critical calculation error');

// 5. Population generation & sampling
const pop = generatePopulation(10000, 48, 32, 20);
console.log('Population size:', pop.length);
const sample = sampleSimpleRandom(pop, 500);
console.log('Sample size:', sample.length);
const summary = summarizeSample(sample, 10000);
console.log('Sample counts:', summary.counts);
console.log('Sample percentages:', summary.percentages);

// 6. Confidence Interval
const ci = calculateWaldProportionCI(summary.proportions['Option A'], 500, 10000, 0.95);
console.log('Option A 95% Wald CI:', (ci.lower * 100).toFixed(2) + '% to ' + (ci.upper * 100).toFixed(2) + '%');

// 7. Sampling Distribution
const dist = simulateSamplingDistribution(pop, 100, 50, 'Option A');
console.log('Sampling distribution generated:', dist.proportions.length, 'samples. Mean p:', dist.meanProportion.toFixed(4));

console.log('All statistical assertions PASSED successfully!');

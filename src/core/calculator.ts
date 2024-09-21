import { inverseNormalCDF } from "../lib/inverseCDF";
export const pooledStandardDeviation = (
  sd1: number,
  sd2: number,
  n1: number,
  n2: number
): number => {
  return Math.sqrt(((n1 - 1) * sd1 ** 2 + (n2 - 1) * sd2 ** 2) / (n1 + n2 - 2));
};
export const calculateEffectSize = (
  mean1: number,
  mean2: number,
  sd1: number,
  sd2: number,
  n1: number,
  n2: number
): number => {
  const pooledSD = pooledStandardDeviation(sd1, sd2, n1, n2);
  console.log("ADDITIONAL DATA:");
  console.log("Mean Control: ", mean1);
  console.log("Mean Treatment: ", mean2);
  console.log("Pooled SD: ", pooledSD);
  console.log("Effect Size: ", (mean1 - mean2) / pooledSD);
  return (mean1 - mean2) / pooledSD;
};
export const calculatePowerEffect = (
  effectSize: number,
  alpha: number,
  sampleSize: number
): number => {
  const zAlpha = inverseNormalCDF(1 - alpha / 2);

  const zPower = effectSize * Math.sqrt(sampleSize) - zAlpha;
  const power = Math.min(
    1,
    Math.max(0, 1 - Math.exp(-Math.pow(zPower, 2) / 2))
  );
  return power;
};
export const calculateSampleSize = (
  effectSize: number,
  alpha = 0.05,
  power = 0.8
): number => {
  const zAlpha = inverseNormalCDF(1 - alpha / 2);
  const zBeta = inverseNormalCDF(power);

  const sampleSize = Math.ceil((zAlpha + zBeta) ** 2 / effectSize ** 2);
  return sampleSize;
};

export const calculateMean = (data: number[]): number => {
  return data.reduce((a, b) => a + b, 0) / data.length;
};

export const calculateStandardDeviation = (data: number[]): number => {
  const mean = calculateMean(data);
  const variance =
    data.reduce((a, b) => a + (b - mean) ** 2, 0) / (data.length - 1);
  return Math.sqrt(variance);
};
export const calculatePower = () => {
  const controlGroupInput = (
    document.getElementById("controlGroup") as HTMLInputElement
  ).value;
  const treatmentGroupInput = (
    document.getElementById("treatmentGroup") as HTMLInputElement
  ).value;
  const alphaInput = (document.getElementById("alpha") as HTMLInputElement)
    .value;
  const desiredPowerInput = (
    document.getElementById("desiredPower") as HTMLInputElement
  ).value;
  const sampleSizeInput = (
    document.getElementById("sampleSize") as HTMLInputElement
  ).value;

  const controlGroup = controlGroupInput.split(",").map(Number);
  const treatmentGroup = treatmentGroupInput.split(",").map(Number);

  if (controlGroup.some(isNaN) || treatmentGroup.some(isNaN)) {
    alert("Please ensure all data is numeric and separated by commas.");
    return;
  }

  const meanControl = calculateMean(controlGroup);
  const meanTreatment = calculateMean(treatmentGroup);
  const stdControl = calculateStandardDeviation(controlGroup);
  const stdTreatment = calculateStandardDeviation(treatmentGroup);

  const n1 = controlGroup.length;
  const n2 = treatmentGroup.length;

  const alpha = parseFloat(alphaInput);
  const desiredPower = parseFloat(desiredPowerInput);

  const effectSize = calculateEffectSize(
    meanControl,
    meanTreatment,
    stdControl,
    stdTreatment,
    n1,
    n2
  );

  let results = `<p>Effect size (Cohen's d): ${effectSize.toFixed(2)}</p>`;

    const sampleSize = parseInt(sampleSizeInput, 10);
    const power = calculatePowerEffect(effectSize, alpha, sampleSize);
    results += `<p>Power of the test with ${sampleSize} samples: ${power.toFixed(
      4
    )}</p>`;
    {
    const sampleSizeNeeded = calculateSampleSize(
      effectSize,
      alpha,
      desiredPower
    );
    results += `<p>Sample size needed for ${
      desiredPower * 100
    }% power: ${sampleSizeNeeded}</p>`;
  }
  document.getElementById("results")!.innerHTML = results;

};

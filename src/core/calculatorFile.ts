import { calculateMean, calculateStandardDeviation, calculateEffectSize, calculatePowerEffect, calculateSampleSize } from "./calculator";
export const runAnalysis = (data: any[]) => {
    const dependentVariable = (document.getElementById('dependentVariable') as HTMLSelectElement).value;
    const groupVariable = (document.getElementById('groupVariable') as HTMLSelectElement).value;

    const controlGroup = data
        .filter((row: any) => row[groupVariable] === 'Control')
        .map((row: any) => parseFloat(row[dependentVariable]));
    
    const treatmentGroup = data
        .filter((row: any) => row[groupVariable] === 'Treatment')
        .map((row: any) => parseFloat(row[dependentVariable]));

    if (controlGroup.some(isNaN) || treatmentGroup.some(isNaN)) {
        alert("Error: Non-numeric values detected in the selected dependent variable.");
        return;
    }

    calculateEffectSizeAndPower(controlGroup, treatmentGroup);
    
}

export const calculateEffectSizeAndPower = (controlGroup: number[], treatmentGroup: number[]) => {
    const meanControl = calculateMean(controlGroup);
    const meanTreatment = calculateMean(treatmentGroup);
    const stdControl = calculateStandardDeviation(controlGroup);
    const stdTreatment = calculateStandardDeviation(treatmentGroup);

    const n1 = controlGroup.length;
    const n2 = treatmentGroup.length;

    const effectSize = calculateEffectSize(meanControl, meanTreatment, stdControl, stdTreatment, n1, n2);
    const alpha = parseFloat((document.getElementById('alpha') as HTMLInputElement).value);
    const sampleSizeInput = (document.getElementById('sampleSize') as HTMLInputElement).value;
    const desiredPower = parseFloat((document.getElementById('desiredPower') as HTMLInputElement).value);

    let results = `<p>Effect size (Cohen's d): ${effectSize.toFixed(2)}</p>`;

    if (sampleSizeInput) {
        const sampleSize = parseInt(sampleSizeInput, 10);
        const power = calculatePowerEffect(effectSize, alpha, sampleSize);
        results += `<p>Power of the test with ${sampleSize} samples: ${power.toFixed(4)}</p>`;
    }

    const sampleSizeNeeded = calculateSampleSize(effectSize, alpha, desiredPower);
    results += `<p>Sample size needed for ${desiredPower * 100}% power: ${sampleSizeNeeded}</p>`;

    document.getElementById('results')!.innerHTML = results;
}
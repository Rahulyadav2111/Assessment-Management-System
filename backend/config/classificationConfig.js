module.exports = {
  'vitalsMap.vitals.heart_rate': [
    { range: [0, 60], label: 'Low' },
    { range: [60, 100], label: 'Normal' },
    { range: [100, Infinity], label: 'High' },
  ],
  'vitalsMap.vitals.bp_sys': [
    { range: [0, 120], label: 'Normal' },
    { range: [120, 129], label: 'Elevated' },
    { range: [129, Infinity], label: 'High' },
  ],
  'vitalsMap.vitals.bp_dia': [
    { range: [0, 80], label: 'Normal' },
    { range: [80, 89], label: 'Elevated' },
    { range: [89, Infinity], label: 'High' },
  ],
  'bodyCompositionData.BMI': [
    { range: [0, 18.5], label: 'Underweight' },
    { range: [18.5, 24.9], label: 'Normal' },
    { range: [24.9, 29.9], label: 'Overweight' },
    { range: [29.9, Infinity], label: 'Obese' },
  ],
};
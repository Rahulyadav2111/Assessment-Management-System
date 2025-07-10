module.exports = {
 'as_hr_02': {
    sections: [
      {
        title: 'Key Body Vitals',
        fields: [
          { name: 'Heart Rate', path: 'vitalsMap.vitals.heart_rate', unit: 'bpm' },
          { name: 'Blood Pressure Systolic', path: 'vitalsMap.vitals.bp_sys', unit: 'mmHg' },
          { name: 'Blood Pressure Diastolic', path: 'vitalsMap.vitals.bp_dia', unit: 'mmHg' },
        ],
      },
      {
        title: 'Heart Health',
        fields: [
          { name: 'VO2 Max', path: 'vitalsMap.metadata.physiological_scores.vo2max', unit: '' },
        ],
      },
      {
        title: 'Stress Level',
        fields: [
          { name: 'Stress Index', path: 'vitalsMap.metadata.heart_scores.stress_index', unit: '' },
        ],
      },
      {
        title: 'Fitness Levels',
        fields: [
          { name: 'Cardiovascular Endurance', path: 'exercises.find(ex => ex.id === 235).setList[0].time', unit: 'seconds' },
        ],
      },
      {
        title: 'Posture',
        fields: [
          { name: 'Posture Status', path: 'vitalsMap.posture', unit: '' },
        ],
      },
      {
        title: 'Body Composition',
        fields: [
          { name: 'BMI', path: 'bodyCompositionData.BMI', unit: '' },
          { name: 'Body Fat', path: 'vitalsMap.metadata.physiological_scores.bodyfat', unit: '%' },
        ],
      },
    ],
  },

  'as_card_01': {
    sections: [
      {
        title: 'Key Body Vitals',
        fields: [
          { name: 'Heart Rate', path: 'vitalsMap.vitals.heart_rate', unit: 'bpm' },
          { name: 'Blood Pressure Systolic', path: 'vitalsMap.vitals.bp_sys', unit: 'mmHg' },
          { name: 'Blood Pressure Diastolic', path: 'vitalsMap.vitals.bp_dia', unit: 'mmHg' },
        ],
      },
      {
        title: 'Cardiovascular Endurance',
        fields: [
          { name: 'Jog Test Time', path: 'exercises.find(ex => ex.id === 235).setList[0].time', unit: 'seconds' },
        ],
      },
      {
        title: 'Body Composition',
        fields: [
          { name: 'BMI', path: 'bodyCompositionData.BMI', unit: '' },
        ],
      },
    ],
  },
};
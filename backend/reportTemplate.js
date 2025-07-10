function generateReportTemplate(data, config, classificationConfig) {
  let html = `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          h1 { text-align: center; }
          h2 { color: #333; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
          th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; }
        </style>
      </head>
      <body>
        <h1>Assessment Report</h1>
        <p>Session ID: ${data.session_id}</p>
        <p>Assessment Type: ${data.assessment_id}</p>
  `;

  config.sections.forEach(section => {
    html += `<h2>${section.title}</h2>`;
    html += `<table>`;
    html += `<tr><th>Field</th><th>Value</th><th>Unit</th><th>Classification</th></tr>`;

    section.fields.forEach(field => {
      let value = getValueByPath(data, field.path);
      if (value === undefined) value = 'N/A';

      let classification = 'N/A';
      if (classificationConfig[field.path]) {
        const ranges = classificationConfig[field.path];
        const numValue = parseFloat(value);
        if (!isNaN(numValue)) {
          const range = ranges.find(r => numValue >= r.range[0] && numValue < r.range[1]);
          if (range) classification = range.label;
        }
      }

      html += `
        <tr>
          <td>${field.name}</td>
          <td>${value}</td>
          <td>${field.unit}</td>
          <td>${classification}</td>
        </tr>
      `;
    });

    html += `</table>`;
  });

  html += `</body></html>`;
  return html;
}

function getValueByPath(obj, path) {
  try {
    if (path.includes('find')) {
      return eval(`obj.${path}`);
    }
    return path.split('.').reduce((o, key) => o[key], obj);
  } catch (e) {
    return undefined;
  }
}

module.exports = generateReportTemplate;
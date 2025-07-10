const express = require('express');
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../users');
const assessmentData = require('../data/data');
const assessmentConfig = require('../config/assessmentConfig');
const classificationConfig = require('../config/classificationConfig');
const generateReportTemplate = require('../reportTemplate'); 

const router = express.Router();

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    req.user = decoded;
    next();
  });
};

router.post('/generate-report', verifyToken, async (req, res) => {
  const { session_id } = req.body;
  if (!session_id) {
    return res.status(400).json({ message: 'session_id is required' });
  }

  const data = assessmentData.find(item => item.session_id === session_id);
  if (!data) {
    return res.status(404).json({ message: 'Session not found' });
  }

  const config = assessmentConfig[data.assessment_id];
  if (!config) {
    return res.status(400).json({ message: 'No configuration for this assessment type' });
  }

  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    const htmlContent = generateReportTemplate(data, config, classificationConfig);

    await page.setContent(htmlContent);

    const pdfDir = path.join(__dirname, '../pdfs');
    if (!fs.existsSync(pdfDir)) {
      fs.mkdirSync(pdfDir);
    }

    const pdfPath = path.join(pdfDir, `report_${session_id}.pdf`);

    await page.pdf({
      path: pdfPath,
      format: 'A4',
      printBackground: true,
    });

    await browser.close();

    res.json({ message: 'PDF generated successfully', file: `report_${session_id}.pdf` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error generating PDF' });
  }
});

router.get('/download/:filename', verifyToken, (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, '../pdfs', filename);

  if (fs.existsSync(filePath)) {
    res.download(filePath, filename, (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Error downloading PDF' });
      }
    });
  } else {
    res.status(404).json({ message: 'PDF not found' });
  }
});

module.exports = router;
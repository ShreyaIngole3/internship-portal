const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { GoogleSpreadsheet } = require('google-spreadsheet');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

const SHEET_ID = 'https://docs.google.com/spreadsheets/d/1n7K_AAGkjV4z78u_WsxHAGVjobLYIEHr5_rld7Oaxpg/edit?gid=1405974602#gid=1405974602RE'; // <-- Replace with your Google Sheet ID

const doc = new GoogleSpreadsheet(SHEET_ID);

// Authenticate with Google API using service account
async function accessSheet() {
  await doc.useServiceAccountAuth(require('./service-account.json'));
  await doc.loadInfo();
}

// POST: add student
app.post('/student', async (req, res) => {
  try {
    await accessSheet();
    const sheet = doc.sheetsByTitle['Students'];
    await sheet.addRow(req.body);
    res.status(200).send('Student added');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error adding student');
  }
});

// POST: add company internship
app.post('/company', async (req, res) => {
  try {
    await accessSheet();
    const sheet = doc.sheetsByTitle['Companies'];
    await sheet.addRow(req.body);
    res.status(200).send('Company internship added');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error adding company internship');
  }
});

// GET: list internships
app.get('/internships', async (req, res) => {
  try {
    await accessSheet();
    const sheet = doc.sheetsByTitle['Companies'];
    const rows = await sheet.getRows();
    const data = rows.map(row => ({
      companyName: row.CompanyName,
      role: row.Role,
      duration: row.Duration,
      stipend: row.Stipend,
      deadline: row.Deadline,
    }));
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching internships');
  }
});

// POST: apply for internship
app.post('/apply', async (req, res) => {
  try {
    await accessSheet();
    const sheet = doc.sheetsByTitle['Applications'];
    await sheet.addRow(req.body);
    res.status(200).send('Application added');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error adding application');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

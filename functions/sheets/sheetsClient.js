// ============================================================
// NIORA '26 — Google Sheets Client
// Handles all communication with the Google Sheets API
// ============================================================

const { google } = require('googleapis');

const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

async function getSheetsClient() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const authClient = await auth.getClient();
  return google.sheets({ version: 'v4', auth: authClient });
}

// ── Header setup ────────────────────────────────────────────

const SHEET_HEADERS = {
  Participants: [
    'Registration ID', 'User ID', 'Full Name', 'Email', 'Phone',
    'College', 'Course', 'Branch', 'Year', 'City', 'State',
    'Team ID', 'Team Name', 'Registration Status', 'Payment Status',
    'Created At', 'Updated At',
  ],
  Teams: [
    'Team ID', 'Team Name', 'Leader Name', 'Leader Email', 'Leader Phone',
    'College', 'Course', 'Branch', 'Year', 'City', 'State',
    'Member Count', 'Registration Status', 'Payment Status', 'Created At', 'Updated At',
  ],
  'Team Members': [
    'Team ID', 'Team Name', 'Member ID', 'Member Name', 'Email', 'Phone',
    'College', 'Course', 'Branch', 'Year', 'City', 'State',
    'Role', 'Created At', 'Updated At',
  ],
  Payments: [
    'Payment ID', 'Registration ID', 'Team ID', 'Team Name', 'User ID',
    'Amount', 'Currency', 'Payment Status', 'Payment Method', 'Gateway Reference',
    'Verified By', 'Payment Date', 'Created At', 'Updated At',
  ],
  Submissions: [
    'Submission ID', 'Team ID', 'Team Name', 'Project Name', 'Problem Statement',
    'Description', 'Tech Stack', 'GitHub URL', 'Demo URL', 'Presentation URL',
    'Submission Status', 'Submitted At', 'Updated At',
  ],
  'Activity Logs': [
    'Timestamp', 'Activity ID', 'User ID', 'Registration ID', 'Team ID',
    'Team Name', 'User Name', 'Activity Type', 'Description', 'Status', 'Metadata',
  ],
  'Contact Messages': [
    'Timestamp', 'Name', 'Email', 'Phone', 'Subject', 'Message', 'Status',
  ],
};

/**
 * Ensure all required sheets exist with formatted headers
 */
async function ensureSheetsExist() {
  const sheets = await getSheetsClient();

  const meta = await sheets.spreadsheets.get({ spreadsheetId: SPREADSHEET_ID });
  const existingSheets = meta.data.sheets.map(s => s.properties.title);

  const requests = [];
  for (const sheetName of Object.keys(SHEET_HEADERS)) {
    if (!existingSheets.includes(sheetName)) {
      requests.push({ addSheet: { properties: { title: sheetName } } });
    }
  }

  if (requests.length > 0) {
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: SPREADSHEET_ID,
      requestBody: { requests },
    });
  }

  // Add headers if not present
  for (const [sheetName, headers] of Object.entries(SHEET_HEADERS)) {
    const rangeCheck = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${sheetName}!A1`,
    });

    if (!rangeCheck.data.values || rangeCheck.data.values.length === 0) {
      await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: `${sheetName}!A1`,
        valueInputOption: 'RAW',
        requestBody: { values: [headers] },
      });
    }
  }
}

/**
 * Find a row by a unique identifier in a sheet
 */
async function findRowByValue(sheetName, columnIndex, value) {
  const sheets = await getSheetsClient();
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: `${sheetName}!A:A`,
  });

  const rows = response.data.values || [];
  for (let i = 0; i < rows.length; i++) {
    if (rows[i][columnIndex] === value) {
      return i + 1; // 1-indexed row number
    }
  }
  return null;
}

/**
 * Append or update a row in a sheet
 * Uses the first column as unique key to prevent duplicates
 */
async function upsertRow(sheetName, uniqueId, rowData) {
  const sheets = await getSheetsClient();

  try {
    const existingRow = await findRowByValue(sheetName, 0, uniqueId);

    if (existingRow) {
      // Update existing row
      await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: `${sheetName}!A${existingRow}`,
        valueInputOption: 'USER_ENTERED',
        requestBody: { values: [rowData] },
      });
    } else {
      // Append new row
      await sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: `${sheetName}!A1`,
        valueInputOption: 'USER_ENTERED',
        insertDataOption: 'INSERT_ROWS',
        requestBody: { values: [rowData] },
      });
    }
  } catch (error) {
    console.error(`Error upserting row in ${sheetName}:`, error);
    throw error;
  }
}

/**
 * Append a new row (for logs, messages — no upsert needed)
 */
async function appendRow(sheetName, rowData) {
  const sheets = await getSheetsClient();
  await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: `${sheetName}!A1`,
    valueInputOption: 'USER_ENTERED',
    insertDataOption: 'INSERT_ROWS',
    requestBody: { values: [rowData] },
  });
}

function formatTimestamp(ts) {
  if (!ts) return '';
  const date = ts.toDate ? ts.toDate() : new Date(ts);
  return date.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
}

module.exports = {
  ensureSheetsExist, upsertRow, appendRow, formatTimestamp,
  SHEET_HEADERS,
};

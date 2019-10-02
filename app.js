const gAuthorize = require('./modules/google');
const { google } = require('googleapis');
const express = require("express");
const fs = require('fs');
const app = express();

var data = {
    vocab: { words: [] },
    groups: { groups: [] }
};

app.listen(process.env.PORT, () => {
    startGoogle();
  
});

app.get("/vocab", (req, res, next) => {
    res.send(data.vocab);
});

app.get("/group", (req, res, next) => {
    res.send(data.groups);
});

function startGoogle() {
    // Load client secrets from a local file.
    fs.readFile('credentials.json', (err, content) => {
        if (err) return console.log('Error loading client secret file:', err);
        // Authorize a client with credentials, then call the Google Sheets API.
        gAuthorize.authorize(JSON.parse(content), loadData);
       
    });
}

function loadData(auth) {
    loadGroupData(auth);
    loadVocabData(auth);
}

/**
 * Prints the names and majors of students in a sample spreadsheet:
 * @see https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
function loadVocabData(auth) {
    const sheets = google.sheets({ version: 'v4', auth });
    sheets.spreadsheets.values.get({
        spreadsheetId: '1SxG76uoRcCwDDMNWv42QXMsAeLcZbxuSXHsVP7GL3i0',
        range: 'JP-Vocabulary!A2:E',
    }, (err, res) => {
        if (err) return console.log('The API returned an error: ' + err);
        const rows = res.data.values;
        if (rows.length) {
            // Print columns A and E, which correspond to indices 0 and 4.
            rows.map((row) => {
                const key = row[0];
                const native1 = row[1];
                const native2 = row[2];
                const english = row[3];
                const dataPart = { id: key, native1: native1, native2: native2, english: english };
                data.vocab.words.push(dataPart);
               
            });
        } else {
            console.log('No data found.');
        }
    });
}
function loadGroupData(auth) {
    const sheets = google.sheets({ version: 'v4', auth });
    sheets.spreadsheets.values.get({
        spreadsheetId: '1SxG76uoRcCwDDMNWv42QXMsAeLcZbxuSXHsVP7GL3i0',
        range: 'JP-Groups!A2:B',
    }, (err, res) => {
        if (err) return console.log('The API returned an error: ' + err);
        const rows = res.data.values;
        if (rows.length) {
            // Print columns A and E, which correspond to indices 0 and 4.
            rows.map((row) => {
                const key = row[0];
                const cost = row[1];
                const dataPart = { id: key, cost: cost };
                data.groups.groups.push(dataPart);

            });
        } else {
            console.log('No data found.');
        }
    });
}

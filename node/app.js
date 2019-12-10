const gAuthorize = require('../modules/google');
const mongo = require('mongodb');

const { google } = require('googleapis');
const express = require("express");
const fs = require('fs');
const app = express();
const constants = require('./sheetsConstants');
const {Vocab, VocabGroup} = require('./classes/classes');
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

var data = {};


const mongoDBName = "heroku_qb42nzlx";
var MongoClient = mongo.MongoClient;
var mongoUrl = "mongodb://biggerworldapp:purple-ocean-19@ds333098.mlab.com:33098/heroku_qb42nzlx";


function initData(){
   data.vocab = { words: [] };
   data.groups = { groups: [] }
    
}

app.listen(process.env.PORT, () => {

    initData();
    const port = process.env.PORT;
    console.log(`Express server listening on ${port}`);
    loadFromGoogleSheets();
});

app.get("/vocab", (req, res, next) => {
    res.send(data.vocab);
});

app.get("/group", (req, res, next) => {
    res.send(data.groups);
});

app.get("/refresh", (req, res, next) => {
    initData();
    loadFromGoogleSheets();
    res.send({ status:'OK'});
});

// TODO : connect this with mongo
app.get("/user/:username",(req,res,next)=>{
 const username = req.params.username;
  
  
  MongoClient.connect(mongoUrl, function(err, db) {
    if (err) throw err;
    var dbo = db.db(mongoDBName);
    var query = { username: username };
    dbo.collection("userdata").find(query).toArray((err,result)=>{
        if (err) throw err;
        res.send(result[0]);
        db.close();
    });

  });

});

app.post("/user/:username",(req,res, next)=>{
    try{
    const username = req.params.username;
    const user = req.body;
    MongoClient.connect(mongoUrl, function(err, db) {
        if (err) throw err;
        var dbo = db.db(mongoDBName);
        dbo.collection("userdata").insertOne(user, (err,result)=>{
            if (err){ next(err)}
            else
            {
            res.send('{"status":"OK"}');
            }
            db.close();
        });
   
   });
}catch(ex){
    console.log(ex);
}
});


app.put("/user/:username",(req,res,next)=>{
    const username = req.params.username;
     MongoClient.connect(mongoUrl, function(err, db) {
        if (err) throw err;
        var dbo = db.db(mongoDBName);
        var query = { username: username };
        dbo.collection("userdata").updateOne(query, user, (err,result)=>{
            if (err) throw err;
            res.send('{"status":"OK"}');
            db.close();
        });
   });
});

app.use("/",express.static('dist'));


function loadFromGoogleSheets() {
    // Load client secrets from a local file.
    fs.readFile('credentials.json', (err, content) => {
        if (err) return console.log('Error loading client secret file:', err);
        // Authorize a client with credentials, then call the Google Sheets API.
        gAuthorize.authorize(JSON.parse(content), loadData);
       
    });
}

function loadData(auth) {
    console.log("after auth");
    loadGroupData(auth);
    loadVocabData(auth);
}

/**
 * Loads data from the Vocabulary spreadsheet
 * @see https://docs.google.com/spreadsheets/d/1SxG76uoRcCwDDMNWv42QXMsAeLcZbxuSXHsVP7GL3i0/edit
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
function loadVocabData(auth) {
    const sheets = google.sheets({ version: 'v4', auth });
    sheets.spreadsheets.values.get({
        spreadsheetId: constants.SPREADSHEET_ID,
        range: constants.VOCAB_RANGE,
    }, (err, res) => {
        if (err) return console.log('The API returned an error: ' + err);
        const rows = res.data.values;
        if (rows.length) {
            // Print columns A and E, which correspond to indices 0 through 4.
            rows.map((row) => {
                const id = row[0];
                const native1 = row[1];
                const native2 = row[2];
                const english = row[3];
                const group = row[4]; 
                const dataPart = new Vocab (id, native1,native2,english, group );
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
        spreadsheetId: constants.SPREADSHEET_ID,
        range: constants.GROUP_RANGE,
    }, (err, res) => {
        if (err) return console.log('The API returned an error: ' + err);
        const rows = res.data.values;
        if (rows.length) {
            // Print columns A and E, which correspond to indices 0 and 4.
            rows.map((row) => {
                const id = row[0];
                const cost = row[1];
                const vocabGroupItem = new VocabGroup(id,cost);
                data.groups.groups.push(vocabGroupItem);

            });
        } else {
            console.log('No data found.');
        }
    });
}


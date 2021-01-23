import express = require('express');
import mongo = require('mongodb');
import fs = require('fs');
import * as fromLoader from './modules/sheetLoader';
import { DataStore } from './model/classes';

const app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

let data: DataStore;

const mongoDBName = "bigger-world-db";

// Just for demo, no big secrets here.
//56XCwNpxcjdSG2E
//demouser
const MongoClient = mongo.MongoClient;
const mongoUrl = "mongodb+srv://demouser:56XCwNpxcjdSG2E@cluster0.anvq4.mongodb.net/<dbname>?retryWrites=true&w=majority";
const GAME_PATH = "../biggerworld-master/Assets/PurpleOcean/Resources";

for (let j = 0; j < process.argv.length; j++) {
    console.log(j + ' -> ' + (process.argv[j]));
}

function initData() {
    data = {
        vocab: { items: [] },
        grammar: { items: [] },
        phrases: { items: [] },
        chests: { items: [] }
    };
}

async function init() {

    initData();
    await fromLoader.loadFromGoogleSheets(data);
    exportToFiles(data);

    app.listen(process.env.PORT, () => {

        const port = process.env.PORT;
        console.log(`Express server listening on ${port}`);
    });

}

init();


function exportToFiles(data: DataStore) {
    console.log('export start');
    fs.writeFileSync(GAME_PATH + '/chests.json', JSON.stringify(data.chests));
    fs.writeFileSync(GAME_PATH + '/vocab.json', JSON.stringify(data.vocab));
    fs.writeFileSync(GAME_PATH + '/grammar.json', JSON.stringify(data.grammar));
    fs.writeFileSync(GAME_PATH + '/phrases.json', JSON.stringify(data.phrases));
}

app.get("/vocab", (req, res, next) => {
    res.send(data.vocab);
});

app.get("/chests", (req, res, next) => {
    res.send(data.chests);
});

app.get("/grammar", (req, res, next) => {
    res.send(data.grammar);
});

app.get("/phrases", (req, res, next) => {
    res.send(data.phrases);
});

app.get("/refresh", (req, res, next) => {
    initData();
    fromLoader.loadFromGoogleSheets(data);
    res.send({ status: 'OK' });
});

app.get("/user/:username", (req, res, next) => {
    const username = req.params.username;
    var query = { username: username };
    const client = new MongoClient(mongoUrl, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db(mongoDBName).collection("userdata").find(query).toArray((err, result) => {
            if (err) throw err;
            res.send(result[0]);
            client.close();
        });
    });
});

app.post("/user/:username", (req, res, next) => {
    try {
        const username = req.params.username;
        const user = req.body;
        MongoClient.connect(mongoUrl, (err, db) => {
            if (err) throw err;
            var dbo = db.db(mongoDBName);
            dbo.collection("userdata").insertOne(user, (err, result) => {
                if (err) {
                    next(err)
                }
                else {
                    res.send('{"status":"OK"}');
                }
                db.close();
            });

        });
    } catch (ex) {
        console.log(ex);
    }
});


app.put("/user/:username", (req, res, next) => {
    const username = req.params.username;
    MongoClient.connect(mongoUrl, (err, db) => {
        if (err) throw err;
        var dbo = db.db(mongoDBName);
        var query = { username: username };
        var user = req.body;
        dbo.collection("userdata").updateOne(query, {
            $set: {
                coin: user.coin,
                xp: user.xp,
                level: user.level,
                ownedWords: user.ownedWords,
                ownedGroups: user.ownedGroups
            }
        }, (err, result) => {
            if (err) throw err;
            res.send('{"status":"OK"}');
            db.close();
        });
    });
});

app.use("/", express.static('dist'));

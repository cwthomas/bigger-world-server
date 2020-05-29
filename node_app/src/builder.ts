import fs = require('fs');
import * as fromGoogle from './modules/google';
import * as fromLoader from './modules/loader';
import {DataStore} from './model/classes';

let data: DataStore;

const GAME_PATH = "../BiggerWorld/Assets/PurpleOcean/Resources";

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
}

init() ;

function exportToFiles(data: DataStore) {
    fs.writeFileSync(GAME_PATH + '/chests.json', JSON.stringify(data.chests));
    fs.writeFileSync(GAME_PATH + '/vocab.json', JSON.stringify(data.vocab));
    fs.writeFileSync(GAME_PATH + '/grammar.json', JSON.stringify(data.grammar));
    fs.writeFileSync(GAME_PATH + '/phrases.json', JSON.stringify(data.phrases));
}

async function loadSpeech(dataStore: DataStore) {
    const tts = await fromGoogle.getTextToSpeech();
   // get the mp3s!
}


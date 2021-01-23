import fs = require('fs');
import * as fromGoogle from './modules/google';
import * as fromTTS from '@google-cloud/text-to-speech';
import * as fromLoader from './modules/sheetLoader';
import { DataStore, Vocab, ILangData } from './model/classes';


let data: DataStore;

const GAME_PATH = "../BiggerWorld/Assets/PurpleOcean/Resources";

for (let j = 0; j < process.argv.length; j++) {
    console.log(j + ' -> ' + (process.argv[j]));
}

async function build() {
    const data = await fromLoader.getLangData();
    exportToFiles(data);
}

function exportToFiles(data: DataStore) {
    fs.writeFileSync(GAME_PATH + '/chests.json', JSON.stringify(data.chests));
    fs.writeFileSync(GAME_PATH + '/vocab.json', JSON.stringify(data.vocab));
    fs.writeFileSync(GAME_PATH + '/grammar.json', JSON.stringify(data.grammar));
    fs.writeFileSync(GAME_PATH + '/phrases.json', JSON.stringify(data.phrases));
}

build();

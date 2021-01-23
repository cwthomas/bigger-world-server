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

async function init() {
    const data: ILangData = await fromLoader.getLangData();
    const alreadyLoaded = loadedSpeech();
    console.log(alreadyLoaded);
    data.vocab.items.filter((v) =>  !alreadyLoaded.includes(v.romaji)).forEach((v)=> loadSpeech(v.native2, v.romaji));
    //data.vocab.items.slice(0,50).filter((v) =>  !alreadyLoaded.includes(v.romaji)).forEach((v)=> console.log(v.native2, v.romaji));
}

init();


function loadedSpeech(): string[] {
    return fs.readdirSync(GAME_PATH + '/vocab_audio/').filter((file)=> file.endsWith('mp3')).map((file)=> file.split('.')[0]);

}

async function loadSpeech(text: string, id: string) {
    const client = await fromGoogle.getTextToSpeech();
    // get the mp3s!
    const request: fromTTS.protos.google.cloud.texttospeech.v1.ISynthesizeSpeechRequest = {
        input: { text: text },
        // Select the language and SSML voice gender (optional)
        voice: { languageCode: 'ja-JP', ssmlGender: 'FEMALE' },
        // select the type of audio encoding
        audioConfig: { audioEncoding: 'MP3' },
    };

    // Performs the text-to-speech request
    const [response] = await client.synthesizeSpeech(request);
    // Write the binary audio content to a local file

    await fs.writeFileSync(GAME_PATH + '/vocab_audio/' + id + '.mp3', response.audioContent, 'binary');
    console.log('Audio content written to file: output.mp3');
}


import { SheetConstants } from './sheetsConstants';
import * as fromGoogle from './google';

import { Vocab, Phrase, Grammar, Chest, DataStore } from '../model/classes';

export async function loadFromGoogleSheets(dataStore: DataStore) {
    
    const sheetObj = await fromGoogle.getSheetsObj();
    
    await loadData(sheetObj, SheetConstants.GRAMMAR_RANGE, (row) => {
        const id = row[0];
        const kana = row[1];
        const romaji = row[2];
        const english_description = row[3];
        const english_explanation = row[4];
        const dataPart = new Grammar(id, kana, romaji, english_description, english_explanation);
        dataStore.grammar.items.push(dataPart);
    });

    await loadData(sheetObj, SheetConstants.VOCAB_RANGE, (row) => {
        const id = row[0];
        const native1 = row[1];
        const native2 = row[2];
        const english = row[3];
        const pos = row[4];
        const dataPart = new Vocab(id, native1, native2, english, pos);
        dataStore.vocab.items.push(dataPart);
    });
    console.log('Vocab Loaded');

    
    await loadData(sheetObj, SheetConstants.CHEST_RANGE, (row) => {
        const id = row[0];
        const name = row[1];
        const cost = row[2];
        const vocabIDs = row[3];
        const grammarIDs= row[4];
        const dataPart = new Chest(id, name, vocabIDs, grammarIDs, cost);
        dataStore.chests.items.push(dataPart);
    });
    console.log('Chests Loaded');

    await loadData(sheetObj, SheetConstants.PHRASE_RANGE, (row) => {
        const id = row[0];
        const english = row[1];
        const targets = row[2];
        const grammar = row[3];
        const dataPart = new Phrase(id, english, targets, grammar);
        dataStore.phrases.items.push(dataPart);
    });
}

async function loadData(sheetObj: any, range: string, mapping: (row: any) => void) {
    const array = await fromGoogle.getArray(sheetObj, SheetConstants.SPREADSHEET_ID, range);
    array.forEach(element => {
        mapping(element);
    });
}


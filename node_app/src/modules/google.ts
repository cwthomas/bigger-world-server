import fs from 'fs';

import readline from 'readline';
import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import textToSpeech from '@google-cloud/text-to-speech';

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';
const CRED_PATH = 'credentials.json';

export async function getSheetsObj(){
    const cred = JSON.parse(fs.readFileSync(CRED_PATH, "utf8"));
    const auth = await authorize(cred);
    return google.sheets({version: "v4", auth});
}

export async function getTextToSpeech() {
    const cred = JSON.parse(fs.readFileSync(CRED_PATH, "utf8"));
    const auth = await authorize(cred);
    return new textToSpeech.TextToSpeechClient();
}
/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
async function authorize(cred: any): Promise<OAuth2Client> {
    const {client_secret, client_id, redirect_uris} = cred.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);

    try {
        const token = JSON.parse(fs.readFileSync(TOKEN_PATH, "utf8"));
        oAuth2Client.setCredentials(token);
        return oAuth2Client;
    } catch (e) {
        return await getNewToken(oAuth2Client);
    }
}

export async function getArray(sheetsObj: any, spreadsheetId: string, range: string): Promise<any[][]> {
    return await new Promise((resolve, reject) => {
        sheetsObj.spreadsheets.values.get({spreadsheetId, range}, (err: any, res: any) =>
        err ? reject(err) : resolve(res.data.values));
    }) as any[][];
}

export async function getObjectArray(sheetsObj: any, spreadsheetId: string, range: string): Promise<any[]> {
    return toObjectArray(await getArray(sheetsObj, spreadsheetId, range));
}

function toObjectArray(array: any[][]): any[] {
    const header = array.splice(0, 1)[0];
    const output = [] as any[];

    array.forEach((el) => {
        const entry = {} as any;
        header.forEach((h, i) => {
            entry[h] = el[i] ? el[i] : undefined;
        });
        output.push(entry);
    });

    return output;
}


/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
async function getNewToken(oAuth2Client: OAuth2Client) : Promise<OAuth2Client> {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });

    console.log('Authorize this app by visiting this url:', authUrl);
    
    return await new Promise((resolve, reject) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question("Enter the code from that page here: ", (code) => {
            rl.close();
            oAuth2Client.getToken(code, (err, token) => {
                reject(err);
                if (!token) {
                    reject();
                }
                oAuth2Client.setCredentials(token!);

                fs.writeFileSync(TOKEN_PATH, JSON.stringify(token));

                resolve(oAuth2Client);
            });
        });
    }) as OAuth2Client;

}


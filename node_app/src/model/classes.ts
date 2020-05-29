export class Vocab  {

    public id:string;
    public native1:string;
    public native2:string;
    public english:string;
    public pos:string;

   constructor(id:string,native1:string,native2:string,english:string ,pos:string){
       this.id = id;
       this.native1 = native1;
       this.native2 = native2;
       this.english = english;
       this.pos = pos;
   } 
}


export class Grammar {
    public id:string;
    public kana:string;
    public romaji:string;
    public english_description:string;
    public english_explanation:string;

    constructor(id:string,kana:string,romaji:string,english_description:string,english_explanation:string){
        this.id = id;
        this.kana = kana;
        this.romaji = romaji;
        this.english_description = english_description;
        this.english_explanation = english_explanation;
    } 
 }

 export class Phrase {
    public id:string;
    public english:string;
    public wordIDs:string[];
    public grammarIDs:string[];

    constructor(id:string,english:string,wordIDs:string,grammarIDs:string){
        this.id = id;
        this.english = english;
        this.wordIDs = wordIDs? wordIDs.split(','): [];
        this.grammarIDs = grammarIDs? grammarIDs.split(','): [];
      
    } 
 }

 export class Chest {
    public id:string;
    public name:string;
    public wordIDs:string[];
    public grammarIDs:string[];
    public cost:number;

    constructor(id:string, english:string, wordIDs:string, grammarIDs:string, cost:number){
        this.id = id;
        this.name = english;
        this.wordIDs = wordIDs? wordIDs.split(','): [];
        this.grammarIDs = grammarIDs? grammarIDs.split(','):[];     
        this.cost = cost; 
    } 
 }

 export interface DataStore {
    vocab: { items: Vocab[] },
    grammar: { items: Grammar[] },
    phrases: { items: Phrase[] },
    chests: { items: Chest[] }
}




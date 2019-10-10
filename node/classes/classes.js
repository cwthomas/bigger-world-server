module.exports = {
Vocab : class Vocab {
   constructor(id,native1,native2,english,group){
       this.id = id;
       this.native1 = native1;
       this.native2 = native2;
       this.english = english;
       this.group = group;
   } 
},
VocabGroup : class VocabGroup{
    constructor(id,cost){
        this.id = id;
        this.cost = cost;
    } 
}

};


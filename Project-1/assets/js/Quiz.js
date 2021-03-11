/** REFERENCES TO DOM */

let questionEl = $(".question");
let answerEl = $(".answer");
let counterEl = $(".counter");

/** --------------------------- */

/** DATA STORAGE */

let incorrect = [];
let correct = [];
let thisSession = [];

const localcorrectKey = "correct";

/** --------------------------- */

/** LOCALSTORAGE INIT */
correct = JSON.parse(localStorage.getItem(localcorrectKey)) ?? [];




function loadQuote(quote = ""){
    if(quote === ""){
        //TODO: GENERATE QUOTE FROM API AND DOUBLE CHECK AGAINST CORRECT ARRAY && THIS SESSION
    }

    questionEl.text(quote.quote); //TODO: Implement API traversal
    answerEl.text(/**TODO: other author generator*/)
    thisSession.unshift(quote.quote)

}










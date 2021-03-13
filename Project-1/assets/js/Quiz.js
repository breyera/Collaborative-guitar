/** ---- REFERENCES TO DOM ---- */
//QUIZLET
const questionEl            = $(".question");
const answerContainer       = $(".answers")
const answerEl              = $(".answer");
const counterEl             = $(".counter");
const quizContainer         = $(".quiz-container");
//RESULTS
const resultsContainer      = $(".results-container"); 
const resultsTF             = $(".true-false") //EXPECTS A <SPAN>
const resultsBody           = $(".results-quote");
const resultsAuthor         = $(".results-author");
/** --------------------------- */


/** ------ DATA STORAGE ------- */
let incorrect           = [];
let correct             = [];
let thisSession         = [];
const localcorrectKey   = "correct";
/** --------------------------- */


/** ---- LOCALSTORAGE INIT ---- */
correct = JSON.parse(localStorage.getItem(localcorrectKey)) ?? [];
if(correct === []){localStorage.setItem(localcorrectKey, JSON.stringify(correct))}
/** --------------------------- */


/** -------- VARIABLES -------- */
let listOfAuthors;
let correctAuthor;
let quote;
/** --------------------------- */

/** --------- STYLING --------- */
const HIDE                      = "display: none;";
const SHOW                      = "display: flex;";
const TEXTCOLORRIGHT            = ""
const TEXTCOLORWRONG            = ""
/** --------------------------- */


/** -------- LISTENERS -------- */
answerContainer.on("click", function(e){
    el = e.target;
    //console.log(el.tagName);
    if(el.tagName === "BUTTON"){
        if(el.text() === correctAuthor){
            correct.unshift(quote);
            loadAnswer(true);
            //console.log(correct)
        }else{
            incorrect.unshift(quote);
            loadAnswer(false);
            //console.log(incorrect)
        }
    }
});
/** --------------------------- */


function pickFrom(length){
    return Math.floor(Math.random() * length);
}

async function loadQuote(){
    let wrongA1;
    let wrongA2;

    while (quote === undefined || thisSession.includes(quote)){
        quote = undefined; //?? await FUNCTION THAT GENERATES QUOTE OBJECT;
    }
    if(correct.includes(quote)){
        quote = undefined;
        while (quote === undefined || thisSession.includes(quote)){
            quote = undefined; //?? await FUNCTION THAT GENERATES QUOTE OBJECT;
        }
    }

    correctAuthor = quote.author;

    listOfAuthors = listOfAuthors //?? await (FUNCTION THAT GENERATES LIST OF AUTHORS FROM WIKIPOEDICA)

    while(wrongA1 === undefined || wrongA1 === quote.author){
        wrongA1 = listOfAuthors[pickFrom(listOfAuthors.length)];
    }
    while(wrongA2 === undefined || wrongA2 === quote.author){
        wrongA2 = listOfAuthors[pickFrom(listOfAuthors.length)];
    }

    questionEl.text(quote.quote); //TODO: Implement API traversal
    answerEl.eq(0).text(quote.author)
    answerEl.eq(1).text(wrongA1)
    answerEl.eq(2).text(wrongA2)

    thisSession.unshift(quote.quote)

}

function loadAnswer(bool) {

    quizContainer.attr("style", HIDE);
    resultsContainer.attr("style", SHOW);
    if(bool){
        resultsTF.text("correct").attr("style", TEXTCOLORRIGHT);
    }else{
        resultsTF.text("wrong").attr("style", TEXTCOLORWRONG);
    }

}








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
//LOAD
const loadingScreen         =$(".loading")
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
let quotes;
/** --------------------------- */

/** --------- STYLING --------- */
const HIDE                      = "display: none;";
const SHOW                      = "";
const TEXTCOLORRIGHT            = ""
const TEXTCOLORWRONG            = ""
/** --------------------------- */


/** -------- LISTENERS -------- */
answerContainer.on("click", function(e){
    let el = e.target;
    console.log(el.tagName);
    if(el.tagName === "BUTTON"){
        if(el.textContent === correctAuthor){
            correct.unshift(quote);
            localStorage.setItem(localcorrectKey, JSON.stringify(correct));
            loadAnswer(true);
            console.log(correct)
        }else{
            incorrect.unshift(quote);
            loadAnswer(false);
            console.log(incorrect)
        }
    }
});
/** --------------------------- */


function pickFrom(length){
    return Math.floor(Math.random() * length);
}

async function loadQuote(){
    
    toggleLoading(true);

    quotes = quotes ?? await fetchQuotes();
    console.log(quotes)
    console.log("showing quoteDiv")
    resultsContainer.attr("style", HIDE);
    quizContainer.attr("style", SHOW);

    let wrongA1;
    let wrongA2;

    while (quote === undefined || thisSession.includes(quote)){
        quote = pickFrom(quotes.length);
    }
    if(correct.includes(quote)){
        quote = undefined;
        while (quote === undefined || thisSession.includes(quote)){
            quote = pickFrom(quotes.length);
        }
    }

    correctAuthor = quotes[quote].source;
    listOfAuthors = ["Jean-Paul Sartre", "Marcus Aurelius", "Fyodor Dostoyevsky", "Epictetus", "Carl G. Jung", "Rumi", "Seneca", "Alan Watts", "Friedrich Nietzsche"];
    listOfAuthors = listOfAuthors //?? await (FUNCTION THAT GENERATES LIST OF AUTHORS FROM WIKIPOEDICA)

    while(wrongA1 === undefined || wrongA1 === quotes[quote].source){
        wrongA1 = listOfAuthors[pickFrom(listOfAuthors.length)];
    }
    while(wrongA2 === undefined || wrongA2 === quotes[quote].source || wrongA2 === wrongA1){
        wrongA2 = listOfAuthors[pickFrom(listOfAuthors.length)];
    }

    let randEl1 = pickFrom(3);
    let randEl2;
    let randEl3;
    while (randEl2 === randEl1 || randEl2 === undefined){
        randEl2 = pickFrom(3);
    }
    while (randEl3 === randEl1 || randEl3 === randEl2 || randEl3 === undefined){
        randEl3 = pickFrom(3);
    }


    questionEl.text(quotes[quote].quote); //TODO: Implement API traversal
    answerEl.eq(randEl1).text(quotes[quote].source)
    answerEl.eq(randEl2).text(wrongA1)
    answerEl.eq(randEl3).text(wrongA2)

    thisSession.unshift(quote)

    toggleLoading(false)
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

function toggleLoading(bool){
    if(bool){
        quizContainer.attr("style", HIDE);
        loadingScreen.attr("style", SHOW);
    }else{
        quizContainer.attr("style", SHOW);
        loadingScreen.attr("style", HIDE);
    }
}


window.onload = async function(){
    await loadQuote();
};






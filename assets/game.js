const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");

var total_seconds =60*2;
var c_minutes = parseInt(total_seconds/60);
var c_seconds = parseInt(total_seconds%60);

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let avalibleQuestions = [];


let questions = [
    {
        question: "Inside which HTML element do we put the JavaScript?",
        choice1: "<script>",
        choice2: "<javascript>",
        choice3: "<js>",
        choice4: "<scripting>",
        answer: 1
    },
    {
        question: "What is the correct syntax for refferring to an script called game.js?",
        choice1: "<script href='game.js'>",
        choice2: "<script name='game.js'>",
        choice3: "<script src='game.js'>",
        choice4: "<script file='game.js'>",
        answer: 3
    },
    {
        question: "How do you write Hello World in an alert box?",
        choice1: "msgBox('Hello World');",
        choice2: "alertBox('Hello World');",
        choice3: "msg('Hello World');",
        choice4: "alert('Hello World');",
        answer: 4
    },
    {
        question: "Who invented JavaScript?",
        choice1: "Tim Berners-Lee",
        choice2: "Brendan Eich",
        choice3: "Charles Babbage",
        choice4: "Ryan Dahl",
        answer: 2
    },
    {
        question: "What year was JavaScript invented?",
        choice1: "1991",
        choice2: "1995",
        choice3: "1997",
        choice4: "1994",
        answer: 2
    },
    {
        question: "Was JavaScript used to create this quiz?",
        choice1: "maybe",
        choice2: "no",
        choice3: "idk",
        choice4: "yes",
        answer: 4
    },
    {
        question: "",
        choice1: "",
        choice2: "",
        choice3: "",
        choice4: "",
        answer: 1
    },
    {
        question: "",
        choice1: "",
        choice2: "",
        choice3: "",
        choice4: "",
        answer: 3
    },
    {
        question: "",
        choice1: "",
        choice2: "",
        choice3: "",
        choice4: "",
        answer: 2
    },
    {
        question: "",
        choice1: "",
        choice2: "",
        choice3: "",
        choice4: "",
        answer: 4
    },

];

//constant
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

startGame = () => {
    questionCounter = 0;
    score = 0;
    avalibleQuestions = [ ... questions];
    
    getNewQuestion();
};

function CheckTime(){
    document.getElementById("timer").innerHTML
    = + c_minutes + ' min ' + c_seconds + ' sec ' ;
    if(total_seconds <=0){
        // setTimeout('document.quiz.submit()',1);
        alert("GAME OVER: You Lose");
    return window.location.href= "index.html";
        
    } else{ 
        total_seconds = total_seconds -1;
        c_minutes = parseInt(total_seconds/60);
        c_seconds = parseInt(total_seconds%60);
        setTimeout("CheckTime()",1000);

    } 
}
setTimeout("CheckTime()",1000);




getNewQuestion = () => {
    if(avalibleQuestions.length === 0 || questionCounter >= MAX_QUESTIONS){
        localStorage.setItem("mostRecentScore", score);
        //go to the end page
        return window.location.assign("end.html");
    }
    questionCounter++;
    progressText.innerText = questionCounter + "/" + MAX_QUESTIONS;
    //update the progress bar
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * avalibleQuestions.length);
    currentQuestion = avalibleQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach( choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    });

    avalibleQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        const classToApply = 
         selectedAnswer == currentQuestion.answer ? "correct" : "incorrect" ;

        if(classToApply === "correct") {
            incrementScore(CORRECT_BONUS);
         }

         if(classToApply === "incorrect") {
            total_seconds = c_seconds -10;
         }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
        getNewQuestion();

        }, 1000);
    });
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
};

startGame();
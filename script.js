//set up variables
var timerElement = document.getElementById('timer')
var clickStart = document.getElementById('start-btn')
var headingElement = document.getElementById('heading')
var questionsContElement = document.getElementById('question-container')
var questionElement = document.getElementById('list-question')
var choiceElement = document.getElementById('choice-buttons')
var displayElement = document.getElementById('display')
var lastElement = document.getElementById('gameover')
var scoreElement = document.getElementById("score")
var submitbtn = document.getElementById('submit-btn')
var finalElement = document.getElementById('finalPg')
var input = document.getElementById('Ini-inpit')
var scoreList = document.getElementById('scoreList')
var againBtn = document.getElementById('startagain')
var clearBtn = document.getElementById('clearscore')
var scoreBtn = document.getElementById('highscore')

var timer = ""

var questionIndex , currentQuestionIndex


clickStart.addEventListener("click", startBtn)

//quiz starts after Start button is clicked
//timers function is also executed
function startBtn(){   
    clickStart.classList.add('hide')
    headingElement.classList.add('hide')
    questionIndex = questions
    currentQuestionIndex = 0
    questionsContElement.classList.remove('hide')
    timer1()
    startQuiz()
}

//clear existing HTML section
//render questions
function startQuiz(){
    reset()
    showQuestions(questionIndex[currentQuestionIndex])
}

//countdown function for the quiz
function timer1(){
    timeleft = 75
    timer = setInterval(function(){
        timerElement.innerHTML = "Time:  " + timeleft
        timeleft-- 
        // if time = 0, disenable timer and quiz stops automatically
        if (timeleft===0){
            clearInterval(timer)         
            gameover()}
        },1000)
}

// show questions and respective answer sets from the questions pool
function showQuestions(questionss){
    questionElement.innerText = questionss.question
    questionss.choices.forEach(choice => {
        var answer = document.createElement('button')
        answer.innerText = choice.text
        answer.classList.add('choice')
        if (choice.correct) {
            answer.dataset.correct = choice.correct
        }
        choiceElement.appendChild(answer)
        answer.addEventListener('click', selectAnswer)
    })   
}

//clear existing HTML section 
function reset(){
    while (choiceElement.firstChild){
        choiceElement.removeChild
        (choiceElement.firstChild)
    }
}


function selectAnswer(e){
    displayElement.classList.remove('hide')
    //indicates right or wrong answer
    timer2()
    var selectedChoice = e.target
    var correct = selectedChoice.dataset.correct
    if (correct){
        displayElement.innerText = "Correct!"
    } else {
        displayElement.innerText = "Wrong"
        //time subtract if the answer is wrong
        timeleft = timeleft-15
    };
    if (questionIndex.length > currentQuestionIndex +1){
        currentQuestionIndex++
        startQuiz()
        //end of quiz when running out of question
    } else {  
        gameover()
    }; //end of quiz when running out of time
    if (timeleft<0){
        gameover()
    }
}

//function to indicates right or wrong answer
function timer2(){
    secondleft = 2
    setInterval(function(){
        secondleft-- 
        if (secondleft===0){
            displayElement.innerHTML = ""}
        },1000)
}


function gameover(){
    questionsContElement.classList.add('hide')
    lastElement.classList.remove('hide')
    // score equals to time remaining
    if (timeleft<0){
        scoreElement.innerText = 0
    } else{
        scoreElement.innerText = timeleft
    };
    clearInterval(timer)
    timerElement.innerHTML = "Time:  " + scoreElement.innerText
    input.innerText = ""
    submitbtn.addEventListener('click', finalpage)
}


function finalpage(){
    lastElement.classList.add('hide')
    finalElement.classList.remove('hide')
    savescore()
}

//stringify user's initial and score
function savescore(){
    var playerScore = {
        player: input.value,
        score: scoreElement.innerText,
    }
    localStorage.setItem("playerScore", JSON.stringify(playerScore))
    showScore()
}

//save user's initial and score in local storage
function showScore(){
    var lastScore = JSON.parse(localStorage.getItem("playerScore"));
    scoreList.innerHTML = lastScore.player + " : " + lastScore.score   
}


againBtn.addEventListener('click',()=>{
    finalElement.classList.add('hide')
    clickStart.classList.remove('hide')
    headingElement.classList.remove('hide')
    timerElement.innerHTML = "Time: 0 " 
}
)

clearBtn.addEventListener('click', ()=>{
    scoreList.innerHTML = ""
}
)


//question pool
var questions = [
     {
        question: "What does HTML stand for?",
        choices: [
            { text: "Home Tool Markup Language", correct: false },
            { text: "Hyper Text Markup Language", correct: true },
            { text: "Hyperlinks and Text Markup Language", correct: false }
        ]
  },

  {
    question: "Which selector is used to specify a group of elements?",
    choices: [
        { text: "Name", correct: false },
        { text: "ID", correct: false },
        { text: "Class", correct: true },
        { text: "Tag", correct: false }
    ]
  },

  {
    question: "How do you declare a JavaScript variable x?",
    choices: [
        { text: "define x", correct: false },
        { text: "variable x", correct: false }, 
        { text: "def x", correct: false },
        { text: "var x", correct: true }
    ]
  },

  {
    question: "What is the correct way to write a JavaScript array?",
    choices: [
        { text: "var num=[1,2,3]", correct: true },
        { text: "var num=(1,2,3)", correct: false },
        { text: "var num={1,2,3}", correct: false },
        { text: "var num=1,2,3", correct: false }
    ]
  },
]

scoreBtn.addEventListener('click',init)

function init() {
    // When the init function is executed, the code inside showScore function will also execute
    clickStart.classList.add('hide')
    headingElement.classList.add('hide')
    finalElement.classList.remove('hide')
    showScore();
  }







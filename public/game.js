const myMsg = document.querySelector(".msg");
const correcto = document.querySelector("#correcto");
const problems = document.querySelector("#mathProblems");
const score=document.getElementById("score");
const body=document.getElementById("body");
const temp=document.getElementById("difficultyLevels");
const time=document.getElementById("time");
let randomNum1;
let randomNum2;
var scoreValue=0;
let rangeValue=1;
let operand;
let correctAnswer;
let problemDisplay;
var userAnswer;
let answerSheet;
function setRange(rv)
{
  rangeValue = rv;
  /////////////////////
  setTimeout(() => {
    temp.remove();
  }, 300);
  setQuestion();
}
function someDisplayFunction() 
{
  console.log("Success!"); 
}
function onSubmit(e) {
  e.preventDefault();
  if (userAnswer.value == "") {
    myMsg.innerHTML = "Please give answer";
    setTimeout(() => {
      myMsg.innerHTML = "";
    }, 1000);
  } else if (userAnswer.value == correctAnswer) {//correct part
    correcto.innerHTML = "Correct";
    tme+=30;
    scoreValue+=1;
    score.style.background=`rgb(${150-scoreValue*5},${50+scoreValue*5},${scoreValue*5})`;
    if (scoreValue==4||scoreValue==8||scoreValue==12||scoreValue==16||scoreValue==20||scoreValue==24) 
      {
        rangeValue+=6;
        correcto.innerHTML = "Level Increased";
        setTimeout(() => {
          correcto.innerHTML = "";
          setQuestion();
        }, 2000);
      }
      else
      {
        setQuestion();
        setTimeout(() => {
          correcto.innerHTML = "";
          
        }, 700);
      }
    userAnswer.value='';
  } else {
    myMsg.innerHTML = "Wrong Input";
    scoreValue-=1;
    score.style.background=`rgb(${150-scoreValue*50},${50+scoreValue*50},${scoreValue*50})`;
    setQuestion();
    setTimeout(() => {
      myMsg.innerHTML = "";
    }, 1000);
    userAnswer.value='';
  }
  score.innerHTML=`Score: ${scoreValue}`;
}

function setQuestion() {
  for(let i=0; i<=2; i++)
  { randomNum1 = parseInt((Math.random() * 100) % rangeValue);
    randomNum2 = parseInt(((Math.random() * 100) % rangeValue) + 1);
    operand=parseInt((Math.random()*10)%5);
  }
  if (operand === 0) {
    problemDisplay = `${randomNum1} + ${randomNum2} = ?`;
    correctAnswer = randomNum1 + randomNum2;
  } else if (operand === 1) {
    problemDisplay = `${randomNum1} - ${randomNum2} = ?`;
    correctAnswer = randomNum1 - randomNum2;
  } else if (operand === 2) {
    problemDisplay = `${randomNum1} * ${randomNum2} = ?`;
    correctAnswer = randomNum1 * randomNum2;
  } else if (operand === 3) {
    problemDisplay = `${randomNum1} / ${randomNum2} = ?`
    if (randomNum1>=randomNum2) 
    {correctAnswer = parseInt(randomNum1 / randomNum2);}
    else{correctAnswer=0;}
  } 
    else if (operand === 4) {
    problemDisplay = `${randomNum1} % ${randomNum2} = ?`;
    correctAnswer = randomNum1 % randomNum2;
  }
  problems.innerHTML = problemDisplay;
  userAnswer = document.querySelector("#answer");
  answerSheet = document.querySelector("#answerSheet");
  answerSheet.addEventListener("submit", onSubmit);
}
setQuestion();
let tme=270;
const btn = document.querySelectorAll("button");
btn.forEach((tmpBtn)=>{
  tmpBtn.addEventListener("click", (e)=>{
    let myInterval = setInterval(() => {
      tme-=1;////////////
      time.style.width=`${tme}px`;
      if (tme==100) {
        time.style.backgroundColor="orange";
      }
      else if(tme==60)
      { 
        time.style.backgroundColor="red";
      }
      else if(tme<0)
      {
        problems.innerHTML="Game Over <br><input type='text' placeholder = 'your name:' id='nameInput' required autofocus>";
        answerSheet.style.display="none";
        clearInterval(myInterval);
        const nameInput = document.querySelector("#nameInput");
        nameInput.addEventListener("keypress", (e)=>{
          if(e.key==="Enter")
          {
            console.log(nameInput.value, scoreValue);
            var data = {name: nameInput.value, score: scoreValue};
            fetch("/", {
              method: "POST",
              headers: {'Content-Type': 'application/json'}, 
              body: JSON.stringify(data)
          }).then(res => {
              console.log("Request complete! response:", res);
              window.location.assign('/')
          }).catch(err=>{
              console.log(err);
          })
          }
        
    })
      }
    }, 100);
  })
})














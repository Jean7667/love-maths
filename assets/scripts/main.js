 /*DOM loading complete -- thrunning the game
 Get the button elements and add event listeners to them */


console.log("JS OK");
//check link with js file

/* const submitbtn = document.querySelector(".btn--gray");
console.log(submitbtn.getAttribute("data-type"));  */

document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.getElementsByTagName("button");
// array with all the buttons    
// let button of buttons = loop for     

for (let button of buttons) {
        button.addEventListener("click", function() {
            if (this.getAttribute("data-type") === "submit") {
                checkAnswer();
                //alert("You clicked Submit!");
            } else {
                let gameType = this.getAttribute("data-type");
                runGame (gameType);
            }
        })
    }
       // use enter key to submit response 
    document.getElementById("answer-box").addEventListener("keydown", function (evt){
            if (evt.key ==="Enter") {
                checkAnswer();
        }
   })
})

    // start game by calling the function
    runGame("addition");

/**
 * The main game "loop", called when the script is first loaded
 * and after the user's choice has been processed
 */
function runGame(gameType) {

    // reset answer box 
    document.getElementById("answer-box").value=""
    // put the cursor in answer box
    document.getElementById("answer-box").focus();

//creates 2 numbers randomly between 1 and 25
let num1 = Math.floor(Math.random()*25)+1;
let num2 = Math.floor(Math.random()*25)+1;

      if (gameType === "addition") {
    
        displayAdditionQuestion (num1, num2);
    
    } else if (gameType === "multiply") {
    
        displayMultiplyQuestion (num1,num2);

    } else if (gameType === "subtract") {
    
        displaySubtractQuestion (num1,num2);

    } else if (gameType === "division") {
    
        displayDivisionQuestion (num1,num2);
    
    } else { 
        alert (`unknown game type: ${gameType}`);
    // Error message ans exit
      throw `unknown game type: ${gameType}. Aborting!`;
}

}

/**
 * check the anwser against the first element in  
 * the returned calculatedCorectAnswer with an array
 */

function checkAnswer() {
    let userAnswer = parseInt(document.getElementById("answer-box").value);
    let calculatedAnswer = calculateCorrectAnswer ();
    let isCorrect = userAnswer === calculatedAnswer[0];
   
    if (isCorrect) {
        alert("Hey! You got it right! ;) ");
        incrementScore();

    } else {
        
        alert(`Oups! You answered ${userAnswer}. The correct answer was ${calculatedAnswer[0]}!`)
        incrementWrongAnswer();
    } 
        runGame(calculatedAnswer[1]);
}
/**
 * Gets operands (the numbers and the operator (+, - , X and /)
 *directly from the Dom and returns the correct answer
 */
function calculateCorrectAnswer() {
 let operand1 = parseInt(document.getElementById("operand1").innerText);
 let operand2 = parseInt(document.getElementById("operand2").innerText);
 let operator = document.getElementById("operator").innerText;
        
    if (operator === "+") {
    return [operand1 + operand2, "addition"];
    } else if (operator === "x") {
        return [operand1 * operand2, "multiply"];
    } else if (operator === "-") {
        return [operand1 - operand2, "subtract"];
    } else if (operator === "/") {
        return [operand1 / operand2, "division"];
    } 
      else {
    alert (`Unimplemented operator ${operator}`);
    throw `Unimplemented operator ${operator}. Aborting`;
}
}
/**
 * Gets the current score from the DOM and increments it by 1
 */
function incrementScore() {
let oldscore = parseInt(document.getElementById("score").innerText);
//!to review coompound operator to add1 before or after variable
document.getElementById("score").innerHTML = ++oldscore;
}
/**
 * Gets the current total of incorrect answers from the Dom and add 1 to it
 */
function incrementWrongAnswer() {
//!
let oldscore = parseInt(document.getElementById("incorrect").innerText);
//!to review coompound operator to add1 before or after variable
document.getElementById("incorrect").innerHTML = ++oldscore;

}
/**
 * ---display addition question 
 */
function displayAdditionQuestion(operand1,operand2) {
    //capture content of html element with id ("operand x)
    document.getElementById("operand1").textContent = operand1;
    document.getElementById("operand2").textContent = operand2;
    document.getElementById("operator").textContent = "+";

}

/**
 * subtraction --
 * -Tenery operator --- so no negative value
 */
function displaySubtractQuestion (operand1,operand2) {

    document.getElementById("operand1").textContent = operand1 > operand2 ? operand1 : operand2
    document.getElementById("operand2").textContent = operand1 > operand2 ? operand2 : operand1
    document.getElementById("operator").textContent = "-";

}

/**
 * ---Multiplication
 */
function displayMultiplyQuestion(operand1,operand2) {
    document.getElementById("operand1").textContent = operand1;
    document.getElementById("operand2").textContent = operand2;
    document.getElementById("operator").textContent = "x";
}

/**
 * ---
 */
function displayDivisionQuestion(operand1,operand2) {
    operand1 = operand2 * operand1
    document.getElementById("operand1").textContent = operand1;
    document.getElementById("operand2").textContent = operand2;
    document.getElementById("operator").textContent = "/";
    
}

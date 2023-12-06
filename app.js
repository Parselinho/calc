const numbersButtons = document.querySelectorAll(".number");
const operatorsButtons = document.querySelectorAll(".operator");
const operatorScreen = document.querySelector(".operatorScreen");
const firstNumberToDisplay = document.querySelector(".firstNumber");
const secondNumberToDisplay = document.querySelector(".secondNumber");
const results = document.querySelector(".result");
const equal = document.querySelector(".equal");
const acButton = document.querySelector(".ac");
const topCalcScreen = document.querySelector(
  "body > div.pageContainer > div > div > div"
);

let isOperatorClicked = false;
let firstNumberArr = [];
let secondNumberArr = [];
let numberOfClick = [];
let currentOperator, displayResult, combineFirstNumbers, combineSecondNumbers;

numbersButtons.forEach((numberBtn) => {
  numberBtn.addEventListener("click", (e) => {
    let buttonNumber = e.target.textContent;
    if (buttonNumber === ".") {
      if (
        (isOperatorClicked && secondNumberArr.includes(".")) ||
        (!isOperatorClicked && firstNumberArr.includes("."))
      ) {
        return;
      }
    }
    if (isOperatorClicked) {
      secondNumberArr.push(buttonNumber);
      combineSecondNumbers = secondNumberArr.join("");
      secondNumberToDisplay.textContent = combineSecondNumbers;
    } else {
      firstNumberArr.push(buttonNumber);
      combineFirstNumbers = firstNumberArr.join("");
      firstNumberToDisplay.textContent = combineFirstNumbers;
    }
  });
});

operatorsButtons.forEach((operator) => {
  operator.addEventListener("click", (e) => {
    currentOperator = e.target.textContent;
    operatorScreen.textContent = currentOperator;
    isOperatorClicked = true;
    if (firstNumberArr.length === 0 && currentOperator !== "√") {
      firstNumberArr.push("0");
      combineFirstNumbers = "0";
      firstNumberToDisplay.textContent = combineFirstNumbers;
    }
    if (
      numberOfClick.length > 0 &&
      topCalcScreen.classList.contains("up") &&
      currentOperator !== "√"
    ) {
      firstNumberToDisplay.textContent = displayResult;
      secondNumberArr.textContent = combineSecondNumbers;
    }
  });
});

equal.addEventListener("click", () => {
  if (combineSecondNumbers) {
    showResults(currentOperator);
    firstNumberArr = [displayResult];
    combineFirstNumbers = displayResult.toString();
    secondNumberArr = [];
    combineSecondNumbers = "";
    isOperatorClicked = false;
  }
});

acButton.addEventListener("click", () => {
  firstNumberToDisplay.textContent = "";
  secondNumberToDisplay.textContent = "";
  operatorScreen.textContent = "";
  results.textContent = "";
  firstNumberArr = [];
  secondNumberArr = [];
  combineFirstNumbers = "";
  topCalcScreen.className = "";
});

function root(a) {
  return Math.sqrt(a);
}

function showResults(operation) {
  let numberOne = parseFloat(combineFirstNumbers);
  console.log(combineFirstNumbers);
  let numberTwo = parseFloat(combineSecondNumbers);
  console.log(combineSecondNumbers);
  switch (operation) {
    case "+":
      displayResult = numberOne + numberTwo;
      break;
    case "-":
      displayResult = numberOne - numberTwo;
      break;
    case "/":
      displayResult = numberOne / numberTwo;
      break;
    case "X":
      displayResult = numberOne * numberTwo;
      break;
    case "%":
      displayResult = numberOne % numberTwo;
      break;
    case "^":
      displayResult = Math.pow(numberOne, numberTwo);
      break;
    case "√":
      displayResult = root(numberTwo);
      break;
  }
  numberOfClick.push(operation);
  results.innerHTML = displayResult;
  topCalcScreen.className = "up";
}

document.addEventListener("keydown", (e) => {
  // Handling number and operator keys
  numbersButtons.forEach((button) => {
    if (button.textContent === e.key) {
      button.click();
    }
  });

  operatorsButtons.forEach((button) => {
    if (button.textContent === e.key) {
      button.click();
    }
  });

  // Handling special keys
  if (e.key === "Enter" || e.key === "=") {
    equal.click();
  }

  if (e.key === "Escape" || e.key === "Backspace") {
    acButton.click();
  }
});

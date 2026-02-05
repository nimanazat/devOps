(function () {
  const historyEl = document.getElementById("history");
  const resultEl = document.getElementById("result");
  const keys = document.querySelector(".keys");

  let firstOperand = null;
  let operator = null;
  let waitingForSecondOperand = false;

  function inputNumber(num) {
    const current =
      resultEl.textContent === "0" || waitingForSecondOperand
        ? ""
        : resultEl.textContent;
    resultEl.textContent = current + num;
    waitingForSecondOperand = false;
  }

  function inputDecimal() {
    if (waitingForSecondOperand) {
      resultEl.textContent = "0.";
      waitingForSecondOperand = false;
      return;
    }
    if (!resultEl.textContent.includes(".")) {
      resultEl.textContent += ".";
    }
  }

  function clearAll() {
    firstOperand = null;
    operator = null;
    waitingForSecondOperand = false;
    resultEl.textContent = "0";
    historyEl.textContent = "";
  }

  function backspace() {
    if (waitingForSecondOperand) return;
    const current = resultEl.textContent;
    if (current.length <= 1) {
      resultEl.textContent = "0";
    } else {
      resultEl.textContent = current.slice(0, -1);
    }
  }

  function toggleSign() {
    if (resultEl.textContent === "0") return;
    if (resultEl.textContent.startsWith("-")) {
      resultEl.textContent = resultEl.textContent.slice(1);
    } else {
      resultEl.textContent = "-" + resultEl.textContent;
    }
  }

  function calculate(first, second, op) {
    const a = parseFloat(first);
    const b = parseFloat(second);
    if (isNaN(a) || isNaN(b)) return second;
    switch (op) {
      case "+":
        return a + b;
      case "-":
        return a - b;
      case "*":
        return a * b;
      case "/":
        return b === 0 ? "Error" : a / b;
      default:
        return b;
    }
  }

  function handleOperator(nextOperatorSymbol) {
    const inputValue = resultEl.textContent;

    if (firstOperand === null) {
      firstOperand = inputValue;
    } else if (!waitingForSecondOperand && operator) {
      const result = calculate(firstOperand, inputValue, operator);
      resultEl.textContent =
        typeof result === "number"
          ? String(parseFloat(result.toFixed(8)))
          : result;
      firstOperand = result;
    }

    operator = nextOperatorSymbol;
    waitingForSecondOperand = true;

    historyEl.textContent =
      typeof firstOperand === "number" || typeof firstOperand === "string"
        ? firstOperand + " " + nextOperatorSymbol
        : "";
  }

  function handleEquals() {
    if (operator === null || waitingForSecondOperand) return;
    const secondOperand = resultEl.textContent;
    const result = calculate(firstOperand, secondOperand, operator);

    const expression = firstOperand + " " + operator + " " + secondOperand;
    historyEl.textContent = expression + " =";

    resultEl.textContent =
      typeof result === "number"
        ? String(parseFloat(result.toFixed(8)))
        : result;

    firstOperand = result;
    operator = null;
    waitingForSecondOperand = true;
  }

  keys.addEventListener("click", (event) => {
    const button = event.target;
    if (!button.matches("button")) return;

    const number = button.getAttribute("data-number");
    const op = button.getAttribute("data-operator");
    const action = button.getAttribute("data-action");

    if (number !== null) {
      inputNumber(number);
      return;
    }

    if (op !== null) {
      handleOperator(op);
      return;
    }

    switch (action) {
      case "decimal":
        inputDecimal();
        break;
      case "clear":
        clearAll();
        break;
      case "backspace":
        backspace();
        break;
      case "sign":
        toggleSign();
        break;
      case "equals":
        handleEquals();
        break;
    }
  });

  // Optional: keyboard support for basic keys
  window.addEventListener("keydown", (e) => {
    if (e.key >= "0" && e.key <= "9") {
      inputNumber(e.key);
    } else if (e.key === ".") {
      inputDecimal();
    } else if (["+", "-", "*", "/"].includes(e.key)) {
      handleOperator(e.key);
    } else if (e.key === "Enter" || e.key === "=") {
      e.preventDefault();
      handleEquals();
    } else if (e.key === "Backspace") {
      backspace();
    } else if (e.key.toLowerCase() === "c") {
      clearAll();
    }
  });
})();


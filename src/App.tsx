import { useState } from 'react'
import './App.css'

function App() {
  
  const [answer, setAnswer] = useState("");
  const [expression, setExpression] = useState("");
  const et = expression.trim();
  
  const isOperator = (symbol: string) => {
    return /[-+/*]/.test(symbol);
  }

  const buttonPress = (symbol: string) => {
    if(symbol === "clear") {
      setAnswer("");
      setExpression("0");
    } else if (symbol === "negative") {
      if (answer === "") return;
      setAnswer(
        answer.toString().charAt(0) === "-" ? answer.slice(1) : "-" + answer
      );
      } else if (isOperator(symbol)) {
        setExpression(et + " " + symbol + " ");
      } else if (symbol === "=") {
        evaluate();
      } else if (symbol === "0") {
        if(expression.charAt(0) !== "0") {
          setExpression(expression + symbol);
        }
      } else if (symbol === ".") {
        const lastNumber = expression.split(/[-+/*]/g).pop();
        if (!lastNumber) return;
        if (lastNumber?.includes(".")) return;
        setExpression(expression + symbol);
      } else {
        if (expression.charAt(0) === "0") {
          setExpression(expression.slice(1) + symbol);
        } else {
          setExpression(expression + symbol);
        }
      }
  }
  
  const evaluate = () => {

    if (isOperator(et.charAt(et.length - 1))) return;

    const parts = et.split(" ");
    const newParts = [];


    for (let i = parts.length - 1; i >= 0; i--) {
      if(["*", "/", "+"].includes(parts[i]) && isOperator(parts[i - 1])) {
        newParts.unshift(parts[i]);
        let j = 0;
        let k = i - 1;
        while (isOperator(parts[k])) {
          k--;
          j++;
        }
        i -= j;
      } else {
          newParts.unshift(parts[i]);
        }
    }

  const newExpression = newParts.join(" ");
  if(isOperator(newExpression.charAt(0))) {
    setAnswer(eval(answer + newExpression) as string);
  } else {
    setAnswer(eval(newExpression) as string);
  }
  setExpression("");
}

  return (
    <>
      <div className="container">
        <h1>Calculator App</h1>
        <div id="calculator" className="calculator">
          <div id="display" className="display-container">
            <div id="answer" className="answer-display display">
              {answer}
            </div>
            <div id="expression" className="expression-display display">
              {expression}
            </div>
          </div>
          <div className="button-container">
            <button onClick={() => buttonPress("clear")} className="button clear-button" id="clear" value="C">C</button>
            <button onClick={() => buttonPress("negative")} className="button operator-button" id="clear" value="C">+/-</button>
            <button onClick={() => buttonPress("/")} className="button operator-button" id="divide" value="/">/</button>
            <button onClick={() => buttonPress("*")} className="button operator-button" id="multiply" value="x">x</button>
            <button onClick={() => buttonPress("7")} className="button number-button" id="seven" value="7">7</button>
            <button onClick={() => buttonPress("8")} className="button number-button" id="eight" value="8">8</button>
            <button onClick={() => buttonPress("9")} className="button number-button" id="nine" value="9">9</button>
            <button onClick={() => buttonPress("-")} className="button operator-button" id="subtract" value="-">-</button>
            <button onClick={() => buttonPress("4")} className="button number-button" id="four" value="4">4</button>
            <button onClick={() => buttonPress("5")} className="button number-button" id="five" value="5">5</button>
            <button onClick={() => buttonPress("6")} className="button number-button" id="six" value="6">6</button>
            <button onClick={() => buttonPress("+")} className="button operator-button" id="add" value="+">+</button>
            <button onClick={() => buttonPress("1")} className="button number-button" id="one" value="1">1</button>
            <button onClick={() => buttonPress("2")} className="button number-button" id="two" value="2">2</button>
            <button onClick={() => buttonPress("3")} className="button number-button" id="three" value="3">3</button>
            <button onClick={() => buttonPress("0")} className="button number-button zero-button" id="zero" value="0">0</button>
            <button onClick={() => buttonPress(".")} className="button number-button" id="decimal" value=".">.</button>
            <button onClick={() => buttonPress("=")} className="button equals-button" id="equals" value="=">=</button>    
          </div>
        </div>
      </div>
    </>
  );
}

export default App

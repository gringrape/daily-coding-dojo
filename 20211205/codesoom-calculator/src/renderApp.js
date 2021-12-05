/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */

/* @jsx createElement */

function createElement(tagName, props, ...children) {
  const element = document.createElement(tagName);

  Object.entries(props || {}).forEach(([key, value]) => {
    element[key.toLowerCase()] = value;
  });

  children.flat().forEach((child) => {
    if (child instanceof Node) {
      element.appendChild(child);
      return;
    }
    element.appendChild(document.createTextNode(child));
  });

  return element;
}

function calculate(opearand1, opearand2, operation) {
  return ({
    '+': opearand1 + opearand2,
    '-': opearand1 - opearand2,
    '*': opearand1 * opearand2,
    '/': opearand1 / opearand2,
  }[operation]);
}

export default function renderApp(state = {
  value: 0,
  accumulator: 0,
  operation: null,
}) {
  const { value, accumulator, operation } = state;

  const handleClickNumber = (number) => {
    renderApp({
      ...state,
      value: value * 10 + number,
    });
  };

  const handleClickOperator = (operator) => {
    renderApp({
      value: 0,
      accumulator: calculate(accumulator, value, operation) ?? value,
      operation: operator,
    });
  };

  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const operators = ['+', '-', '*', '/', '='];

  const element = (
    <div>
      <p>간단 계산기</p>
      <p id="value">
        {value === 0 ? accumulator : value}
      </p>
      <ul>
        {numbers.map((number) => (
          <button type="button" onClick={() => handleClickNumber(number)}>
            {number}
          </button>
        ))}
      </ul>
      <ul>
        {operators.map((operator) => (
          <button type="button" onClick={() => handleClickOperator(operator)}>
            {operator}
          </button>
        ))}
      </ul>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

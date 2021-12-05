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

function calculate(accumulator, result, operation) {
  return ({
    '+': accumulator + result,
    '-': accumulator - result,
    '*': accumulator * result,
    '/': accumulator / result,
  }[operation]);
}

const reducers = {
  initialNumber: (state, number) => ({
    operation: null,
    result: number,
    accumulator: 0,
  }),
  inputNumber: (state, number) => ({
    ...state,
    result: 10 * state.result + number,
  }),
  inputOperation: ({ accumulator, result, operation }, operator) => ({
    result: 0,
    accumulator: operation
      ? calculate(accumulator, result, operation)
      : result,
    operation: operator,
  }),
  inputEquator: ({ accumulator, result, operation }) => ({
    result: calculate(accumulator, result, operation),
    accumulator: 0,
    operation: '=',
  }),
};

export default function renderApp(state = {
  result: 0,
  accumulator: 0,
  operation: null,
}) {
  const { result, accumulator, operation } = state;

  const handleClickNumber = (number) => {
    renderApp(
      operation === '='
        ? reducers.initialNumber(state, number)
        : reducers.inputNumber(state, number),
    );
  };

  const handleClickOperator = (operator) => {
    renderApp(
      operator === '='
        ? reducers.inputEquator(state)
        : reducers.inputOperation(state, operator),
    );
  };

  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const operators = ['+', '-', '*', '/', '='];

  const element = (
    <div>
      <p>간단 계산기</p>
      <p id="value">
        {result === 0 ? accumulator : result}
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

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

const isNull = (i) => i === null;

function calculate(operator, operand1, operand2) {
  if (isNull(operand1) || isNull(operator) || operator === '=') {
    return operand2;
  }

  return {
    '+': operand1 + operand2,
    '-': operand1 - operand2,
    '*': operand1 * operand2,
    '/': operand1 / operand2,
  }[operator];
}

const initialState = {
  operand2: 0,
  operand1: 0,
  operator: null,
};

export default function render(state = initialState) {
  const { operand1, operand2, operator } = state;

  const handleClickNumber = (number) => {
    render({
      ...state,
      operand2: (operand2 ?? 0) * 10 + number,
    });
  };

  const handleClickSign = (sign) => {
    render({
      operand2: null,
      operand1: calculate(operator, operand1, operand2),
      operator: sign,
    });
  };

  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const signs = ['+', '-', '*', '/', '='];

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{operand2 ?? operand1}</p>
      <p>
        {numbers.map((number) => (
          <button type="button" onClick={() => handleClickNumber(number)}>
            {number}
          </button>
        ))}
      </p>
      <p>
        {signs.map((sign) => (
          <button type="button" onClick={() => handleClickSign(sign)}>
            {sign}
          </button>
        ))}
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

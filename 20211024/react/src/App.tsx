import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  grid-template-columns: min-content auto;
  grid-gap: 10px;
`;

const InputControl = styled.span`
  display: grid;
  grid-template-areas: 'checkbox';
  height: 16px;
  width: 16px;
`;

const Input = styled.input`
  display: inline-grid;
  grid-area: checkbox;
  opacity: 0;
  z-index: 5000;

  &:checked + span svg {
    opacity: 1;
  }

  &:checked + span {
    background-color: rgb(255, 112, 0);
    border: 1px solid rgb(255, 112, 0);
  }
`;

const CheckBox = styled.span`
  display: inline-grid;
  grid-area: checkbox;
  border: 1px solid black;
  border-radius: 3px;
`;

const CheckIcon = styled.svg`
  margin: auto auto;
  width: 12px;
  height: 12px;
  opacity: 0;
  color: white;
`;

const Label = styled.span`
  & > span {
    height: 12px;
    font-size: 12px;
  }
`;

export default function App() {
  return (
    <Container>
      <InputControl>
        <Input type="checkbox" />
        <CheckBox>
          <CheckIcon
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            aria-hidden="true"
            focusable="false"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeWidth="5"
              d="M1.73 12.91l6.37 6.37L22.79 4.59"
            />
          </CheckIcon>
        </CheckBox>
      </InputControl>
      <Label>
        <span>
          정말로 동의합니다
        </span>
      </Label>
    </Container>
  );
}

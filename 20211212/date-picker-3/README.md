# TDD 로 Date picker 만들기

## 요구사항 정의

- ~~날짜를 월별로 표시한다~~
  
  - ~~이번달 날짜를 표시한다~~
  
  - ~~다음달, 이전달로 넘어갈 수 있다~~

- ~~날짜를 고른다~~
  
  - ~~날짜를 고를 수 있다~~
    
    - ~~날짜를 고르면 외부에 표시된다~~
  
  - ~~선택가능한 날짜를 제한한다~~

- ~~날짜를 요일 별로 표시한다~~

- ~~모달이 된다~~
  
  - ~~모달이 표시된다~~
  
  - ~~날짜 버튼을 누르면 모달이 켜진다~~
  
  - ~~확인, 취소를 클릭하면 모달이 꺼진다~~
  
  - ~~확인을 누르면 날짜가 반영된다~~
  
  - ~~취소를 누르면 날짜가 반영되지 않는다~~
  
  - ~~바깥쪽을 클릭하면 꺼진다~~

- 스타일 작업

## 날짜 제한

MUI 의 인터페이스 참고

[React Date Picker component - MUI](https://mui.com/components/date-picker/)

```jsx
      <StaticDatePicker
        orientation="landscape"
        openTo="day"
        value={value}
        shouldDisableDate={isWeekend}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
```

shouldDisableDate 와 같이 비활성화 시킬 날짜를 지정하는 함수를 전달해주기.

## TDD 로 time picker 만들기

time picker 의 예제 확인하기.

## useClickOutside hook

https://usehooks.com/useOnClickOutside/

바깥쪽을 클릭하면 사라지는 간단한 훅을 만들어보자.

- useEffect hook 을 통해서 document 에 이벤트를 연동해준다. 

테스트 하기

- fireEvent 로는 테스트가 안된다. -> userEvent 를 활용해보자 (둘의 차이점은 무엇일까?)

## 참고

어떤 Node 가 다른 Node 의 하위 인지 검사하기 [Node.contains() - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Node/contains)

## Recoil Initial state mocking

```javascript
  const initializeState = ({ set }: any) => {
    set(calendarState, {
      year: 2019,
      month: 3,
    });
  };

  const wrapper = ({ children }: {children: React.ReactNode}) => (
    <RecoilRoot initializeState={initializeState}>
      {children}
    </RecoilRoot>
  );
```

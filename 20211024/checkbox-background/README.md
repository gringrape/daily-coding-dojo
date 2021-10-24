# Custom checkbox style
## 목표
checkbox input 의 색깔을 원하는 대로 바꾸기

## 알려진 방법
### 1. accent-color 속성
```css
input[type="checkbox"] {
  accent-color: red; 
}
```
기존의 방법들과 비교해서, 적은 코드로(한줄로) 체크박스의 색을 바꿀 수 있다는 장점이 있다. `color-scheme` 속성에 따라 효과가 달라진다.

체크의 색깔을 따로 조정할 수는 없고, 2021.10 월 현재, 지원되는 브라우저의 제한이 있어, 일부 브라우저에서는(iOS Safari 포함) 에서는 지원되지 않는다는 단점이 있다.  

`accent-color`: https://developer.mozilla.org/en-US/docs/Web/CSS/accent-color
`color-scheme`: 

### 2. Pseudo element 이용
원래 적용된 input 스타일을 감추고, label 을 styling 해서 그자리에 놓는방법. 

참고: https://moderncss.dev/pure-css-custom-checkbox-style/

## Pseudo element 를 이용한 예제

### 스타일링 목표
- scale with the font-size provided to the label
- gain the same color as provided to the label for ease of theme-ability
- achieve a consistent, cross-browser design style, including :focus state
- maintain keyboard accessibility

### mark up
`index.html` 파일:
```html
<body>
  <label class="checkbox">
    <span class="checkbox__input">
      <input type="checkbox" name="checkbox" />
      <span class="checkbox__control">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          aria-hidden="true"
          focusable="false"
        >
          <path
            fill="none"
            stroke="currentColor"
            stroke-width="3"
            d="M1.73 12.91l6.37 6.37L22.79 4.59"
          />
        </svg>
      </span>
    </span>
    <span class="radio__label">Checkbox</span>
  </label>
</body>
```

### 1. label style
`style.css` 파일:
```css
.checkbox {
  display: grid;
  grid-template-columns: min-content auto;
  grid-gap: 0.5em;
  font-size: 2rem;
}
```

### label style 참고
`grid-template-columns`:
grid column 의 size 비율을 정하는 속성.

참고: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns

`min-content`:
> The min-content sizing keyword represents the intrinsic minimum width of the content. For text content this means that the content will take all soft-wrapping opportunities, becoming as small as the longest word.

text 의 모든 soft-wrapping 이 발생하도록 하는 크기.
즉, 가장 긴 단어의 길이가 된다. 

참고: https://developer.mozilla.org/en-US/docs/Web/CSS/min-content

위에서 soft wrapping 이라는 단어가 등장하는데, 이는 box 의 size 가 줄어들때, text 가 어떻게 끊어지는지(wrap)를 정하는 방법 중 하나이다. 이는 css3 에서 `white-space` 라는 속성으로 컨트롤 할 수 있다. 

참고: https://www.w3.org/TR/css-text-3/#white-space-property

### 2. hide native input
기본적으로 제공되는 checkbox 를 숨긴다. 
`style.css`:
```css
.checkbox__input {
  input {
    opacity: 0;
    width: 1em;
    height: 1em;
  }
}
```

### 3. checkbox outline 만들기
`style.css`:
```css
.checkbox__control {
  display: inline-grid;
  width: 1em;
  height: 1em;
  border-radius: 0.25em;
  border: 0.1em solid currentColor;
}
```

### 4. checkbox 의 위치 옮기기
`grid-template-areas` 속성으로 영역을 하나로 지정한뒤에, 자식 요소들을 모두 해당영역으로 지정하면,
`absolute` 와 같은 효과가 난다. 

`style.css`:
```css
.checkbox__input {
  display: grid;
  grid-template-areas: 'checkbox';

  > * {
    grid-area: checkbox;
  }
}
```

### 5. 클릭시 스타일 설정
체크된 상태에서 sibling 속성을 이용해서 스탕딜을 변경해준다. 
```css 
.checkbox__control svg {
  transition: transform 0.1s ease-in 25ms;
  transform: scale(0);
  transform-origin: bottom left;
}

.checkbox__input input:checked + .checkbox__control svg {
  transform: scale(1);
}
```

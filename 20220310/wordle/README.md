## 기능명세
1. 사용자의 guess가 word list에 포함 여부를 체크한다.
2. 사용자의 guess가 word list에 있을 때,
   * answer와 guess를 비교해서 guess 중 answer와 일치하는 letter의 자리를 알려준다.
   
   1.
   guess 의 모든 position 에 대해서,
      - answer 의 position letter와 guess 의 position letter가 일치하면,
         guess 에서 해당 letter들의 position들을 반환한다.
      - answer 에 guess 의 letter가 포함되면,
         guess 에서 해당 letter들의 position들을 반환한다.
      - answer 에 guess의 letter가 포함되지 않는다면
         guess 에서 해당 letter들의 position들을 반환한다.

   * 글자의 자리와 종류가 같을 때 해당 글자의 위치를 알려준다.
   * 글자의 종류는 맞는데 자리가 맞지 않을 때 글자의 위치를 알려준다.
   * 글자의 종류가 맞지 않을 때 글자의 위치를 알려준다.
3. 사용자의 guess가 맞을 때 정답과 같음을 알려준다.
4. 사용자의 guess가 도전 횟수안에 맞지 않으면 실패를 알려준다. 

### 용어정리
word: 5글자로 이루어진 시스템에 등록된 단어
answer: 5글자로 이루어진 정답 단어
guess: 사용자의 추측
letter: 한 글자
position: word의 자리

guess의 postion과 answer의 postion이 일치하면 그 position을 알려준다.
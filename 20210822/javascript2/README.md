# 문제 2

## 구하는 것
'성적' 표

## 주어진 것
'과목' 과 '성적' 이 담긴 문자열 배열 - grades

## 조건
### 성적표를 표기하는 방식
- 가장 좋은 성적만 반영
- 수강한 순서 반영


그렙 채용 챌린지 - 개발 직군 코딩 테스트 for 김덕수
메시지 보관함
도움말
JavaScript 레퍼런스
컴파일 옵션
테스트 종료
프로그래밍1
100 / 100.0
 
프로그래밍2
100 / 100.0
 
프로그래밍3
- / 100.0
 
SQL1
- / 100.0
문제 설명
수강 내역(학정번호, 성적)이 주어졌을 때, 이를 깔끔하게 정리한 성적표를 구하려고 합니다. 아래는 민수의 수강 내역 중에서, 반복 수강으로 삭제된 과목들을 취소선으로 표시한 것입니다.

<수강 내역>

학정번호	성적
DS7651	A0
CA0055	D+
AI5543	C0
OS1808	B-
DS7651	B+
AI0001	F
DB0001	B-
AI5543	D+
DS7651	A+
OS1808	B-
성적은 아래에 나열된 13가지 중 하나로 표기됩니다.
A+, A0, A-, B+, B0, B-, C+, C0, C-, D+, D0, D-, F
나열된 순서대로 A+이 가장 좋은 학점이며, F가 가장 나쁜 학점입니다.
과목들은 학정번호 6자리 (알파벳 2 글자+숫자 4글자)로 구분됩니다.
학정 번호 6자리가 완전히 똑같아야 동일한 과목입니다.
3번째로 수강한 AI5543과 6번째로 수강한 AI0001은 서로 다른 과목입니다.
동일한 과목을 여러 번 수강한 경우에는 가장 좋은 성적만 인정되고, 나머지는 삭제됩니다.
DS7651은 3번 수강했으나, A+받은 것만 인정되었습니다.
가장 좋은 성적이 여러 개라면, 그중에서 가장 먼저 수강한것만 인정되고, 나머지는 삭제됩니다.
표에서 윗행에 나타난 것이 먼저 수강한 것입니다.
OS1808은 두 번 수강하여 두 번 모두 B-를 받았으나, 처음 수강한 것만 인정되고, 나머지는 삭제되었습니다.
위의 표를 정리하여, 삭제된 과목들을 제외하고 좋은 성적을 받은 과목부터 나열하면 다음과 같습니다. (성적이 같다면, 먼저 수강한 과목부터 나열하도록 합니다.)

<정리된 성적표>

학정번호	성적
DS7651	A+
OS1808	B-
DB0001	B-
AI5543	C0
CA0055	D+
AI0001	F
민수가 수강한 과목들과 성적이 담긴 문자열 배열 grades가 매개변수로 주어집니다. 이때, 문제에서 명시한 대로 정리된 성적표를 구해서 return 하도록 solution 함수를 완성해주세요.

제한사항
grades의 길이(=수강한 내역의 개수)는 1 이상 50,000 이하입니다.
grades에는 먼저 수강한 내역부터 차례대로 담겨져 있습니다.
grades의 각 원소는 길이가 8 또는 9인 문자열입니다.
grades의 각 원소는 "학정번호 성적" 형식입니다.
학정번호와 성적은 하나의 공백(스페이스)으로 구분되어 있습니다.
학정번호는 6자리이며, 처음 2자리는 알파벳 대문자, 다음 4자리는 숫자로 구성되어 있습니다.
성적은 1자리 또는 2자리이며, A+부터 F까지의 13가지 성적 중 하나입니다.
잘못된 학정번호나 성적은 입력으로 주어지지 않습니다.
return 값 설명
정리된 성적표를 문자열 형태로 배열에 담아서 return 합니다.
좋은 성적을 받은 것부터 "학정번호 성적"을 담습니다.
성적이 같다면, 먼저 수강한 과목부터 담습니다.
입출력 예
grades	result
["DS7651 A0", "CA0055 D+", "AI5543 C0", "OS1808 B-", "DS7651 B+", "AI0001 F", "DB0001 B-", "AI5543 D+", "DS7651 A+", "OS1808 B-"]	["DS7651 A+", "OS1808 B-", "DB0001 B-", "AI5543 C0", "CA0055 D+", "AI0001 F"]
["DM0106 D-", "PL6677 B+", "DM0106 B+", "DM0106 B+", "PL6677 C0", "GP0000 A0"]	["GP0000 A0", "PL6677 B+", "DM0106 B+"]
입출력 예 설명
입출력 예 #1
문제 예시와 같습니다.

입출력 예 #2
삭제되는 수강 내역을 취소선으로 표시하면 아래와 같습니다.

<수강 내역>

학정번호	성적
DM0106	D-
PL6677	B+
DM0106	B+
DM0106	B+
PL6677	C0
GP0000	A0
위의 표에서 정리된 성적표를 구하면, 아래와 같습니다.

<정리된 성적표>

학정번호	성적
GP0000	A0
PL6677	B+
DM0106	B+
solution.js
1
function solution(grades) {
2
  const gradeTypes = [
3
    'A+', 'A0', 'A-',
4
    'B+', 'B0', 'B-',
5
    'C+', 'C0', 'C-',
6
    'D+', 'D0', 'D-',
7
    'F'];
8
​
9
  const gradeTable = Object.fromEntries(gradeTypes.map((score, i) => [score, 13 - i]));
10
​
11
  const scores = {};
12
​
13
  grades.forEach((grade, i) => {
14
    const [name, score] = grade.split(' ');
15
​
16
    if (!scores[name] || gradeTable[scores[name][0]] < gradeTable[score]) {
17
      scores[name] = [score, i];
18
    }
19
  });
20
​
21
  return Object.entries(scores)
22
    .sort(([, [, i1]], [, [, i2]]) => i1 - i2)
23
    .sort(([, [a1]], [, [a2]]) => gradeTable[a2] - gradeTable[a1])
24
    .map(([k, [a]]) => `${k} ${a}`);
25
}
실행 결과
실행 결과가 여기에 표시됩니다.
종료까지
01:46:33
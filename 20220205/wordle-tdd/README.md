# WORDLE TDD
WORDLE 게임을 TDD 로 만들어봅시다.
- play wordle: https://www.powerlanguage.co.uk/wordle/
- 참고: https://hackernoon.com/building-a-wordle-game-using-test-driven-development-in-25-minutes?source=rss

## 프로젝트 시작
### 언어 선택
- 어떤 언어를 선택해야 가장 쉽게 목표에 도달할까?
- 게임 주제가 낯선 관계로, 가장 부하가 적은 언어로 선택해야 불필요한 에너지 소모가 줄어든다. 
- 피드백을 받는 노력과 시간이 적으면 적을 수록 좋다.
- JavaScript 로 결정, SWC 를 이용해서 테스트 워칭 시간도 줄이는 것이 좋을 것 같다. 

### Node 프로젝트 시작
```bash
npm init -y
npm i --save-dev jest @types/jest 
```
### @swc/jest 설치
```bash
npm install --save-dev @swc/core @swc/jest
```
`jest.config.js`:
```javascript
module.exports = {
	transform: {
		'^.+\\.(t|j)sx?$': '@swc/jest',
	},
}
```

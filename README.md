# Daily Coding Dojo
매일 코딩 도장이 열립니다.

## 수련방법
```
해당날짜의 디렉토리를 만듭니다.
사용하고 싶은 언어로 환경설정 합니다.
풀고자하는 하는 문제를 README.md 에 적습니다.
열심히 코딩하고 커밋합니다.
반성을 적고 커밋합니다.
```

### README 템플릿

수련에 익숙해질때까지 템플릿을 충실하게 작성하도록 합니다.

```
문제제목
1. 구하는 것은 무엇인가
2. 주어진 것은 무엇인가
3. 조건은 무엇인가
4. 계획은 무엇인가
5. (풀고난후) 회고와 개선계획
```

## 수련장 설정
### Javascript - windows powershell
```
$date = Get-Date -Format "yyyyMMdd"
mkdir $date
cd $date
npm init -y
npm i jest @types/jest
echo node_modules > .gitignore
```
### Javascript - powershell + test script 'jest' 추가
```
$date = Get-Date -Format "yyyyMMdd"
mkdir $date
cd $date
npm init -y
npm i jest @types/jest eslint
echo node_modules > .gitignore
$jsonfile = './package.json'
$json = Get-Content $jsonfile | Out-String | ConvertFrom-Json
$json.scripts | Add-Member -Type NoteProperty -Name test -Value jest -Force
$json | ConvertTo-Json | Set-Content $jsonfile
echo '#풀어보자' > README.md 
npx eslint --init
```

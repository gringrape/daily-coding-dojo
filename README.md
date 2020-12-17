# Daily Coding Dojo

## How
Make folder with today date as name \
Write some code for solving today question \
Write README about how you solve it

## Commands
### Javascript - powershell
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
npm i jest @types/jest
echo node_modules > .gitignore
$jsonfile = './package.json'
$json = Get-Content $jsonfile | Out-String | ConvertFrom-Json
$json.scripts | Add-Member -Type NoteProperty -Name test -Value jest -Force
$json | ConvertTo-Json | Set-Content $jsonfile
echo '#풀어보자' > readme.md 
```

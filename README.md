# daily_coding_dojo_kds
## Javascript - powershell
```
$date = Get-Date -Format "yyyyMMdd"
mkdir $date
cd $date
npm init -y
npm i jest @types/jest
echo node_modules > .gitignore
```
## Javascript - powershell + test script 'jest' 추가
```
$date = Get-Date -Format "yyyyMMdd"
mkdir $date
cd $date
npm init -y
npm i jest @types/jest
echo node_modules > .gitignore
$jsonfile = './package.json'
$json = Get-Content $jsonfile | Out-String | ConvertFrom-Json
$json.scripts | Add-Member -Type NoteProperty -Name test -Value testtest -Force
$json | ConvertTo-Json | Set-Content $jsonfile
```

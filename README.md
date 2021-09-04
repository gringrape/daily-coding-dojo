# Daily Coding Dojo
새롭게 시작하는 코딩 도장

## 수련방법
```
1. 해당날짜의 디렉토리를 만듭니다.
2. 사용하고 싶은 언어로 환경설정 합니다.
3. 문제를 고릅니다. 
4. 풀고자하는 하는 문제의 정보를 README.md 에 적습니다.
```

## README 템플릿

```
문제제목
링크
1. 구하는 것
2. 주어진 것
3. 조건
4. 회고
```

## 환경설정

### scala
#### new project
```
sbt new scala/scalatest-example.g8
```
#### lint
project/plugins.sbt
```
addSbtPlugin("ch.epfl.scala" % "sbt-scalafix" % "0.9.8")
```
build.sbt
```
scalafixDependencies in ThisBuild += "org.scalalint" %% "rules" % "0.1.4"
```
#### run test
project root
```
sbt
~test
```

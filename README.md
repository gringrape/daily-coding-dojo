# Daily Coding Dojo
매일 테스트 주도 개발을 수련합시다.

## 수련방법
```
해당날짜의 디렉토리를 만듭니다.
사용하고 싶은 언어로 환경설정 합니다.
문제를 고릅니다. 
풀고자하는 하는 문제의 정보를 README.md 에 적습니다.
```

### README 템플릿

```
문제제목
링크
1. 구하는 것
2. 주어진 것
3. 조건
```

## scala
### new project
```
sbt new scala/scalatest-example.g8
```
### lint
project/plugins.sbt
```
addSbtPlugin("ch.epfl.scala" % "sbt-scalafix" % "0.9.8")
```
build.sbt
```
scalafixDependencies in ThisBuild += "org.scalalint" %% "rules" % "0.1.4"
```
### run test
project root
```
sbt
~test
```
## 목표
- 단순한 http 요청을 처리하는 HTTP server 만들기
- akka http 이용
- https://doc.akka.io/docs/akka-http/current/introduction.html#philosophy

## 프로젝트 셋업
- scala test 를 이용한다. 

템플릿을 활용하자.
왜냐하면 되는 상태를 빠르게 만들고, 리팩토링 하기 위해서다.
굳이 목적에 맞지 않는 복잡성을 추가할 필요가 없다.

단, 환경에 대한 지배력이 떨어지는 문제가 있는데,
이것은 리팩토링 하면서 보완하도록 하자.

```
sbt new akka/akka-http-quickstart-scala.g8
```

템플릿에 통제 할 수 없는 요소가 많아서,
그냥 처음 부터 하는게 낫겠다.
설정 파일만 참고.

```
lazy val root = (project in file(".")).
  settings(
    inThisBuild(List(
      organization    := "com.gringrape",
      scalaVersion    := "2.13.8"
    )),
    name := "greeting",
    libraryDependencies ++= Seq(
      "com.typesafe.akka" %% "akka-http"                % akkaHttpVersion,
      "com.typesafe.akka" %% "akka-http-spray-json"     % akkaHttpVersion,
      "com.typesafe.akka" %% "akka-actor-typed"         % akkaVersion,
      "com.typesafe.akka" %% "akka-stream"              % akkaVersion,
      "ch.qos.logback"    % "logback-classic"           % "1.2.3",

      "com.typesafe.akka" %% "akka-http-testkit"        % akkaHttpVersion % Test,
      "com.typesafe.akka" %% "akka-actor-testkit-typed" % akkaVersion     % Test,
      "org.scalatest"     %% "scalatest"                % "3.1.4"         % Test
    )
  )
```

scalaTest 의 설정파일을 이용하자.

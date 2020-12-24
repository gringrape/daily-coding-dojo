 lazy val root = (project in file(".")).
   settings(
     inThisBuild(List(
       organization := "ch.epfl.scala",
       scalaVersion := "2.13.3"
     )),
     name := "hello-world"
   )

 libraryDependencies += "org.scalatest" %% "scalatest" % "3.2.2" % Test

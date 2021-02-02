lazy val root = (project in file(".")).settings(
  inThisBuild(
    List(
      organization := "com.gringrape",
      scalaVersion := "2.13.3"
    )
  ),
  name := "example"
)

libraryDependencies += "org.scalatest" %% "scalatest" % "3.2.2" % Test
logBuffered in Test := false

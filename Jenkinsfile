pipeline {
  agent {
    node {
      label "webpack4"
    }
  } 
  environment {
    ROOT = "/data/dist/webpack-react"
  }
  stages {
    stage('Hello') {
        steps {
          echo 'Hello World'
        }
    }
  }
}
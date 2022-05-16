pipeline {
  agent any 
  environment {
    ROOT = "/data/dist/webpack-react"
  }
  stages {
    stage('Hello') {
        steps {
            echo 'Hello World'
            echo ${ROOT}
            pwd
        }
    }
  }
}
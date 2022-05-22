pipeline {
  agent none 
  environment {
    ROOT = "/data/dist/webpack-react"
  }
  stages {
    stage('Hello') {
        steps {
          echo 'Hello World'
          sh '''
            cd ${ROOT}
            pwd
          '''
        }
    }
  }
}
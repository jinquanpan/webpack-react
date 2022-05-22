pipeline {
  agent none 
  environment {
    ROOT = "/data"
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
pipeline {
  agent {
    node webpack4
  } 
  environment {
    ROOT = "/data/dist"
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
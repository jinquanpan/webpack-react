pipeline {
  agent any 
  environment {
    ROOT = "/data/dist/webpack-react"
  }
  stages {
    stage('git') {
      steps {
        sh '''
          cd ${ROOT}
          pwd
        '''
      }
    }
  }
}
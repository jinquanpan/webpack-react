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
          git checkout webpack4 && git pull origin webpack4
        '''
      }
    }
    stage('Build') {
      steps {
        sh '''
          cd ${ROOT}
          git checkout webpack4 && npm run build
        '''
      }
    }
  }
}
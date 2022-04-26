pipeline {
  agent any 
  environment {
    ROOT = "/var/lib/jenkins/workspace/webpack-react"
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
          npm run build
        '''
      }
    }
  }
}
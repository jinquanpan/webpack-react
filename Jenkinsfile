pipeline {
  agent any 
  environment {
    ROOT = "/var/lib/jenkins/workspace"
  }
  stages {
    stage('git') {
      steps {
        sh '''
          cd ${ROOT}
          git checkout dev && git pull origin dev
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
pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                sh 'echo "Hello World"'
                sh '''
                    cd /data/dist/webpack-react
                    echo "Multiline shell steps works too"
                    ls -lah
                    pwd
                '''
            }
        }
    }
}
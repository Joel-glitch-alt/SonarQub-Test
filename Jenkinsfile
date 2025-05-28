pipeline {
    agent any

    environment {
        SCANNER_HOME = tool 'sonar-scanner' 
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('Jenkins-sonar-server') {
                    sh "${SCANNER_HOME}/bin/sonar-scanner " +
                       "-Dsonar.projectKey=New-project-key " +
                       "-Dsonar.projectName=New-project-key " +
                       "-Dsonar.sources=. " +
                       "-Dsonar.sourceEncoding=UTF-8"
                }
            }
        }

        stage('Quality Gate') {
            steps {
                timeout(time: 1, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }
    }

    post {
        failure {
            echo '❌ SonarQube analysis failed!'
        }
        success {
            echo '✅ SonarQube analysis passed!'
        }
    }
}

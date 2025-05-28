pipeline {
    agent any

    tools {
        // This ensures the sonar-scanner is automatically installed
        sonarQubeScanner 'sonar-scanner'
    }

    environment {
        // Reference the installed tool
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
                    sh """
                        ${SCANNER_HOME}/bin/sonar-scanner \
                            -Dsonar.projectKey=New-project-key \
                            -Dsonar.projectName=New-project-key \
                            -Dsonar.sources=. \
                            -Dsonar.sourceEncoding=UTF-8
                    """
                }
            }
        }

        stage('Quality Gate') {
            steps {
                timeout(time: 5, unit: 'MINUTES') {  // Increased timeout
                    waitForQualityGate abortPipeline: true
                }
            }
        }
    }

    post {
        always {
            echo 'SonarQube analysis completed'
        }
        failure {
            echo '❌ SonarQube analysis failed!'
        }
        success {
            echo '✅ SonarQube analysis passed successfully!'
        }
    }
}
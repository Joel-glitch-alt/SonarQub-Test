pipeline {
    agent any

    environment {
        SONAR_SCANNER_HOME = tool 'sonar-scanner' // Make sure you configured this in Jenkins -> Global Tool Configuration
    }

    stages {
        stage('Checkout Code') {
            steps {
                git url: 'https://github.com/Joel-glitch-alt/your-new-project.git', branch: 'master'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('Jenkins-sonar-server') { // Match your Jenkins SonarQube server config name
                    sh """
                        ${SONAR_SCANNER_HOME}/bin/sonar-scanner \
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
                timeout(time: 5, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }
    }

    post {
        success {
            echo '✅ SonarQube analysis passed!'
        }
        failure {
            echo '❌ SonarQube analysis failed!'
        }
    }
}

pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('Jenkins-sonar-server') {
                    script {
                        // Get the Sonar Scanner installation path
                        def scannerHome = tool 'SonarQubeScanner'
                        // Run the sonar-scanner command
                        sh "${scannerHome}/bin/sonar-scanner -Dsonar.projectKey=New-project-key -Dsonar.projectName=New-project-key -Dsonar.sources=. -Dsonar.sourceEncoding=UTF-8"
                    }
                }
            }
        }
    }
}

pipeline {
    agent any
    
    tools {
        sonarQubeScanner 'sonar-scanner'  // Matches your scanner tool name
    }
    
    stages {
        stage('Hello') {
            steps {
                echo 'Hello World'
            }
        }
        
        stage('SonarQube Analysis') {
            steps {
                // Using your verified server name
                withSonarQubeEnv('Jenkins-sonar-server') {
                    def scannerHome = tool 'sonar-scanner'
                    sh """
                        ${scannerHome}/bin/sonar-scanner \
                            -Dsonar.projectKey=new-project-key \
                            -Dsonar.projectName="New Html Project" \
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
        always {
            echo 'Pipeline completed. See SonarQube dashboard for details.'
        }
        failure {
            echo '❌ SonarQube analysis failed! Check the scanner logs.'
        }
    }
}
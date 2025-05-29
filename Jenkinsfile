// pipeline {
//     agent any

//     stages {
//         stage('Hello') {
//             steps {
//                 echo 'Hello World'
//             }
//         }

//         stage('SonarQube Analysis') {
//             steps {
//                 withSonarQubeEnv('Jenkins-sonar-server') {
//                     script {
//                         def scannerHome = tool name: 'sonar-scanner', type: 'hudson.plugins.sonar.SonarRunnerInstallation'
//                         sh """
//                             ${scannerHome}/bin/sonar-scanner \
//                                 -Dsonar.projectKey=my-sonar-test \
//                                 -Dsonar.projectName="My Sonar Test" \
//                                 -Dsonar.sources=. \
//                                 -Dsonar.sourceEncoding=UTF-8
//                         """
//                     }
//                 }
//             }
//         }

//         stage('Quality Gate') {
//             steps {
//                 timeout(time: 20, unit: 'MINUTES') {
//                     waitForQualityGate abortPipeline: true
//                 }
//             }
//         }
//     }

//     post {
//         always {
//             echo 'Pipeline completed. See SonarQube dashboard for details.'
//         }
//         failure {
//             echo '❌ SonarQube analysis failed! Check the scanner logs.'
//         }
//     }
// }


// Uisng Quality Gate Plugin
pipeline {
    agent any

    tools {
        // Remove this if you installed sonar-scanner manually
        // Or replace 'sonar-scanner' with a real tool name
    }

    environment {
        PATH = "${tool 'sonar-scanner'}/bin:${env.PATH}"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh '''
                    python3 -m venv venv
                    . venv/bin/activate
                    pip install -r requirements.txt
                    pip install pytest pytest-cov

                    npm install
                '''
            }
        }

        stage('Run Tests and Coverage') {
            steps {
                sh '''
                    . venv/bin/activate
                    pytest --cov=. --cov-report=xml

                    npx jest --coverage
                '''
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('Jenkins-sonar-server') {
                    sh '''
                        sonar-scanner \
                          -Dsonar.projectKey=my-sonar-test \
                          -Dsonar.projectName="My Sonar Test" \
                          -Dsonar.sources=. \
                          -Dsonar.python.coverage.reportPaths=coverage.xml \
                          -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info \
                          -Dsonar.sourceEncoding=UTF-8
                    '''
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
            echo 'Pipeline completed. See SonarQube dashboard for results.'
        }
        failure {
            echo '❌ Pipeline failed. Check logs.'
        }
    }
}


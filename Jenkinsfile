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
        nodejs "NodeJS_18" // Match your Jenkins NodeJS tool installation name
        // Assuming sonar-scanner tool configured as "sonar-scanner"
    }

    environment {
        PATH = "${tool('sonar-scanner')}/bin:${env.PATH}"
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
                  npm install
                  chmod +x ./node_modules/.bin/jest
                '''
            }
        }

        stage('Run Tests and Coverage') {
            steps {
                sh 'npm test'
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




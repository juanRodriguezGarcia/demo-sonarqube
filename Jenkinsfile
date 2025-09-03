pipeline {
    agent {
        dockerfile {
            filename 'Dockerfile'
            args '-v /var/run/docker.sock:/var/run/docker.sock'
        }
    }
    
    environment {
        SONAR_URL = 'http://host.docker.internal:9000'
        PROJECT_KEY = 'proyecname'
        PROJECT_NAME = 'proyecname'
        SONAR_TOKEN = credentials('sonar-token')
    }
    
    parameters {
        choice(
            name: 'BRANCH_SELECTION',
            choices: ['main', 'develop'],
            description: '¿Desde qué rama quieres ejecutar el análisis?'
        )
    }
    
    stages {
        stage('Checkout') {
            steps {
                script {
                    def currentBranch = env.GIT_BRANCH ?: 'main'
                    echo "Rama actual detectada: ${currentBranch}"
                    
                    if (params.BRANCH_SELECTION) {
                        checkout scm: [
                            $class: 'GitSCM',
                            branches: [[name: "*/${params.BRANCH_SELECTION}"]],
                            userRemoteConfigs: scm.userRemoteConfigs
                        ]
                        echo "Cambiado a rama: ${params.BRANCH_SELECTION}"
                    }
                }
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        
        stage('Run Tests') {
            steps {
                sh 'npm run test:coverage'
            }
        }
        
        stage('Start Application') {
            steps {
                sh 'timeout 5 npm start || true'
            }
        }
        
        stage('SonarQube Analysis') {
            steps {
                sh """
                    sonar-scanner \
                        -Dsonar.projectKey=${PROJECT_KEY} \
                        -Dsonar.projectName=${PROJECT_NAME} \
                        -Dsonar.sources=src \
                        -Dsonar.exclusions=**/node_modules/**,**/coverage/**,**/*.test.js \
                        -Dsonar.inclusions=**/*.js \
                        -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info \
                        -Dsonar.testExecutionReportPaths=coverage/test-report.xml \
                        -Dsonar.coverage.exclusions=**/*.test.js,**/*.spec.js \
                        -Dsonar.host.url=${SONAR_URL} \
                        -Dsonar.login=${SONAR_TOKEN}
                """
            }
        }
        
        stage('Quality Gate') {
            steps {
                script {
                    sleep(10)
                    sh """
                        curl -u ${SONAR_TOKEN}: \
                        "${SONAR_URL}/api/qualitygates/project_status?projectKey=${PROJECT_KEY}" \
                        -o qg_result.json
                    """
                    
                    def qgResult = readJSON file: 'qg_result.json'
                    def status = qgResult.projectStatus.status
                    
                    if (status != 'OK') {
                        echo "❌ FALLÓ: Quality Gate status: ${status}"
                        currentBuild.result = 'FAILURE'
                        error("Quality Gate falló: ${status}")
                    } else {
                        echo "✅ PASÓ: Quality Gate exitoso"
                    }
                }
            }
        }
    }
    
    post {
        always {
            script {
                echo "=== RESUMEN DEL ANÁLISIS ==="
                echo "Proyecto: ${PROJECT_NAME}"
                echo "Rama analizada: ${params.BRANCH_SELECTION ?: env.GIT_BRANCH}"
                echo "URL SonarQube: ${SONAR_URL}/dashboard?id=${PROJECT_KEY}"
                
                if (currentBuild.result == 'FAILURE') {
                    echo "Estado: ❌ FALLÓ - Revisa los issues en SonarQube"
                } else {
                    echo "Estado: ✅ PASÓ - Código cumple con los estándares de calidad"
                }
            }
        }
    }
}
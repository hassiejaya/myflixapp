pipeline{
    agent any
    options {
        buildDiscarder(logRotator(numToKeepStr: '5'))
    }
    environment {
        DOCKERHUB_CREDENTIALS = credentials('assignmentlk-dockerhub')
    }
    stages{
        stage('Build-ui'){
            steps{
                dir('/myflix-ui'){
                    script{
                        dockerImage = docker.build("myflix-ui-img")
                    }
                }
            }
        }
        stage('Build-api'){
            steps{
                dir('/myflix-api'){
                    script{
                        dockerImage = docker.build("myflix-api-img")
                    }
                }
            }
        }
        stage('Login'){
            steps{
                sh 'echo $DOCKERHUB-CREDENTIALS-PW | docker login -u $DOCKERHUB-CREDENTIALS-USR --password-stdin'
            }
        }
         stage('Push-ui'){
            steps{
                sh 'docker push myflix-ui-img'
            }
        }
        stage('Push-api'){
            steps{
                sh 'docker push myflix-api-img'
            }
        }
    }
    post{
        always {
            sh 'docker logout'
        }
    }
}

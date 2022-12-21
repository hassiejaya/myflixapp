pipeline{
    agent any
    options {
        buildDiscarder(logRotator(numToKeepStr: '5'))
    }
    environment {
        DOCKERHUB_CREDENTIALS = credentials('assignmentlk-dockerhub')
    }
    stages{
        stage('Build'){
            steps{
                dir('/myflix-ui'){
                    script{
                        dockerImage = docker.build("myflix-ui-img")
                    }
                }
            }
        }
  
        stage('Login'){
            steps{
                sh 'echo $DOCKERHUB-CREDENTIALS-PW | docker login -u $DOCKERHUB-CREDENTIALS-USR --password-stdin'
            }
        }
         stage('Push'){
            steps{
                sh 'docker push myflix-ui-img'
            }
        }
    
    }
   
}

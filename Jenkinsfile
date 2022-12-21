pipeline{

	agent any

	environment {
		DOCKERHUB_CREDENTIALS=credentials('assignmentlk-dockerhub')
	}

	stages {
	    
	    stage('gitclone') {

			steps {
				git 'https://github.com/hassiejaya/myflix-ui.git'
			}
		}

		stage('Build-ui') {

			steps {
				bat 'docker build -t assignmentlk/myflix:latest ./myflix-ui'
			}
		}
        stage('Build-api') {

			steps {
				bat 'docker build -t assignmentlk/myflix:latest ./myflix-api'
			}
		}

		stage('Login') {

			steps {
				bat 'docker login --username assignmentlk --password assignment.lk'
			}
		}

		stage('Push-ui') {

			steps {
				bat 'docker push assignmentlk/myflix-ui:latest'
			}
		}
        stage('Push-api') {

			steps {
				bat 'docker push assignmentlk/myflix-api:latest'
			}
		}
	}

	post {
		always {
			bat 'docker logout'
		}
	}

}

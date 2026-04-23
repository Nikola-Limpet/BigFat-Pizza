# Required GitHub Secrets

Go to your GitHub repository → Settings → Secrets and variables → Actions → New repository secret

Add the following secrets:

## Docker Hub
- `DOCKERHUB_USERNAME` - Your Docker Hub username
- `DOCKERHUB_TOKEN` - Your Docker Hub access token (create at https://hub.docker.com/settings/security)

## AWS
- `AWS_ACCESS_KEY_ID` - Your AWS access key
- `AWS_SECRET_ACCESS_KEY` - Your AWS secret key
- `AWS_REGION` - e.g., us-east-1
- `EC2_PUBLIC_IP` - The Elastic IP from Terraform output
- `EC2_SSH_KEY` - The full content of your private SSH key (e.g., ~/.ssh/id_rsa)

## SonarCloud (Free for public repos)
- `SONAR_TOKEN` - From https://sonarcloud.io/account/security/

## Optional
- `GRAFANA_ADMIN_PASSWORD` - If you want a custom Grafana password

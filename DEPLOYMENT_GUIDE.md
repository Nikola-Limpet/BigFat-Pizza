# BigFat Pizza - Complete CI/CD Deployment Guide

A step-by-step guide to deploying the BigFat Pizza MERN stack application with GitHub Actions CI/CD, Terraform AWS EC2 provisioning, SonarQube, Trivy, and Prometheus/Grafana monitoring.

---

## Table of Contents

1. [Prerequisites](#1-prerequisites)
2. [Quick Start with CLI](#2-quick-start-with-cli-recommended)
3. [Project Overview](#3-project-overview)
4. [Repository Setup](#4-repository-setup)
5. [Configure External Services](#5-configure-external-services)
6. [Configure GitHub Secrets](#6-configure-github-secrets)
7. [Provision Infrastructure with Terraform](#7-provision-infrastructure-with-terraform)
8. [Trigger CI/CD Pipeline](#8-trigger-cicd-pipeline)
9. [Access Deployed Application](#9-access-deployed-application)
10. [Monitoring & Dashboards](#10-monitoring--dashboards)
11. [Screenshot Checklist for Assignment](#11-screenshot-checklist-for-assignment)
12. [Troubleshooting](#12-troubleshooting)

---

## 1. Prerequisites

### Required Tools

| Tool | Version | Download |
|------|---------|----------|
| Git | 2.x | [git-scm.com](https://git-scm.com) |
| Docker | 24.x+ | [docker.com](https://docs.docker.com/get-docker) |
| Docker Compose | 2.x | Included with Docker Desktop |
| Terraform | 1.2+ | [terraform.io](https://developer.hashicorp.com/terraform/downloads) |
| AWS CLI | 2.x | [aws.amazon.com/cli](https://aws.amazon.com/cli/) |
| Node.js | 18.x | [nodejs.org](https://nodejs.org) |

### Required Accounts

- [GitHub](https://github.com) account
- [Docker Hub](https://hub.docker.com) account
- [AWS](https://aws.amazon.com) account with IAM access
- [SonarCloud](https://sonarcloud.io) account (free for public repos)

---

## 2. Quick Start with CLI (Recommended)

We provide automated CLI scripts to set up everything:

### Option A: Quick Environment Setup
```bash
cd scripts
./quick-env-setup.sh
```
This interactive script will:
- Collect all required credentials
- Set GitHub Secrets automatically
- Generate secure `.env` file with random passwords
- Show you what's left to do

### Option B: Full Automated Setup
```bash
cd scripts
./setup-env-cli.sh --full
```
This comprehensive script handles:
- Prerequisites check
- GitHub & AWS authentication
- Docker Hub login
- SonarCloud configuration
- SSH key generation
- Terraform infrastructure creation
- GitHub Secrets deployment
- Application deployment
- Verification

### Option C: Interactive Menu
```bash
cd scripts
./setup-env-cli.sh
```
Choose individual steps from the menu.

---

## 3. Project Overview

### Architecture Diagram

```
Developer Laptop
       |
       v
   GitHub Repo
       |
       | Pull Request
       v
  GitHub Actions CI/CD
  |-------------------|
  | Tests (Jest)      |
  | SonarQube Scan    |
  | Trivy Scan        |
  | Quality Gate      |
  | Build Images      |
  | Push to DockerHub |
  | Deploy to EC2     |
  |-------------------|
       |
       v
   AWS EC2 Instance
  |-------------------|
  | Nginx (Port 80)   |
  | Frontend (React)  |
  | Backend (Node.js) |
  | MongoDB           |
  | Prometheus (9090) |
  | Grafana (3000)    |
  |-------------------|
```

### Services & Ports

| Service | Port | Description |
|---------|------|-------------|
| Nginx | 80 | Reverse proxy, main entry point |
| Frontend | 5173 | React application (internal) |
| Backend | 8080 | Node.js API (internal) |
| MongoDB | 27017 | Database (internal) |
| Prometheus | 9090 | Metrics collection |
| Grafana | 3000 | Monitoring dashboards |

---

## 4. Repository Setup

### 3.1 Clone the Repository

```bash
git clone https://github.com/yourusername/BigFat-Pizza.git
cd BigFat-Pizza
```

### 3.2 Verify Project Structure

```
BigFat-Pizza/
├── .github/
│   ├── workflows/
│   │   ├── ci-cd.yml              # Main CI/CD pipeline
│   │   ├── manual_deploy.yml      # Manual deployment trigger
│   │   └── quality-gate-demo.yml  # Demo for failed quality gate
│   └── SECRETS.md                 # Secrets reference
├── backend/
│   ├── Dockerfile
│   ├── package.json
│   └── tests/
├── front-end/
│   ├── Dockerfile
│   └── package.json
├── nginx/
│   ├── Dockerfile
│   └── nginx.conf
├── terraform/
│   ├── main.tf
│   ├── variables.tf
│   ├── outputs.tf
│   └── user-data.sh
├── monitoring/
│   ├── prometheus/
│   │   └── prometheus.yml
│   └── grafana/
│       └── provisioning/
├── docker-compose.yml             # Local development
├── docker-compose.prod.yml        # Production deployment
├── sonar-project.properties       # SonarCloud configuration
└── README.md
```

### 3.3 Set Up Environment Files

```bash
# Copy example env file
cp .env.example .env

# Edit .env with your values
nano .env
```

Fill in these values:
```env
# MongoDB
MONGO_USER=admin
MONGO_PASSWORD=YourStrongPassword123

# JWT Secret (generate a random string)
JWT_SECRET=your-super-secret-jwt-key-here

# CORS / URLs (update after getting EC2 IP)
CORS_ORIGIN=http://your-ec2-public-ip
VITE_API_URL=http://your-ec2-public-ip/api

# Docker Hub
DOCKERHUB_USERNAME=your_dockerhub_username

# AWS
EC2_PUBLIC_IP=your-ec2-public-ip
AWS_REGION=us-east-1

# Grafana
GRAFANA_ADMIN_USER=admin
GRAFANA_ADMIN_PASSWORD=YourSecurePassword123
```

### 3.4 Test Locally (Optional)

```bash
# Start all services locally
docker-compose up --build

# Access:
# Frontend: http://localhost:5173
# Backend API: http://localhost:8080
# Health Check: http://localhost:8080/api/health
```

---

## 5. Configure External Services

### 4.1 Docker Hub

1. Go to [hub.docker.com](https://hub.docker.com)
2. Sign in or create account
3. Go to **Account Settings → Security → New Access Token**
4. Name it `bigfat-pizza-cicd`
5. Copy the token (you'll need it for `DOCKERHUB_TOKEN`)

### 4.2 SonarCloud

1. Go to [sonarcloud.io](https://sonarcloud.io)
2. Click **Log in with GitHub**
3. Click **+** (Add new project) → **Analyze new project**
4. Select your `BigFat-Pizza` repository
5. Choose **Free plan** (for public repos)
6. Note down:
   - **Project Key** (e.g., `yuujin12_BigFat-Pizza`)
   - **Organization** (e.g., `yuujin12`)
7. Update `sonar-project.properties`:
   ```properties
   sonar.projectKey=YOUR_PROJECT_KEY
   sonar.organization=YOUR_ORGANIZATION
   ```
8. Go to **My Account → Security → Generate Tokens**
9. Name it `github-actions`, copy token (for `SONAR_TOKEN`)

### 4.3 AWS IAM User

1. Go to [AWS Console → IAM](https://console.aws.amazon.com/iam/)
2. Click **Users → Create user**
3. User name: `bigfat-pizza-deployer`
4. Attach policies directly:
   - `AmazonEC2FullAccess`
   - `AmazonVPCFullAccess`
5. Click **Create user**
6. Go to user → **Security credentials → Create access key**
7. Choose **Command Line Interface (CLI)**
8. Copy **Access Key ID** and **Secret Access Key**

---

## 6. Configure GitHub Secrets

Navigate to your repository on GitHub:

```
Settings → Secrets and variables → Actions → New repository secret
```

Add these secrets one by one:

| # | Secret Name | Value | From |
|---|-------------|-------|------|
| 1 | `DOCKERHUB_USERNAME` | Your Docker Hub username | Docker Hub |
| 2 | `DOCKERHUB_TOKEN` | Docker Hub access token | Docker Hub |
| 3 | `AWS_ACCESS_KEY_ID` | AWS access key | AWS IAM |
| 4 | `AWS_SECRET_ACCESS_KEY` | AWS secret key | AWS IAM |
| 5 | `AWS_REGION` | `us-east-1` | Your preference |
| 6 | `SONAR_TOKEN` | SonarCloud token | SonarCloud |
| 7 | `EC2_PUBLIC_IP` | *Skip for now* | Terraform output |
| 8 | `EC2_SSH_KEY` | *Skip for now* | Your SSH key |

**Note:** You'll add `EC2_PUBLIC_IP` and `EC2_SSH_KEY` after running Terraform.

---

## 7. Provision Infrastructure with Terraform

### 6.1 Initialize Terraform

```bash
cd terraform
terraform init
```

### 6.2 Review the Plan

```bash
terraform plan -var="dockerhub_username=YOUR_DOCKERHUB_USERNAME"
```

Example output:
```
Plan: 8 to add, 0 to change, 0 to destroy.
```

### 6.3 Apply Infrastructure

```bash
terraform apply -var="dockerhub_username=YOUR_DOCKERHUB_USERNAME"
```

Type `yes` when prompted.

### 6.4 Save Outputs

After successful apply, you'll see:

```
Outputs:

ec2_public_ip = "54.123.45.67"
ec2_instance_id = "i-0abc123def456"
ssh_command = "ssh -i ~/.ssh/id_rsa ubuntu@54.123.45.67"
app_url = "http://54.123.45.67"
grafana_url = "http://54.123.45.67:3000"
prometheus_url = "http://54.123.45.67:9090"
```

**Copy the `ec2_public_ip` value.**

### 6.5 Add EC2 Secrets to GitHub

1. Go back to **GitHub → Settings → Secrets**
2. Add `EC2_PUBLIC_IP` with the value from Terraform output
3. Add `EC2_SSH_KEY`:
   ```bash
   cat ~/.ssh/id_rsa
   ```
   Copy the entire output (including `-----BEGIN OPENSSH PRIVATE KEY-----` and `-----END OPENSSH PRIVATE KEY-----`)

### 6.6 Verify EC2 Setup (Optional)

```bash
# SSH into the instance
ssh -i ~/.ssh/id_rsa ubuntu@YOUR_EC2_IP

# Check Docker installation
docker --version
docker-compose --version

# Exit
exit
```

---

CD/CD Pipeline

### 7.1 Push to Main Branch

```bash
cd /path/to/BigFat-Pizza

# Ensure you're on main branch
git checkout main

# Stage all changes
git add .

# Commit
git commit -m "feat: setup complete ci/cd pipeline with terraform and monitoring"

# Push
git push origin main
```

### 7.2 Monitor Pipeline Execution

Go to GitHub repository → **Actions** tab

You'll see the workflow `CI/CD Pipeline - Build, Scan, and Deploy` running.

**Pipeline stages:**

| Stage | Job Name | Status |
|-------|----------|--------|
| 1 | Run Tests | Should pass |
| 2 | SonarQube Scan | Should pass |
| 3 | Trivy Security Scan | Should pass |
| 4 | Quality Gate | Should pass |
| 5 | Build & Push Docker Images | Should push 3 images |
| 6 | Deploy to EC2 | Should deploy successfully |

**Total time:** ~5-10 minutes

### 7.3 Pipeline Flow Diagram

```
Push to main
    |
    v
+-------------------+
| 1. Run Tests      |
|    - Backend Jest |
|    - Frontend     |
|    Build          |
+--------+----------+
         |
         v
+-------------------+
| 2. SonarQube Scan |
|    - Code Quality |
|    - Coverage     |
+--------+----------+
         |
         v
+-------------------+
| 3. Trivy Scan     |
|    - FS Vuln      |
|    - CRITICAL/HIGH|
+--------+----------+
         |
         v
+-------------------+
| 4. Quality Gate   |
|    - Check Results|
|    - Fail = Stop  |
+--------+----------+
         |
         v
+-------------------+
| 5. Build & Push   |
|    - Frontend IMG |
|    - Backend IMG  |
|    - Nginx IMG    |
+--------+----------+
         |
         v
+-------------------+
| 6. Deploy to EC2  |
|    - SSH Connect  |
|    - Pull Images  |
|    - Restart      |
|    - Verify       |
+-------------------+
```

---

## 8. Access Deployed Application

### 8.1 Main Application

Open your browser:
```
http://YOUR_EC2_PUBLIC_IP
```

### 8.2 API Health Check

```bash
curl http://YOUR_EC2_PUBLIC_IP/api/health
```

Expected response:
```json
{
  "status": "ok",
  "message": "Server is running",
  "mongoDb": "connected",
  "environment": "production",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### 8.3 Verify Deployment on EC2

```bash
ssh -i ~/.ssh/id_rsa ubuntu@YOUR_EC2_IP

# Check running containers
docker ps

# Check logs
cd ~/bigfat-pizza
docker-compose -f docker-compose.prod.yml logs -f
```

---

## 9. Monitoring & Dashboards

### 9.1 Prometheus

URL: `http://YOUR_EC2_PUBLIC_IP:9090`

**Useful queries:**
```promql
# CPU Usage
100 - (avg by (instance) (irate(node_cpu_seconds_total{mode="idle"}[5m])) * 100)

# Memory Usage
100 * (1 - (node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes))

# Container CPU
rate(container_cpu_usage_seconds_total[5m])
```

### 9.2 Grafana

URL: `http://YOUR_EC2_PUBLIC_IP:3000`

**Default login:**
- Username: `admin`
- Password: `admin` (or your `GRAFANA_ADMIN_PASSWORD`)

**Pre-configured Dashboard:**
- Name: "BigFat Pizza - System Monitoring"
- Panels: CPU Usage, Memory Usage, Disk Available, Container CPU

### 9.3 Architecture

```
+---------------+     scrape      +------------------+
|  Prometheus   |<----------------|  Node Exporter   |
|   :9090       |                 |    :9100         |
+---------------+                 +------------------+
       ^
       | scrape
+---------------+                 +------------------+
|   cAdvisor    |<----------------|   Backend App    |
|   :8081       |                 |   :8080/metrics  |
+---------------+                 +------------------+
       |
       | query
       v
+---------------+
|    Grafana    |
|    :3000      |
+---------------+
```

---

## 10. Screenshot Checklist for Assignment

| ID | Screenshot | How to Capture | Status |
|----|-----------|----------------|--------|
| a | GitHub Branches & PR | GitHub → Pull requests tab | ☐ |
| b | Reviewer Approve | Open PR → Reviewers section | ☐ |
| c | Merge Conflict & Resolved | Create conflict → "Resolve conflicts" button → Fix & commit | ☐ |
| d | GitHub Actions Full Script | Open `.github/workflows/ci-cd.yml` in GitHub | ☐ |
| e | SonarQube Report | sonarcloud.io → Your project → Overview | ☐ |
| f | Trivy Scan Result | GitHub Actions → Artifacts → Download `trivy-scan-results` | ☐ |
| g | Quality Gate Fail | GitHub → Actions → Run `quality-gate-demo.yml` manually | ☐ |
| h | Terraform | Terminal: `terraform apply` output OR `terraform show` | ☐ |
| i | Continuous Deployment | GitHub Actions → `Deploy to EC2` job logs | ☐ |
| j | Pipeline Success | GitHub Actions → main branch → Green graph view | ☐ |
| k | App from Laptop | Browser: `http://YOUR_EC2_IP` | ☐ |
| l | Grafana Dashboard | Browser: `http://YOUR_EC2_IP:3000` → Dashboards | ☐ |

### How to Trigger Quality Gate Fail (Screenshot g)

```bash
# Go to GitHub Actions
# Click "CI/CD Pipeline (Quality Gate Fail Demo)"
# Click "Run workflow" → "Run workflow"
# This will intentionally fail if SonarQube or Trivy fails
# Screenshot the failed pipeline
```

---

## 11. Troubleshooting

### Docker Compose fails on EC2

```bash
# SSH into EC2
ssh -i ~/.ssh/id_rsa ubuntu@YOUR_EC2_IP

# Check Docker status
sudo systemctl status docker

# Check containers
docker ps -a

# View logs
cd ~/bigfat-pizza
docker-compose -f docker-compose.prod.yml logs

# Restart services
docker-compose -f docker-compose.prod.yml down
docker-compose -f docker-compose.prod.yml up -d
```

### MongoDB connection issues

```bash
# Check MongoDB container health
docker ps

# Check MongoDB logs
docker logs pizza-mongodb

# Verify env vars
cat ~/bigfat-pizza/.env.production
```

### Pipeline fails at Trivy

1. Check the artifact: GitHub Actions → Artifacts → `trivy-scan-results`
2. Download and view the SARIF file
3. Fix vulnerabilities or adjust severity in `.github/workflows/ci-cd.yml`:
   ```yaml
   severity: 'CRITICAL'  # Remove HIGH to be less strict
   ```

### Can't access Grafana/Prometheus

1. Verify security group allows ports 3000 and 9090:
   ```bash
   # In terraform folder
   terraform show | grep -A 10 "ingress"
   ```
2. Check containers are running:
   ```bash
   docker ps | grep -E "grafana|prometheus"
   ```

### SSH Connection Failed

```bash
# Verify key permissions
chmod 600 ~/.ssh/id_rsa

# Test connection
ssh -v -i ~/.ssh/id_rsa ubuntu@YOUR_EC2_IP

# Check security group allows port 22
aws ec2 describe-security-groups --group-ids YOUR_SG_ID
```

### Docker Hub Push Failed

1. Verify `DOCKERHUB_USERNAME` and `DOCKERHUB_TOKEN` secrets
2. Ensure token has **Write** permissions
3. Check if repositories exist on Docker Hub

---

## Quick Reference Commands

```bash
# Terraform
cd terraform
terraform init
terraform plan -var="dockerhub_username=USER"
terraform apply -var="dockerhub_username=USER"
terraform destroy  # To tear down infrastructure

# Docker (Local)
docker-compose up --build
docker-compose down

# Docker (Production on EC2)
docker-compose -f docker-compose.prod.yml up -d
docker-compose -f docker-compose.prod.yml down
docker-compose -f docker-compose.prod.yml logs -f

# Backend Tests
cd backend
npm test

# Frontend Build
cd front-end
npm run build
```

---

## Security Notes

- **Never commit `.env` or `.env.production` files**
- **Never commit SSH private keys**
- **Rotate Docker Hub tokens regularly**
- **Use strong passwords for MongoDB and Grafana**
- **Restrict EC2 security group ingress rules in production**

---

## Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Terraform AWS Provider](https://registry.terraform.io/providers/hashicorp/aws/latest/docs)
- [SonarCloud Documentation](https://docs.sonarcloud.io/)
- [Trivy Documentation](https://aquasecurity.github.io/trivy/)
- [Prometheus Documentation](https://prometheus.io/docs/)
- [Grafana Documentation](https://grafana.com/docs/)

---

**Good luck with your deployment! 🍕**

*Built for AUPP DevOps Course*

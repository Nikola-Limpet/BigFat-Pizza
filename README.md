# 🍕 BigFat Pizza - Full Stack Food Ordering Platform

A modern, feature-rich pizza ordering platform built with the MERN stack (MongoDB, Express.js, React, Node.js). This project demonstrates a complete end-to-end solution for online food ordering with real-time order tracking, secure payment processing, and a responsive user interface.

## 🚀 Complete CI/CD & DevOps Pipeline

This repository includes a full production-ready CI/CD pipeline with:

- **GitHub Actions** for Continuous Integration
- **SonarQube / SonarCloud** for Code Quality
- **Trivy** for Security Vulnerability Scanning
- **Docker** containerization for Frontend, Backend, and Nginx
- **Terraform** for AWS EC2 infrastructure provisioning
- **Prometheus & Grafana** for real-time monitoring
- **Continuous Deployment** to AWS EC2

## 📋 Project Flow

```
Developer → GitHub → Pull Request → Code Review → Merge Conflict Resolution
    → Merge to Main → GitHub Actions CI → SonarQube Scan → Trivy Security Scan
    → Build Docker Images → Push to Docker Hub → Terraform EC2 Provisioning
    → Deploy to EC2 → Access from Laptop → Prometheus Metrics → Grafana Dashboard
```

## 🏗️ Architecture

```
┌─────────────┐     ┌─────────────┐     ┌─────────────────┐
│   Laptop    │────▶│  AWS EC2    │────▶│   Nginx (80)    │
│  (Browser)  │     │  (Ubuntu)   │     └────────┬────────┘
└─────────────┘     │             │              │
                    │  Docker     │     ┌────────┴────────┐
                    │  Compose    │     │                 │
                    │             │  ┌──▼───┐      ┌─────▼────┐
                    │  Services:  │  │Frontend│      │ Backend  │
                    │  - MongoDB  │  │:5173   │      │ :8080    │
                    │  - Prometheus│  └───────┘      └────┬─────┘
                    │  - Grafana  │                        │
                    │  - cAdvisor │                   ┌────▼────┐
                    │  - Node Exp │                   │ MongoDB │
                    └─────────────┘                   │ :27017  │
                                                      └─────────┘
```

## 🛠️ Prerequisites

- [Docker](https://docs.docker.com/get-docker/) & Docker Compose
- [Terraform](https://developer.hashicorp.com/terraform/downloads) (v1.2+)
- [AWS CLI](https://aws.amazon.com/cli/) (configured with credentials)
- [GitHub](https://github.com) account
- [Docker Hub](https://hub.docker.com) account
- [SonarCloud](https://sonarcloud.io) account (free for public repos)

## 📁 Repository Structure

```
BigFat-Pizza/
├── .github/
│   ├── workflows/
│   │   ├── ci-cd.yml              # Main CI/CD pipeline
│   │   ├── quality-gate-demo.yml  # Quality gate failure demo
│   │   └── manual_deploy.yml      # Manual deployment trigger
│   └── SECRETS.md                 # Required GitHub secrets guide
├── backend/                       # Node.js Express API
│   ├── Dockerfile
│   ├── tests/
│   └── ...
├── front-end/                     # React + Vite Frontend
│   └── Dockerfile
├── nginx/                         # Reverse Proxy
│   ├── Dockerfile
│   └── nginx.conf
├── terraform/                     # Infrastructure as Code
│   ├── main.tf
│   ├── variables.tf
│   ├── outputs.tf
│   └── user-data.sh
├── monitoring/                    # Prometheus & Grafana configs
│   ├── prometheus/
│   │   └── prometheus.yml
│   └── grafana/
│       └── provisioning/
├── scripts/                       # Deployment helpers
│   ├── setup-ec2.sh
│   └── deploy.sh
├── docker-compose.yml             # Local development
├── docker-compose.prod.yml        # Production deployment
├── sonar-project.properties       # SonarCloud configuration
└── README.md
```

## 🔐 Required GitHub Secrets

Navigate to: **Repository → Settings → Secrets and variables → Actions**

| Secret | Description |
|--------|-------------|
| `DOCKERHUB_USERNAME` | Your Docker Hub username |
| `DOCKERHUB_TOKEN` | Docker Hub access token |
| `AWS_ACCESS_KEY_ID` | AWS IAM access key |
| `AWS_SECRET_ACCESS_KEY` | AWS IAM secret key |
| `AWS_REGION` | e.g., `us-east-1` |
| `EC2_PUBLIC_IP` | Elastic IP from Terraform output |
| `EC2_SSH_KEY` | Full content of `~/.ssh/id_rsa` |
| `SONAR_TOKEN` | From [sonarcloud.io](https://sonarcloud.io) |

## 🚀 Step-by-Step Deployment Guide

### 1. Local Development

```bash
# Clone repository
git clone https://github.com/yourusername/BigFat-Pizza.git
cd BigFat-Pizza

# Start locally
docker-compose up --build

# Access:
# Frontend: http://localhost:5173
# Backend:  http://localhost:8080
# API Health: http://localhost:8080/api/health
```

### 2. Infrastructure Setup (Terraform)

```bash
cd terraform

# Initialize Terraform
terraform init

# Review the plan
terraform plan -var="dockerhub_username=YOUR_DOCKERHUB_USER"

# Apply (creates EC2, VPC, Security Group, Elastic IP)
terraform apply -var="dockerhub_username=YOUR_DOCKERHUB_USER"

# Save the outputs (you'll need the Elastic IP for GitHub secrets)
terraform output ec2_public_ip
```

**What Terraform creates:**
- VPC with public subnet
- Internet Gateway & Route Table
- Security Group (ports: 22, 80, 443, 3000, 8080, 9090, 9100)
- EC2 instance (Ubuntu 22.04, t3.medium)
- Elastic IP for stable access
- SSH Key Pair

### 3. Configure SonarCloud

1. Go to [sonarcloud.io](https://sonarcloud.io) and import your GitHub repository
2. Generate a token at: **Account → Security → Generate Tokens**
3. Update `sonar-project.properties` with your project key and organization
4. Add `SONAR_TOKEN` to GitHub secrets

### 4. Push to Main & Trigger CI/CD

```bash
# Commit and push your changes
git add .
git commit -m "feat: setup complete ci/cd pipeline"
git push origin main
```

The GitHub Actions pipeline will automatically:
1. ✅ Run tests (Jest with coverage)
2. ✅ Scan code quality (SonarCloud)
3. ✅ Scan vulnerabilities (Trivy)
4. ✅ Build Docker images
5. ✅ Push to Docker Hub
6. ✅ Deploy to AWS EC2

### 5. Access Your Application

After deployment completes (check GitHub Actions logs):

| Service | URL |
|---------|-----|
| Application | `http://<EC2_PUBLIC_IP>` |
| Backend API | `http://<EC2_PUBLIC_IP>/api/health` |
| Grafana | `http://<EC2_PUBLIC_IP>:3000` (admin/admin) |
| Prometheus | `http://<EC2_PUBLIC_IP>:9090` |

## 📊 Monitoring Stack

### Prometheus
- Scrapes metrics from: Node Exporter, cAdvisor, Backend
- URL: `http://<EC2_IP>:9090`
- Query examples:
  - `node_cpu_seconds_total` - CPU usage
  - `node_memory_MemAvailable_bytes` - Memory available
  - `container_cpu_usage_seconds_total` - Container CPU

### Grafana
- Pre-configured dashboard: **BigFat Pizza - System Monitoring**
- Panels: CPU Usage, Memory Usage, Disk Available, Container CPU
- Default login: `admin` / `admin` (or set `GRAFANA_ADMIN_PASSWORD`)

### cAdvisor
- Container resource usage and performance
- Metrics exposed for Prometheus scraping

### Node Exporter
- Host-level metrics (CPU, memory, disk, network)

## 🧪 Pipeline Stages Explained

### Stage 1: Test
```yaml
- Install dependencies
- Run Jest tests with coverage
- Build frontend
```

### Stage 2: SonarQube Scan
```yaml
- SonarCloud analysis
- Quality Gate check
- Fails if code quality thresholds not met
```

### Stage 3: Trivy Security Scan
```yaml
- Filesystem scan for vulnerabilities
- Strict mode: fails on CRITICAL/HIGH severity
- Uploads SARIF report to artifacts
```

### Stage 4: Quality Gate
```yaml
- Checks results of SonarQube + Trivy
- Terminates pipeline if either failed
- Required for assignment screenshot (g)
```

### Stage 5: Build & Push
```yaml
- Build multi-service Docker images
- Push to Docker Hub with SHA + latest tags
- Use BuildKit cache for speed
```

### Stage 6: Deploy
```yaml
- SSH into EC2
- Pull latest images
- Restart services with docker-compose
- Verify deployment via health check
```

## 📸 Required Screenshots Guide

For your assignment, capture these screenshots:

| ID | Screenshot | How to Capture |
|----|-----------|----------------|
| a | GitHub Branches & PR | Repo → Pull Requests tab |
| b | Reviewer Approve | PR page → Reviewers section |
| c | Merge Conflict & Resolved | PR page → "Resolve conflicts" button |
| d | GitHub Actions Full Script | `.github/workflows/ci-cd.yml` file |
| e | SonarQube Report | sonarcloud.io → your project → Issues/Overview |
| f | Trivy Scan Result | GitHub Actions → Artifacts → trivy-scan-results |
| g | Quality Gate Fail | Run `.github/workflows/quality-gate-demo.yml` |
| h | Terraform | `terraform apply` output or `terraform show` |
| i | Continuous Deployment | GitHub Actions "Deploy to EC2" job logs |
| j | Pipeline Success | GitHub Actions → main branch → green checkmark graph |
| k | App from Laptop | Browser showing `http://<EC2_IP>` |
| l | Grafana Dashboard | `http://<EC2_IP>:3000` → Dashboards |

## 🔧 Troubleshooting

### Docker Compose fails on EC2
```bash
# SSH into EC2 and check logs
ssh -i ~/.ssh/id_rsa ubuntu@<EC2_IP>
cd ~/bigfat-pizza
docker-compose -f docker-compose.prod.yml logs
```

### MongoDB connection issues
- Verify `.env.production` has correct `MONGO_USER` and `MONGO_PASSWORD`
- Ensure MongoDB container is healthy: `docker ps`

### Pipeline fails at Trivy
- Check `trivy-results.sarif` artifact in GitHub Actions
- Fix vulnerabilities or adjust severity threshold in workflow

### Can't access Grafana/Prometheus
- Verify security group allows ports 3000 and 9090
- Check containers are running: `docker ps`

## 📝 Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

Key variables:
- `MONGO_USER` / `MONGO_PASSWORD` - MongoDB credentials
- `JWT_SECRET` - Change to a strong random string
- `EC2_PUBLIC_IP` - From Terraform output
- `DOCKERHUB_USERNAME` - For image pulling

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/my-feature`
2. Make changes and commit
3. Push branch and create Pull Request
4. Wait for code review and CI checks
5. Merge after approval

## 📄 License

This project is for educational purposes (AUPP DevOps course).

---

**Built with ❤️ for the AUPP DevOps Team**

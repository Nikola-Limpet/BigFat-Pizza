#!/bin/bash
set -e

# ==========================================
# Quick Environment Setup Script
# Generates .env file and sets GitHub Secrets
# ==========================================

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

USE_SANDBOX=false

if [ "$1" == "--sandbox" ]; then
    USE_SANDBOX=true
    # Load sandbox credentials from .env.sandbox (not committed to git)
    if [ -f "$PROJECT_DIR/.env.sandbox" ]; then
        source "$PROJECT_DIR/.env.sandbox"
        echo -e "${YELLOW}Using SANDBOX credentials from .env.sandbox${NC}"
    else
        echo -e "${YELLOW}--sandbox flag used but .env.sandbox not found${NC}"
        exit 1
    fi
fi

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
ENV_FILE="$PROJECT_DIR/.env"

echo -e "${BLUE}BigFat Pizza - Environment Setup${NC}"
echo ""

# Check if gh CLI is installed
if ! command -v gh &> /dev/null; then
    echo "GitHub CLI (gh) not found. Install it first:"
    echo "  https://cli.github.com/"
    exit 1
fi

# Check if logged into GitHub
if ! gh auth status &> /dev/null; then
    echo "Please login to GitHub first:"
    echo "  gh auth login"
    exit 1
fi

# Get repo info
REPO=$(gh repo view --json nameWithOwner -q '.nameWithOwner')
echo -e "${GREEN}Repository: $REPO${NC}"
echo ""

# Function to set secret
set_secret() {
    local name="$1"
    local value="$2"
    
    if [ -z "$value" ]; then
        echo -e "${YELLOW}Skipping $name (empty)${NC}"
        return
    fi
    
    echo "$value" | gh secret set "$name" --repo="$REPO"
    echo -e "${GREEN}✓ Set $name${NC}"
}

# Collect all inputs
echo "Please provide the following values:"
echo "(Press Enter to skip any you don't have yet)"
echo ""

read -p "Docker Hub Username: " DOCKERHUB_USERNAME
if [ "$USE_SANDBOX" = true ]; then
    DOCKERHUB_TOKEN="$SANDBOX_DOCKERHUB_TOKEN"
    echo -e "${YELLOW}Using sandbox Docker Hub token${NC}"
else
    read -s -p "Docker Hub Token: " DOCKERHUB_TOKEN
    echo ""
fi

if [ "$USE_SANDBOX" = true ]; then
    AWS_ACCESS_KEY_ID="$SANDBOX_AWS_ACCESS_KEY_ID"
    AWS_SECRET_ACCESS_KEY="$SANDBOX_AWS_SECRET_ACCESS_KEY"
    AWS_REGION="$SANDBOX_AWS_REGION"
    echo -e "${YELLOW}Using sandbox AWS credentials${NC}"
else
    read -p "AWS Access Key ID: " AWS_ACCESS_KEY_ID
    read -s -p "AWS Secret Access Key: " AWS_SECRET_ACCESS_KEY
    echo ""
    read -p "AWS Region [us-east-1]: " AWS_REGION
    AWS_REGION=${AWS_REGION:-us-east-1}
fi

if [ "$USE_SANDBOX" = true ]; then
    SONAR_TOKEN="$SANDBOX_SONAR_TOKEN"
    echo -e "${YELLOW}Using sandbox SonarCloud token${NC}"
else
    read -s -p "SonarCloud Token: " SONAR_TOKEN
    echo ""
fi

read -p "EC2 Public IP (from Terraform): " EC2_PUBLIC_IP

# SSH Key
if [ -f "$HOME/.ssh/id_rsa" ]; then
    echo -e "${GREEN}Found SSH key at ~/.ssh/id_rsa${NC}"
    read -p "Use this key for EC2_SSH_KEY? (y/n): " use_ssh
    if [[ "$use_ssh" =~ ^[Yy]$ ]]; then
        EC2_SSH_KEY=$(cat "$HOME/.ssh/id_rsa")
    fi
else
    echo "No SSH key found at ~/.ssh/id_rsa"
    echo "Generate one with: ssh-keygen -t rsa -b 4096"
fi

# Set GitHub Secrets
echo ""
echo -e "${BLUE}Setting GitHub Secrets...${NC}"

set_secret "DOCKERHUB_USERNAME" "$DOCKERHUB_USERNAME"
set_secret "DOCKERHUB_TOKEN" "$DOCKERHUB_TOKEN"
set_secret "AWS_ACCESS_KEY_ID" "$AWS_ACCESS_KEY_ID"
set_secret "AWS_SECRET_ACCESS_KEY" "$AWS_SECRET_ACCESS_KEY"
set_secret "AWS_REGION" "$AWS_REGION"
set_secret "SONAR_TOKEN" "$SONAR_TOKEN"
set_secret "EC2_PUBLIC_IP" "$EC2_PUBLIC_IP"

if [ -n "$EC2_SSH_KEY" ]; then
    echo "$EC2_SSH_KEY" | gh secret set "EC2_SSH_KEY" --repo="$REPO"
    echo -e "${GREEN}✓ Set EC2_SSH_KEY${NC}"
fi

# Create .env file
echo ""
echo -e "${BLUE}Creating .env file...${NC}"

cat > "$ENV_FILE" << EOF
# MongoDB
MONGO_USER=admin
MONGO_PASSWORD=$(openssl rand -base64 32)

# JWT
JWT_SECRET=$(openssl rand -base64 64)

# CORS / URLs
CORS_ORIGIN=http://${EC2_PUBLIC_IP:-localhost}
VITE_API_URL=http://${EC2_PUBLIC_IP:-localhost}/api

# Docker Hub
DOCKERHUB_USERNAME=${DOCKERHUB_USERNAME}

# AWS
EC2_PUBLIC_IP=${EC2_PUBLIC_IP}
AWS_REGION=${AWS_REGION}

# Grafana
GRAFANA_ADMIN_USER=admin
GRAFANA_ADMIN_PASSWORD=$(openssl rand -base64 24)
EOF

echo -e "${GREEN}✓ Created .env file${NC}"

# Display summary
echo ""
echo -e "${GREEN}════════════════════════════════════════${NC}"
echo -e "${GREEN}  Environment Setup Complete!           ${NC}"
echo -e "${GREEN}════════════════════════════════════════${NC}"
echo ""
echo "GitHub Secrets Set:"
gh secret list --repo="$REPO"
echo ""
echo "Files created:"
echo "  - .env (with auto-generated secure passwords)"
echo ""
echo "Next steps:"
if [ -z "$EC2_PUBLIC_IP" ]; then
    echo "  1. Run Terraform: cd terraform && terraform apply"
    echo "  2. Re-run this script to add EC2_PUBLIC_IP"
else
    echo "  1. Push to main: git push origin main"
    echo "  2. Watch pipeline: gh run watch"
fi
echo ""

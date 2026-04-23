#!/bin/bash
set -e

# ==========================================
# BigFat Pizza - Complete Environment Setup via CLI
# Run this script to configure everything from command line
# ==========================================

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Global variables
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
ENV_FILE="$PROJECT_DIR/.env"
TF_DIR="$PROJECT_DIR/terraform"

USE_SANDBOX=false

echo -e "${BLUE}"
echo "╔════════════════════════════════════════════════════════════╗"
echo "║     BigFat Pizza - Complete Environment Setup CLI          ║"
echo "║     Configure AWS, GitHub, Docker, Terraform               ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo -e "${NC}"

# ==========================================
# Helper Functions
# ==========================================
log_info() { echo -e "${BLUE}[INFO]${NC} $1"; }
log_success() { echo -e "${GREEN}[SUCCESS]${NC} $1"; }
log_warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1"; }

prompt_input() {
    local prompt="$1"
    local var_name="$2"
    local is_secret="${3:-false}"
    
    if [ "$is_secret" = true ]; then
        read -s -p "$prompt: " value
        echo
    else
        read -p "$prompt: " value
    fi
    
    eval "$var_name='$value'"
}

prompt_confirm() {
    read -p "$1 (y/n): " response
    [[ "$response" =~ ^[Yy]$ ]]
}

# ==========================================
# 1. Check Prerequisites
# ==========================================
check_prerequisites() {
    log_info "Checking prerequisites..."
    
    local missing=()
    
    command -v git >/dev/null 2>&1 || missing+=("git")
    command -v aws >/dev/null 2>&1 || missing+=("aws-cli")
    command -v terraform >/dev/null 2>&1 || missing+=("terraform")
    command -v docker >/dev/null 2>&1 || missing+=("docker")
    command -v gh >/dev/null 2>&1 || missing+=("gh (GitHub CLI)")
    command -v ssh-keygen >/dev/null 2>&1 || missing+=("ssh-keygen")
    command -v curl >/dev/null 2>&1 || missing+=("curl")
    
    if [ ${#missing[@]} -ne 0 ]; then
        log_error "Missing tools: ${missing[*]}"
        echo "Please install missing tools first:"
        echo "  - git: https://git-scm.com/downloads"
        echo "  - aws-cli: https://aws.amazon.com/cli/"
        echo "  - terraform: https://developer.hashicorp.com/terraform/downloads"
        echo "  - docker: https://docs.docker.com/get-docker/"
        echo "  - gh: https://cli.github.com/"
        exit 1
    fi
    
    log_success "All prerequisites installed!"
}

# ==========================================
# 2. Check GitHub Login
# ==========================================
check_github_login() {
    log_info "Checking GitHub CLI authentication..."
    
    if ! gh auth status >/dev/null 2>&1; then
        log_warn "Not logged into GitHub CLI"
        echo "Please run: gh auth login"
        echo "  - Choose HTTPS"
        echo "  - Authenticate with browser or token"
        exit 1
    fi
    
    GH_USER=$(gh api user -q '.login')
    log_success "Logged into GitHub as: $GH_USER"
}

# ==========================================
# 3. Check AWS Login
# ==========================================
check_aws_login() {
    log_info "Checking AWS credentials..."
    
    if [ "$USE_SANDBOX" = true ]; then
        AWS_ACCESS_KEY_ID="$SANDBOX_AWS_ACCESS_KEY_ID"
        AWS_SECRET_ACCESS_KEY="$SANDBOX_AWS_SECRET_ACCESS_KEY"
        AWS_REGION="$SANDBOX_AWS_REGION"
        aws configure set aws_access_key_id "$AWS_ACCESS_KEY_ID"
        aws configure set aws_secret_access_key "$AWS_SECRET_ACCESS_KEY"
        aws configure set region "$AWS_REGION"
        log_warn "Using SANDBOX AWS credentials (not for production!)"
        log_success "AWS configured with sandbox credentials!"
        return
    fi
    
    if ! aws sts get-caller-identity >/dev/null 2>&1; then
        log_warn "AWS not configured"
        
        prompt_input "AWS Access Key ID" AWS_ACCESS_KEY_ID
        prompt_input "AWS Secret Access Key" AWS_SECRET_ACCESS_KEY true
        prompt_input "AWS Region (default: us-east-1)" AWS_REGION
        AWS_REGION=${AWS_REGION:-us-east-1}
        
        aws configure set aws_access_key_id "$AWS_ACCESS_KEY_ID"
        aws configure set aws_secret_access_key "$AWS_SECRET_ACCESS_KEY"
        aws configure set region "$AWS_REGION"
        
        log_success "AWS configured!"
    else
        AWS_IDENTITY=$(aws sts get-caller-identity --query 'Arn' --output text)
        log_success "AWS authenticated: $AWS_IDENTITY"
        AWS_REGION=$(aws configure get region)
        log_info "AWS Region: $AWS_REGION"
    fi
}

# ==========================================
# 4. Get Repository Info
# ==========================================
get_repo_info() {
    log_info "Detecting repository..."
    
    cd "$PROJECT_DIR"
    
    if ! git remote get-url origin >/dev/null 2>&1; then
        log_error "No git remote configured"
        prompt_input "GitHub repository URL" REPO_URL
        git remote add origin "$REPO_URL"
    fi
    
    REMOTE_URL=$(git remote get-url origin)
    REPO_NAME=$(basename -s .git "$REMOTE_URL")
    REPO_OWNER=$(echo "$REMOTE_URL" | sed -n 's/.*github.com[:/]\([^/]*\)\/\([^/]*\).*/\1/p')
    
    log_info "Repository: $REPO_OWNER/$REPO_NAME"
    
    # Verify repo exists on GitHub
    if ! gh repo view "$REPO_OWNER/$REPO_NAME" >/dev/null 2>&1; then
        log_error "Repository not found on GitHub or no access"
        exit 1
    fi
    
    log_success "Repository verified!"
}

# ==========================================
# 5. Configure Docker Hub
# ==========================================
setup_dockerhub() {
    log_info "Setting up Docker Hub..."
    
    prompt_input "Docker Hub username" DOCKERHUB_USERNAME
    
    if [ "$USE_SANDBOX" = true ]; then
        DOCKERHUB_TOKEN="$SANDBOX_DOCKERHUB_TOKEN"
        log_warn "Using sandbox Docker Hub token"
    else
        prompt_input "Docker Hub access token (create at hub.docker.com/settings/security)" DOCKERHUB_TOKEN true
    fi
    
    # Test login
    if echo "$DOCKERHUB_TOKEN" | docker login -u "$DOCKERHUB_USERNAME" --password-stdin >/dev/null 2>&1; then
        log_success "Docker Hub login successful!"
    else
        log_error "Docker Hub login failed"
        exit 1
    fi
}

# ==========================================
# 6. Configure SonarCloud
# ==========================================
setup_sonarcloud() {
    log_info "Setting up SonarCloud..."
    
    if [ "$USE_SANDBOX" = true ]; then
        SONAR_TOKEN="$SANDBOX_SONAR_TOKEN"
        log_warn "Using sandbox SonarCloud token"
    else
        echo "Instructions:"
        echo "  1. Go to https://sonarcloud.io"
        echo "  2. Login with GitHub"
        echo "  3. Add your repository"
        echo "  4. Go to My Account → Security → Generate Token"
        echo ""
        
        prompt_input "SonarCloud token" SONAR_TOKEN true
    fi
    
    # Try to auto-detect project info
    SONAR_ORG="$REPO_OWNER"
    SONAR_PROJECT="${REPO_OWNER}_${REPO_NAME}"
    
    echo ""
    echo "Suggested SonarCloud settings:"
    echo "  Organization: $SONAR_ORG"
    echo "  Project Key: $SONAR_PROJECT"
    echo ""
    
    read -p "Use these values? (y/n): " use_default
    if [[ ! "$use_default" =~ ^[Yy]$ ]]; then
        prompt_input "SonarCloud Organization" SONAR_ORG
        prompt_input "SonarCloud Project Key" SONAR_PROJECT
    fi
    
    # Update sonar-project.properties
    cat > "$PROJECT_DIR/sonar-project.properties" << EOF
sonar.projectKey=$SONAR_PROJECT
sonar.organization=$SONAR_ORG
sonar.sources=backend,front-end/src
sonar.exclusions=**/node_modules/**,**/dist/**,**/build/**,**/coverage/**
sonar.javascript.lcov.reportPaths=backend/coverage/lcov.info
sonar.qualitygate.wait=true
EOF
    
    log_success "SonarCloud configured!"
}

# ==========================================
# 7. Generate SSH Key Pair
# ==========================================
generate_ssh_key() {
    log_info "Checking SSH keys..."
    
    SSH_KEY_PATH="$HOME/.ssh/id_rsa"
    
    if [ -f "$SSH_KEY_PATH" ]; then
        log_warn "SSH key already exists at $SSH_KEY_PATH"
        if prompt_confirm "Use existing key?"; then
            log_success "Using existing SSH key"
            return
        fi
    fi
    
    log_info "Generating new SSH key pair..."
    ssh-keygen -t rsa -b 4096 -f "$SSH_KEY_PATH" -N "" -C "bigfat-pizza-deploy-$(date +%Y%m%d)"
    
    log_success "SSH key generated!"
    log_info "Public key: ${SSH_KEY_PATH}.pub"
}

# ==========================================
# 8. Run Terraform
# ==========================================
run_terraform() {
    log_info "Running Terraform..."
    
    cd "$TF_DIR"
    
    # Initialize
    log_info "terraform init"
    terraform init
    
    # Plan
    log_info "terraform plan"
    terraform plan -var="dockerhub_username=$DOCKERHUB_USERNAME" -out=tfplan
    
    echo ""
    if ! prompt_confirm "Apply Terraform plan? This will create AWS resources"; then
        log_warn "Terraform apply cancelled"
        return
    fi
    
    # Apply
    log_info "terraform apply"
    terraform apply tfplan
    
    # Get outputs
    EC2_PUBLIC_IP=$(terraform output -raw ec2_public_ip)
    EC2_INSTANCE_ID=$(terraform output -raw ec2_instance_id)
    
    log_success "Terraform applied!"
    log_info "EC2 Public IP: $EC2_PUBLIC_IP"
    log_info "EC2 Instance ID: $EC2_INSTANCE_ID"
    
    # Save to .env
    cat >> "$ENV_FILE" << EOF

# Terraform Outputs (auto-generated)
EC2_PUBLIC_IP=$EC2_PUBLIC_IP
EC2_INSTANCE_ID=$EC2_INSTANCE_ID
EOF
}

# ==========================================
# 9. Set GitHub Secrets
# ==========================================
set_github_secrets() {
    log_info "Setting GitHub Secrets..."
    
    cd "$PROJECT_DIR"
    
    # Set secrets
    echo "$DOCKERHUB_USERNAME" | gh secret set DOCKERHUB_USERNAME --repo="$REPO_OWNER/$REPO_NAME"
    echo "$DOCKERHUB_TOKEN" | gh secret set DOCKERHUB_TOKEN --repo="$REPO_OWNER/$REPO_NAME"
    echo "$AWS_ACCESS_KEY_ID" | gh secret set AWS_ACCESS_KEY_ID --repo="$REPO_OWNER/$REPO_NAME"
    echo "$AWS_SECRET_ACCESS_KEY" | gh secret set AWS_SECRET_ACCESS_KEY --repo="$REPO_OWNER/$REPO_NAME"
    echo "$AWS_REGION" | gh secret set AWS_REGION --repo="$REPO_OWNER/$REPO_NAME"
    echo "$SONAR_TOKEN" | gh secret set SONAR_TOKEN --repo="$REPO_OWNER/$REPO_NAME"
    echo "$EC2_PUBLIC_IP" | gh secret set EC2_PUBLIC_IP --repo="$REPO_OWNER/$REPO_NAME"
    cat "$HOME/.ssh/id_rsa" | gh secret set EC2_SSH_KEY --repo="$REPO_OWNER/$REPO_NAME"
    
    log_success "All GitHub secrets set!"
    
    # Verify
    log_info "Verifying secrets..."
    gh secret list --repo="$REPO_OWNER/$REPO_NAME"
}

# ==========================================
# 10. Deploy Application
# ==========================================
deploy_application() {
    log_info "Triggering deployment..."
    
    cd "$PROJECT_DIR"
    
    # Add and commit
    git add .
    git commit -m "chore: setup complete ci/cd pipeline and infrastructure"
    
    # Push
    git push origin main
    
    log_success "Pushed to main! CI/CD pipeline will start automatically."
    
    # Open Actions page
    echo ""
    log_info "Opening GitHub Actions..."
    gh workflow view ci-cd.yml --repo="$REPO_OWNER/$REPO_NAME" --web
}

# ==========================================
# 11. Wait and Verify
# ==========================================
wait_and_verify() {
    log_info "Waiting for deployment (this may take 5-10 minutes)..."
    
    echo ""
    echo "You can monitor progress at:"
    echo "  https://github.com/$REPO_OWNER/$REPO_NAME/actions"
    echo ""
    
    read -p "Press Enter when the deployment is complete..."
    
    # Verify deployment
    log_info "Verifying deployment..."
    
    APP_URL="http://$EC2_PUBLIC_IP"
    HEALTH_URL="http://$EC2_PUBLIC_IP/api/health"
    
    echo ""
    log_info "Testing application endpoints..."
    
    if curl -sf "$HEALTH_URL" >/dev/null 2>&1; then
        log_success "Health check passed!"
        curl -s "$HEALTH_URL" | python3 -m json.tool 2>/dev/null || curl -s "$HEALTH_URL"
    else
        log_warn "Health check failed or not ready yet"
    fi
    
    echo ""
    echo -e "${GREEN}════════════════════════════════════════════════════════════${NC}"
    echo -e "${GREEN}  Deployment Complete!                                      ${NC}"
    echo -e "${GREEN}════════════════════════════════════════════════════════════${NC}"
    echo ""
    echo "Application URLs:"
    echo "  App:        http://$EC2_PUBLIC_IP"
    echo "  Health:     http://$EC2_PUBLIC_IP/api/health"
    echo "  Grafana:    http://$EC2_PUBLIC_IP:3000"
    echo "  Prometheus: http://$EC2_PUBLIC_IP:9090"
    echo ""
    echo "SSH Access:"
    echo "  ssh -i ~/.ssh/id_rsa ubuntu@$EC2_PUBLIC_IP"
    echo ""
}

# ==========================================
# 12. SSH to EC2 and Setup (if terraform user-data fails)
# ==========================================
setup_ec2_manual() {
    log_info "Setting up EC2 instance manually (if needed)..."
    
    echo "Connecting to EC2..."
    echo "If the connection fails, wait 2-3 minutes for the instance to boot"
    echo ""
    
    ssh -o StrictHostKeyChecking=no -i "$HOME/.ssh/id_rsa" "ubuntu@$EC2_PUBLIC_IP" << 'REMOTE_SCRIPT'
    set -e
    
    echo "Updating system..."
    sudo apt-get update -y
    sudo apt-get upgrade -y
    
    echo "Installing Docker..."
    sudo apt-get install -y ca-certificates curl gnupg
    sudo install -m 0755 -d /etc/apt/keyrings
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
    sudo chmod a+r /etc/apt/keyrings/docker.gpg
    
    echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo $VERSION_CODENAME) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
    
    sudo apt-get update -y
    sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
    
    sudo systemctl start docker
    sudo systemctl enable docker
    sudo usermod -aG docker $USER
    
    echo "Installing Docker Compose standalone..."
    sudo curl -SL https://github.com/docker/compose/releases/download/v2.23.0/docker-compose-linux-x86_64 -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
    sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
    
    echo "Creating app directory..."
    mkdir -p ~/bigfat-pizza
    
    echo "EC2 setup complete!"
REMOTE_SCRIPT

    log_success "EC2 manual setup complete!"
}

# ==========================================
# Main Menu
# ==========================================
show_menu() {
    echo ""
    echo "Select an option:"
    echo "  1) Full Setup (Recommended) - Run everything automatically"
    echo "  1s) Full Setup with SANDBOX AWS credentials (testing only)"
    echo "  2) Check Prerequisites Only"
    echo "  3) Setup Docker Hub"
    echo "  4) Setup SonarCloud"
    echo "  5) Generate SSH Key"
    echo "  6) Run Terraform Only"
    echo "  7) Set GitHub Secrets Only"
    echo "  8) Deploy Application"
    echo "  9) Manual EC2 Setup (SSH)"
    echo "  10) Full Verify & Status Check"
    echo "  0) Exit"
    echo ""
}

run_full_setup() {
    log_info "Starting FULL SETUP..."
    
    check_prerequisites
    check_github_login
    check_aws_login
    get_repo_info
    setup_dockerhub
    setup_sonarcloud
    generate_ssh_key
    run_terraform
    set_github_secrets
    deploy_application
    wait_and_verify
    
    log_success "FULL SETUP COMPLETE!"
}

run_verify() {
    log_info "Running verification checks..."
    
    echo ""
    echo "=== GitHub Status ==="
    gh auth status 2>/dev/null || log_warn "Not logged into GitHub"
    
    echo ""
    echo "=== AWS Status ==="
    aws sts get-caller-identity 2>/dev/null || log_warn "AWS not configured"
    
    echo ""
    echo "=== Docker Status ==="
    docker info 2>/dev/null || log_warn "Docker not running"
    
    echo ""
    echo "=== Terraform Status ==="
    if [ -d "$TF_DIR/.terraform" ]; then
        cd "$TF_DIR" && terraform show 2>/dev/null || log_warn "No Terraform state found"
    else
        log_warn "Terraform not initialized"
    fi
    
    echo ""
    echo "=== GitHub Secrets ==="
    gh secret list --repo="$REPO_OWNER/$REPO_NAME" 2>/dev/null || log_warn "Cannot list secrets"
    
    echo ""
    echo "=== Environment File ==="
    if [ -f "$ENV_FILE" ]; then
        echo "Found: $ENV_FILE"
        grep -E "EC2_PUBLIC_IP|DOCKERHUB" "$ENV_FILE" || true
    else
        log_warn "No .env file found"
    fi
    
    echo ""
    echo "=== SSH Key ==="
    if [ -f "$HOME/.ssh/id_rsa" ]; then
        echo "Found: $HOME/.ssh/id_rsa"
        ssh-keygen -lf "$HOME/.ssh/id_rsa.pub" 2>/dev/null || true
    else
        log_warn "No SSH key found"
    fi
}

# ==========================================
# Main
# ==========================================
main() {
    if [ "$1" = "--full" ]; then
        run_full_setup
        exit 0
    fi
    
    if [ "$1" = "--sandbox" ]; then
        USE_SANDBOX=true
        if [ -f "$PROJECT_DIR/.env.sandbox" ]; then
            source "$PROJECT_DIR/.env.sandbox"
            log_warn "Running in SANDBOX mode with credentials from .env.sandbox"
        else
            log_error ".env.sandbox not found. Create it first."
            exit 1
        fi
        run_full_setup
        exit 0
    fi
    
    if [ "$1" = "--verify" ]; then
        get_repo_info
        run_verify
        exit 0
    fi
    
    while true; do
        show_menu
        read -p "Enter choice: " choice
        
        case $choice in
            1) run_full_setup ;;
            1s)
                USE_SANDBOX=true
                if [ -f "$PROJECT_DIR/.env.sandbox" ]; then
                    source "$PROJECT_DIR/.env.sandbox"
                    log_warn "Using SANDBOX credentials from .env.sandbox (not for production!)"
                else
                    log_error ".env.sandbox not found. Create it first."
                    continue
                fi
                run_full_setup
                ;;
            2) check_prerequisites ;;
            3) setup_dockerhub ;;
            4) setup_sonarcloud ;;
            5) generate_ssh_key ;;
            6) run_terraform ;;
            7) set_github_secrets ;;
            8) deploy_application ;;
            9) setup_ec2_manual ;;
            10) run_verify ;;
            0) log_info "Exiting..."; exit 0 ;;
            *) log_warn "Invalid option" ;;
        esac
        
        echo ""
        read -p "Press Enter to continue..."
    done
}

main "$@"

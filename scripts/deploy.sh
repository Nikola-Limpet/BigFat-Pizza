#!/bin/bash
set -e

# ==========================================
# Local Deployment Script
# Run this from your laptop after Terraform created the EC2
# ==========================================

EC2_IP=$1
DOCKERHUB_USERNAME=$2

if [ -z "$EC2_IP" ] || [ -z "$DOCKERHUB_USERNAME" ]; then
  echo "Usage: ./deploy.sh <EC2_PUBLIC_IP> <DOCKERHUB_USERNAME>"
  exit 1
fi

echo "=== Deploying BigFat Pizza to EC2: $EC2_IP ==="

# Copy compose file and configs to EC2
scp -i ~/.ssh/id_rsa \
  docker-compose.prod.yml \
  .env.production \
  -r monitoring/ \
  ubuntu@$EC2_IP:~/bigfat-pizza/

# SSH into EC2 and deploy
ssh -i ~/.ssh/id_rsa ubuntu@$EC2_IP << EOF
  set -e
  cd ~/bigfat-pizza

  echo "Updating environment variables..."
  echo "EC2_PUBLIC_IP=$EC2_IP" >> .env
  echo "DOCKERHUB_USERNAME=$DOCKERHUB_USERNAME" >> .env

  echo "Pulling latest images..."
  export DOCKERHUB_USERNAME=$DOCKERHUB_USERNAME
  docker-compose -f docker-compose.prod.yml pull

  echo "Deploying services..."
  docker-compose -f docker-compose.prod.yml down
  docker-compose -f docker-compose.prod.yml up -d --remove-orphans

  echo "Cleaning up..."
  docker system prune -af --filter "until=24h"

  echo "=== Deployment Complete ==="
  docker-compose -f docker-compose.prod.yml ps
EOF

echo ""
echo "App URL: http://$EC2_IP"
echo "Grafana: http://$EC2_IP:3000"
echo "Prometheus: http://$EC2_IP:9090"

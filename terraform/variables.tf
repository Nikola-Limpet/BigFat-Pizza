variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t3.medium"
}

variable "public_key_path" {
  description = "Path to your public SSH key"
  type        = string
  default     = "~/.ssh/id_rsa.pub"
}

variable "dockerhub_username" {
  description = "Docker Hub username for pulling images"
  type        = string
}

variable "ami_id" {
  description = "Ubuntu 22.04 AMI ID (us-east-1)"
  type        = string
  default     = "ami-0c7217cdde317cfec"
}

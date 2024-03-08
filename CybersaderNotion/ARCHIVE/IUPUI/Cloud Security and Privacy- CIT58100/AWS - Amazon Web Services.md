# AWS - Amazon Web Services

# Pricing Tiers are Complex

- Simply keeping keys on your account can occur costs if you forget to delete them

# Free AWS Tech

## EC2 - Elastic Cloud Compute

- 750 hours free per month
    - 25 hours per day free
- Only t2 or t3 micro

## S3 Buckets

- secure scalable storage
- 5 GB

## RDS - Relational Database Service

- 750 hours free per month
- SQL databases

# General Website Architecture Example

![Untitled](AWS%20-%20Amazon%20Web%20Services/Untitled.png)

- Start an S3 bucket and put website code into it
- Start an EC2 instance and connect it to use the S3 bucket
- Connect a custom domain name to the EC2 instance with an A record

# Setting up websites on EC2

- Configure security groups
    - HTTP and HTTPS inbound and outbound
- You need domain name to use HTTPS and use SSL certificates
    - for AWS at least
    - they used to allow free SSL certs
- Use OpenSSH for key pair so you don’t need to use PuTTY
- Activate EC2 with:
    - security group
    - key pair
    - Select S3 for IAM rule so that it has access to the S3 bucket
- Access the Ec2 instance online
- Load apache onto it or some other web server

# Setting Up Infrastructure & Applications Quicker

- Use Infrastructure as Code:
    - Use some syntax to define what you want, then feed it to AWS to procure or though some other tech
    - Terraform:
        - works with AWS
        - use Terraform YAML files to define what infrastructure
    - AWS CloudFormation:
        - specifically from AWS
        - create, deploy, and manage EC2 instances, S3, and more using JSON or YAML templates to define the desired state of your infrastructure. CloudFormation then handles the provisioning.
    - Terraform is multi-cloud compatible, but AWS CloudFormation only works with AWS
- Other infrastructure creation, deploy, and management solutions:
    - Ansible
    - AWS Beanstalk -
        - fully managed service to create, deploy, run, and manage applications with AWS
    - Deploy pre-made Docker images to your EC2 instances instead
- Other related services, tech, and tools:
    - AWS cert manager - AWS system for getting SSL certs that is easiest to use with AWS infrastructure
# Deploying a Static Website // part 1 // AWS (Apache EC2)

# TL;DR // The Problem & Solution

I want to manually deploy a static website for free on the internet using AWS and some of their tech:

- S3 - storing the website code as it’s changed (was required for my class)
- EC2 - run it as an Apache Web Server to serve the static webpage

## Build a Free Website Tech Stack with AWS as the Cloud Provider

This is the architecture I will be delving into…pretty sure this is *generally* how it works.

![Untitled](Deploying%20a%20Static%20Website%20part%201%20AWS%20(Apache%20EC2)/Untitled.png)

## 3 Options for AWS Apache EC2 Web Server: AWS Setup vs. IaC (Infrastructure as Code) vs. Deploying Containers to AWS

- **AWS Setup** - Upload code, setup infrastructure, and deploy using the dashboard on the AWS website.
- **IaC (Infrastructure as code)** - write configuration files (usually JSON format) that are fed into software like Terraform to procure cloud infrastructure and setup the website and everything automatically. The power in this is that you avoid GUIs and CLIs, and you can store these config files to be replicated and used in other situtations. This can make consistent security a bit easier in an organization.
- **Deploy containers** - use Docker or Kubernetes to deploy containers to AWS that have predefined configurations

**I will be focusing on the AWS Setup.**

# Building a Quick Website

I’m using Webflow to create a small static website.

I found a template on [Popular Websites - Webflow](https://webflow.com/made-in-webflow) 

![Untitled](Deploying%20a%20Static%20Website%20part%201%20AWS%20(Apache%20EC2)/Untitled%201.png)

Clone it.

![Untitled](Deploying%20a%20Static%20Website%20part%201%20AWS%20(Apache%20EC2)/Untitled%202.png)

Change some stuff.

![Untitled](Deploying%20a%20Static%20Website%20part%201%20AWS%20(Apache%20EC2)/Untitled%203.png)

Export it.

![Untitled](Deploying%20a%20Static%20Website%20part%201%20AWS%20(Apache%20EC2)/Untitled%204.png)

![Untitled](Deploying%20a%20Static%20Website%20part%201%20AWS%20(Apache%20EC2)/Untitled%205.png)

# The Traditional Way // Using AWS Dashboards and UI

## Set up S3 Bucket

Create an S3 bucket.

![Untitled](Deploying%20a%20Static%20Website%20part%201%20AWS%20(Apache%20EC2)/Untitled%206.png)

Success.

![Untitled](Deploying%20a%20Static%20Website%20part%201%20AWS%20(Apache%20EC2)/Untitled%207.png)

Upload the website folder exported and unzipped from webflow.

- It might work zipped too. I haven’t tried that.

![Untitled](Deploying%20a%20Static%20Website%20part%201%20AWS%20(Apache%20EC2)/Untitled%208.png)

Upload success.

![Untitled](Deploying%20a%20Static%20Website%20part%201%20AWS%20(Apache%20EC2)/Untitled%209.png)

Give use case access for EC2 instances, so that the website code stored in EC2 can be used by the EC2 server.

![Untitled](Deploying%20a%20Static%20Website%20part%201%20AWS%20(Apache%20EC2)/Untitled%2010.png)

Use the “AmazonS3FullAccess” permission.

- Definitely not the most secure, but alright for testing.

![Untitled](Deploying%20a%20Static%20Website%20part%201%20AWS%20(Apache%20EC2)/Untitled%2011.png)

## Set up EC2 Instace (will run the Apache Web Server)

This is what will be used to serve our website.

Name it and give it a description.

![Untitled](Deploying%20a%20Static%20Website%20part%201%20AWS%20(Apache%20EC2)/Untitled%2012.png)

Go to the left and find “security groups” and create one for the instance.

![Untitled](Deploying%20a%20Static%20Website%20part%201%20AWS%20(Apache%20EC2)/Untitled%2013.png)

Name it and give it a description.

![Untitled](Deploying%20a%20Static%20Website%20part%201%20AWS%20(Apache%20EC2)/Untitled%2014.png)

Give it some inbound and outbound rules.

<aside>
‼️ Notice. I don’t show **inbound rules** here, and that’s because I forget to. Set inbound and outbound rules. However, it can troubleshooted later on - I’ll show this.

</aside>

![Untitled](Deploying%20a%20Static%20Website%20part%201%20AWS%20(Apache%20EC2)/Untitled%2015.png)

Setup a key pair to be used to connect to the instance for setup.

- If downloaded, you can use it with [PuTTY](https://putty.org/), but this is not as simple IMO.

![Untitled](Deploying%20a%20Static%20Website%20part%201%20AWS%20(Apache%20EC2)/Untitled%2016.png)

### Create the EC2 Instance

Name the EC2 instance.

![Untitled](Deploying%20a%20Static%20Website%20part%201%20AWS%20(Apache%20EC2)/Untitled%2017.png)

Select the created key-pair.

![Untitled](Deploying%20a%20Static%20Website%20part%201%20AWS%20(Apache%20EC2)/Untitled%2018.png)

Select the permissions for the S3 in “Advanced Details.” This will allow the EC2 to grab the website code from the S3 bucket.

![Untitled](Deploying%20a%20Static%20Website%20part%201%20AWS%20(Apache%20EC2)/Untitled%2019.png)

EC2 creation success.

![Untitled](Deploying%20a%20Static%20Website%20part%201%20AWS%20(Apache%20EC2)/Untitled%2020.png)

Summary of the instance (blurred out details).

- Click “Connect” in the top right.

![Untitled](Deploying%20a%20Static%20Website%20part%201%20AWS%20(Apache%20EC2)/Untitled%2021.png)

Connect to the instance or use another SSH client like [PuTTY](https://putty.org/). 

![Untitled](Deploying%20a%20Static%20Website%20part%201%20AWS%20(Apache%20EC2)/Untitled%2022.png)

### Setup the EC2 Server in the Connected Terminal

Escalate privileges and update the yum packages.

`sudo su`

`yum update -y`

![Untitled](Deploying%20a%20Static%20Website%20part%201%20AWS%20(Apache%20EC2)/Untitled%2023.png)

Install Apache service.

`yum install httpd -y`

![Untitled](Deploying%20a%20Static%20Website%20part%201%20AWS%20(Apache%20EC2)/Untitled%2024.png)

Configure httpd (Apache service) to be on.

`chkconfig httpd on`

![Untitled](Deploying%20a%20Static%20Website%20part%201%20AWS%20(Apache%20EC2)/Untitled%2025.png)

Try to put website code into the html folder (accessed by Apache).

`cd /var/www/html`

`aws s3 sync s3://bensbucket-cloudsecclass /var/www/html`

![Untitled](Deploying%20a%20Static%20Website%20part%201%20AWS%20(Apache%20EC2)/Untitled%2026.png)

Make sure I have the security group added.

![Untitled](Deploying%20a%20Static%20Website%20part%201%20AWS%20(Apache%20EC2)/Untitled%2027.png)

Make sure I have the IAM rule set so the EC2 server can access the S3 bucket.

![Untitled](Deploying%20a%20Static%20Website%20part%201%20AWS%20(Apache%20EC2)/Untitled%2028.png)

More errors…why?

![Untitled](Deploying%20a%20Static%20Website%20part%201%20AWS%20(Apache%20EC2)/Untitled%2029.png)

Inbound rules??? None???

![Untitled](Deploying%20a%20Static%20Website%20part%201%20AWS%20(Apache%20EC2)/Untitled%2030.png)

Set up inbound rules for security group.

![Untitled](Deploying%20a%20Static%20Website%20part%201%20AWS%20(Apache%20EC2)/Untitled%2031.png)

Worked!!

![Untitled](Deploying%20a%20Static%20Website%20part%201%20AWS%20(Apache%20EC2)/Untitled%2032.png)

Run the commands again:

```bash
sudo su
chkconfig httpd on
cd /var/www/html
aws s3 sync s3://bensbucket-cloudsecclass /var/www/html
```

Worked again!!

![Untitled](Deploying%20a%20Static%20Website%20part%201%20AWS%20(Apache%20EC2)/Untitled%2033.png)

Start the Apache Server!

`service httpd start`

- This will tell code to start running to greb the website files and serve them to incoming requests for the “index” or home page.

![Untitled](Deploying%20a%20Static%20Website%20part%201%20AWS%20(Apache%20EC2)/Untitled%2034.png)

Worked, but where’s my website????

![Untitled](Deploying%20a%20Static%20Website%20part%201%20AWS%20(Apache%20EC2)/Untitled%2035.png)

Looks like it may be because Apache can’t directly see my “`index.html`” file in the “`html`” folder.

![Untitled](Deploying%20a%20Static%20Website%20part%201%20AWS%20(Apache%20EC2)/Untitled%2036.png)

Stop the Apache service for a little:

`service httpd stop`

![Untitled](Deploying%20a%20Static%20Website%20part%201%20AWS%20(Apache%20EC2)/Untitled%2037.png)

Try to move the child subdirectories of the webflow export folder out of the folder, so that they are in the `html` folder:

`cd ..`

`mv cybers-stunning-site.webflow/* ./`

`sudo rm -d cybers-stunning-site.webflow/`

![Untitled](Deploying%20a%20Static%20Website%20part%201%20AWS%20(Apache%20EC2)/Untitled%2038.png)

Start the Apache web server again:

`service httpd start`

Worked!!!

![Untitled](Deploying%20a%20Static%20Website%20part%201%20AWS%20(Apache%20EC2)/Untitled%2039.png)

## Fixing Mistakes

### Uploading the Files correctly to the S3 bucket

We can’t simply upload the folder. We have to upload what is inside of the folder.

Delete the old upload.

![Untitled](Deploying%20a%20Static%20Website%20part%201%20AWS%20(Apache%20EC2)/Untitled%2040.png)

Select the files inside the folder and upload.

![Untitled](Deploying%20a%20Static%20Website%20part%201%20AWS%20(Apache%20EC2)/Untitled%2041.png)

![Untitled](Deploying%20a%20Static%20Website%20part%201%20AWS%20(Apache%20EC2)/Untitled%2042.png)

Update the code in the `/var/www/html` folder again.

If you need to navigate to the folder, `cd /var/www/html`

![Untitled](Deploying%20a%20Static%20Website%20part%201%20AWS%20(Apache%20EC2)/Untitled%2043.png)

Worked.

![Untitled](Deploying%20a%20Static%20Website%20part%201%20AWS%20(Apache%20EC2)/Untitled%2044.png)

# Questions & Exploration

- Automatic Website Deployment and CI/CD
    - How do we have the code automatically updated when new website code is pushed to the S3 bucket via GitHub or even manual uploads?
    - Is this how websites are usually deployed?
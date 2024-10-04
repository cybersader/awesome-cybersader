---
aliases: 
tags: 
publish: true
date created: Friday, August 30th 2024, 4:54 pm
date modified: Friday, August 30th 2024, 6:35 pm
---

# Container Registries

- [Docker Hub Container Image Library | App Containerization](https://hub.docker.com/)
- [Container Registry - Amazon Elastic Container Registry (Amazon ECR) - AWS](https://aws.amazon.com/ecr/)
- [Azure Container Registry | Microsoft Azure](https://azure.microsoft.com/en-au/products/container-registry/)
- [Working with the Container registry - GitHub Docs](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry) 
	- [GitHub Packages: Your packages, at home with their code](https://github.com/features/packages) 
- [Artifact Registry  |  Google Cloud](https://cloud.google.com/artifact-registry)

# Using Containers in Podman

- [Containers | Podman Desktop](https://podman-desktop.io/docs/containers)


- Instructions here - https://podman-desktop.io/docs/containers/images/pulling-an-image
- From DockerHub
	- ![](_attachments/Podman%20Setup%20&%20Container%20Usage/IMG-20240830183521450.png)
- Add ":latest" to the end to always use the latest one
	- ![](_attachments/Podman%20Setup%20&%20Container%20Usage/IMG-20240830183521498.png)

- Running the container from the container image
	- ![](_attachments/Podman%20Setup%20&%20Container%20Usage/IMG-20240830183521540.png)
	- Choose "Existing Image"
	- Select the image you downloaded
	- Click the *play* button to run the image
	- Choose name and port
	- Run 

# Building Containers from Container files (Docker YAMLs, etc.)

- https://podman-desktop.io/docs/containers/images/building-an-image
- 
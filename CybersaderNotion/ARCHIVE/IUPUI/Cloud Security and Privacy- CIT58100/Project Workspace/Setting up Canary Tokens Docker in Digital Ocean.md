# Setting up Canary Tokens Docker in Digital Ocean

# Digital Oceans Setup

- Setting up cheap droplet Linux with Docker on it

![Untitled](Setting%20up%20Canary%20Tokens%20Docker%20in%20Digital%20Ocean/Untitled.png)

![Untitled](Setting%20up%20Canary%20Tokens%20Docker%20in%20Digital%20Ocean/Untitled%201.png)

- Installed portainer on the droplet

![Untitled](Setting%20up%20Canary%20Tokens%20Docker%20in%20Digital%20Ocean/Untitled%202.png)

- Setting up custom domain obtained from cloudflare

![Untitled](Setting%20up%20Canary%20Tokens%20Docker%20in%20Digital%20Ocean/Untitled%203.png)

![Untitled](Setting%20up%20Canary%20Tokens%20Docker%20in%20Digital%20Ocean/Untitled%204.png)

- Setting up canary tokens docker image in portainer

![Untitled](Setting%20up%20Canary%20Tokens%20Docker%20in%20Digital%20Ocean/Untitled%205.png)

- Didn’t work…have to use docker compose for the time being

## Using docker compose to setup canarytokens server

```python
git clone https://github.com/thinkst/canarytokens-docker
cd canarytokens-docker
```

```python
cp switchboard.env.dist switchboard.env
cp frontend.env.dist frontend.env
```

### Setting up Mailgun for emails

![Untitled](Setting%20up%20Canary%20Tokens%20Docker%20in%20Digital%20Ocean/Untitled%206.png)

![Untitled](Setting%20up%20Canary%20Tokens%20Docker%20in%20Digital%20Ocean/Untitled%207.png)

- switchboard.env

![Untitled](Setting%20up%20Canary%20Tokens%20Docker%20in%20Digital%20Ocean/Untitled%208.png)

- frontend.env

![Untitled](Setting%20up%20Canary%20Tokens%20Docker%20in%20Digital%20Ocean/Untitled%209.png)

- Start it

```python
docker-compose up
```

- Errors - other services blocking it from running

```python
Creating switchboard ... error

ERROR: for switchboard  Cannot start service switchboard: driver failed programming external connectivity on endpoint switchboard (dd309aa6e87a7ef68c2f73079ddb2680c4b23da509ab241cda1071264196d8d1): Error starting userland proxy: listen tcp4 0.0.0.0:53: bind: address already in use

ERROR: for switchboard  Cannot start service switchboard: driver failed programming external connectivity on endpoint switchboard (dd309aa6e87a7ef68c2f73079ddb2680c4b23da509ab241cda1071264196d8d1): Error starting userland proxy: listen tcp4 0.0.0.0:53: bind: address already in use
ERROR: Encountered errors while bringing up the project.
root@docker-ubuntu-s-1vcpu-1gb-nyc1-01:~/canarytokens-docker# sudo lsof -i :53
COMMAND     PID            USER   FD   TYPE DEVICE SIZE/OFF NODE NAME
systemd-r 84250 systemd-resolve   13u  IPv4 273224      0t0  UDP localhost:domain 
systemd-r 84250 systemd-resolve   14u  IPv4 273225      0t0  TCP localhost:domain (LISTEN)
```

- Kill it

```python
sudo systemctl stop systemd-resolved
```

- Check it again

```python
sudo lsof -i :53
```

- Run the images in the background

```python
docker-compose up -d
```

## Managing and Usage of Canarytokens docker

### Useful commands in Ubuntu terminal on droplet

- **`docker-compose ps`** will show the status of your services.
- **`docker-compose logs`** will show the logs from your services.
- **`docker-compose stop`** will stop your services.
- **`docker-compose down`** will stop your services and also remove the containers, networks, and optionally, volumes.
- `docker-compose ps` - results

![Untitled](Setting%20up%20Canary%20Tokens%20Docker%20in%20Digital%20Ocean/Untitled%2010.png)

### Accessing Manual Canary Token Creation

![Untitled](Setting%20up%20Canary%20Tokens%20Docker%20in%20Digital%20Ocean/Untitled%2011.png)

### Debugging - Tokens not working

- Code shows that tokens are being created

![Untitled](Setting%20up%20Canary%20Tokens%20Docker%20in%20Digital%20Ocean/Untitled%2012.png)

### Mailgun Account Disabled - Sandbox Domain Issue

![Untitled](Setting%20up%20Canary%20Tokens%20Docker%20in%20Digital%20Ocean/Untitled%2013.png)

- Gonna have to fix this and try everything at a later time

## Future Developments to Use a CanaryTokens Docker

- Automate the creation of various tokens over time
- Connect to the applicable redis database to look at the keys via the python server to programmatically interact with potential keys
- Predict what sorts of keys need to be created and how many
# Exposing the Canary Tokens Data to Local Python

# Exposing the Canarytokens Redis Storage

## Editing Canarytokens.yml

### Add a password to the Redis database

To add a password to your Redis instance, you need to modify the `command` in the `redis` service in your `docker-compose.yml` file.

Here is what you need to do:

1. Modify the Redis service in your docker-compose file to include the `-requirepass` option in the command:
    
    ```
    yamlCopy coderedis:
      restart: always
      image: redis
      volumes:
        - ./data:/data/
      container_name: redis
      command: redis-server --appendonly yes --protected-mode no --save 60 1 --requirepass YourPassword
    
    ```
    
    Replace `YourPassword` with the password you want to set for your Redis instance.
    
2. After you've made this change, you will need to restart your Docker containers for the changes to take effect. You can do this by navigating to the directory containing your `docker-compose.yml` file and running:
    
    ```
    bashCopy codedocker-compose down
    docker-compose up -d
    
    ```
    
3. Finally, you can confirm that the password is working by trying to access Redis:
    
    ```
    bashCopy codedocker exec -it redis redis-cli -a YourPassword
    
    ```
    
    Replace `YourPassword` with the password you set. If everything is working correctly, you should be able to access the Redis CLI without any errors.
    

Now, in your Python code, you can connect to the Redis instance using the Redis library and providing the password as part of the connection parameters:

```
pythonCopy codeimport redis

r = redis.Redis(
    host='localhost',
    port=6379,
    password='YourPassword'
)

```

Replace `'YourPassword'` with your actual Redis password. Note that if your Python code is running on a different machine, you'll need to replace `'localhost'` with the IP address or hostname of the machine running the Docker containers.

Also, note that exposing Redis to the internet is generally not recommended due to security concerns. It is better to have the Python script running on the same network or machine as the Docker containers. If this is not possible, consider using a VPN or some other secure method to access the Redis instance.

### Make it accessible from the internet

To make the Redis database accessible, you would need to expose its port in the `docker-compose.yml` file. By default, Redis runs on port 6379, so you would add a `ports` directive to the `redis` service in the compose file, like this:

```
yamlCopy coderedis:
  restart: always
  image: redis
  volumes:
    - ./data:/data/
  container_name: redis
  command: redis-server --appendonly yes --protected-mode no --save 60 1 --requirepass YourPassword
  ports:
    - "6379:6379"

```

This will expose the Redis port on the Docker host, making it accessible from other machines. You can then connect to it using the Docker host's IP address and the Redis port.

However, this setup will expose your Redis database to the internet, which is generally not advisable due to security considerations. Redis is not designed to be exposed directly to the internet and doing so can lead to security vulnerabilities.

If you only need to access the Redis database from a specific machine, it would be more secure to only open the port to that IP address. This can be done by specifying the IP address before the port, like this: `"your.ip.address:6379:6379"`.

Even better would be to set up a VPN or SSH tunnel to securely access the Redis database, or to have your Python script run on the same machine or local network as your Docker containers.

Remember, if you make changes to the `docker-compose.yml` file, you need to restart the Docker services for the changes to take effect. This can be done with `docker-compose down` and `docker-compose up -d`.
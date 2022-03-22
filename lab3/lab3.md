# Zad 1
```
docker pull nginx:mainline-alpine
docker run -i -t --name nginx-mainline -p 4200:80 nginx:mainline-alpine
```

# Zad 2
```
FROM busybox
CMD echo "Hello from my dockerfile!"
```
```
docker build .
docker run 
```

# Zad 3
```
FROM nginx
COPY content /usr/share/nginx/html
```
```
docker build -t mojnginx . 
docker run -i -t --name nginxtest -p 4200:80 mojnginx
```

# Zad 4
```
console.log('Hello from Node.js world')
```
```
FROM nginx:mainline-alpine
COPY js /js
COPY content /usr/share/nginx/html
RUN apk add --update nodejs npm
CMD node ./js/index.js
```
```
docker build -t nginxnode . 
docker run -i -t --name nginx_node -p 4200:80 nginxnode
```
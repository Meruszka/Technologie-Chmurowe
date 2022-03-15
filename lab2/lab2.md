# Zad 1
```
docker run -it busybox
echo "hello world! I’m busybox!"
```

# Zad 2

```
docker run -it busybox
ls
docker logs -f clever_feistel
```

# Zad 3

```
docker start -ia e3c2558b008d
```

# Zad 4

```
touch readme.txt
echo "My first file" >> readme.txt
```
## Plik nie isniteje, ponieważ komenda *docker run* tworzy nowy kontener z tego obrazu ##

# Zad 5

```
docker exec -ti e3c2558b008d sh -c "touch createdFile.txt && echo Created from outside>>createdFile.txt"
```

# Zad 6

```
docker create --name=my_container busybox echo "Hello world from my container"
```
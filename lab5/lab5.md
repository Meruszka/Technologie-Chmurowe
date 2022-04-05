# Sprawdz w jakiej sieci jest kontener
```
docker network inspect bridge
```
# Stworzenie kontenera we własnej podsieci
```
docker run -d --net=firstNetwork --name second nginx
```
# Dołącz istniejący kontener do sieci, odłącz kontener od sieci
```
docker network connect firstNetwork first
docker network disconnect bridge first
```
# Zad 4
```
docker volume create db
docker volume inspect db
docker run -d --name dbtest -v /var/lib/docker/volumes/db/_data:/var/lib/postgresql/data -p 5432:5432 -e POSTGRES_PASSWORD=123 postgres
```

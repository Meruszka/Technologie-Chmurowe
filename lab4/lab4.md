# Zad1
## FROM
Określa jaki obraz ma być podstawą naszego kontenera
## WORKDIR
Ustawia working directory
## COPY
Kopiuje pliki/folder z komputera hosta do kontenera
## EXPOSE
Otwiera podanny port
## CMD
Uruchamia podaną komendę

docker build -t my_node_app . 
docker run -i -t --name my_node_app_test -p 8080:8080 my_node_app

# Zad2

[Link do obrazu]https://hub.docker.com/repository/docker/merski001/my_node_app

# Zad3


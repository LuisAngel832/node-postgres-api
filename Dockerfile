# Utiliza la imagen base Debian Bullseye
FROM debian:bullseye

# Actualiza los repositorios de paquetes
RUN apt-get update

# Instala dependencias básicas
RUN apt-get install -y \
    curl \
    make \
    g++

# Configura e instala Node.js 20.x
RUN curl -sL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs

# Copia los archivos de la aplicación al contenedor
ADD . /

# Instala las dependencias de Node.js
RUN npm install

# Expone el puerto 8080 para acceder a la aplicación
EXPOSE 8080

# Comando para ejecutar la aplicación al iniciar el contenedor
CMD ["node", "index.js"]

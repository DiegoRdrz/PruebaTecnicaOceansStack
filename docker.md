# Docker – Oceans React Challenge

Este documento explica cómo levantar el entorno completo del proyecto usando Docker Compose. Incluye el backend (API REST), el frontend (React) y la base de datos (PostgreSQL).

---

## Requisitos previos

Antes de comenzar, asegúrate de tener instalados:

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

---

## Configuración de variables de entorno

Luego de clonar el repositorio, vamos a realizar la correcta instalacion del sistema completo con docker

1. Crea el archivo `.env` del backend

- Navega desde la carpeta hasta el backend cd PruebaTecnicaOceansStack/backend/ y aqui vamos a crear un archivo .env con las siguentes variables

    - PORT=4000
    - DATABASE_URL="postgresql://postgresql:12345@localhost:5432/ocean_db"
    - JWT_SECRET="W9#l@5zB&c8X^Tk!Jr2P$eYq0VuM7hAo" (# Puedes modificar esta Clave por lo que quieras)

2. Correr el comando para montar el contenedor

- docker-compose up --build
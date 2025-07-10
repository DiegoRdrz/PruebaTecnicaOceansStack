# Usar una imagen base oficial de Node
FROM node:22.1

# Crear directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto de archivos
COPY . .

# Generar cliente Prisma
RUN npx prisma generate#

# Ejecutar migraciones de la base de datos
RUN npx prisma migrate deploy

# Exponer el puerto que usa el backend (ajústalo si usas otro)
EXPOSE 4000

# Comando para iniciar el servidor
CMD ["npm", "run", "dev"]

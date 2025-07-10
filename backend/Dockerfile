# Usar una imagen base oficial de Node
FROM node:22.1

# Crear directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto de archivos del proyecto
COPY . .

# Generar el cliente Prisma
RUN npx prisma generate

# Copiar el script de entrada
COPY entrypoint.sh ./entrypoint.sh

# Dar permisos de ejecución al script
RUN chmod +x entrypoint.sh

# Exponer el puerto del backend
EXPOSE 4000

# Comando para iniciar (usando el script que aplica migraciones y arranca)
CMD ["./entrypoint.sh"]
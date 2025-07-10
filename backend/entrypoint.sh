echo "Esperando que la base de datos esté disponible..."

# Esperar a que la base de datos responda
until npx prisma migrate deploy; do
  echo "PostgreSQL no está listo aún. Reintentando en 2 segundos..."
  sleep 2
done

echo " Migraciones aplicadas. Iniciando el servidor..."

# Crear el usuario administrador
npx ts-node src/scripts/createAdmin.ts

# Iniciar tu backend
npm run dev
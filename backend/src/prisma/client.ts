// src/prisma/client.ts
import { PrismaClient } from '@prisma/client';

// Se crea una única instancia de Prisma para manejar las conexiones a la base de datos.
// Esto evita problemas de múltiples conexiones en entornos como desarrollo o serverless.
const prisma = new PrismaClient();

export default prisma;
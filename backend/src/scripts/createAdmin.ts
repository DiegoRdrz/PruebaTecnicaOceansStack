// src/scripts/createAdmin.ts

import prisma from '../prisma/client';
import bcrypt from 'bcrypt';

async function main() {
  // Se encripta la contraseña con bcrypt antes de guardar
  const hashedPassword = await bcrypt.hash('admin123', 10);

  // Crea un usuario con rol ADMIN en la base de datos.
  // Este usuario es necesario para poder registrar otros usuarios desde la app.
  const admin = await prisma.user.create({
    data: {
      name: 'Admin',
      email: 'admin@restaurant.com',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  console.log('Admin creado:', admin);
}

// Ejecuta la función y maneja posibles errores
main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());

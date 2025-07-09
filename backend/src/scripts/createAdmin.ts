// src/scripts/createAdmin.ts
import prisma from '../prisma/client';
import bcrypt from 'bcrypt';

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
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

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
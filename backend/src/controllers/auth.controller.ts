// src/controllers/auth.controller.ts
import { Request, Response } from 'express';
import prisma from '../prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Se define la clave secreta JWT desde las variables de entorno. 
// Si no existe, se usa un valor por defecto.
const JWT_SECRET = process.env.JWT_SECRET || 'clave_secreta';

// Controlador para iniciar sesión de un usuario existente
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: 'Email y contraseña son requeridos' });

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) return res.status(401).json({ message: 'Usuario no encontrado' });

    // Compara la contraseña enviada con la almacenada en la base de datos
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: 'Contraseña incorrecta' });

    // Genera el token JWT con el ID y rol del usuario, válido por 1 día
    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });

    res.json({ token, user: { id: user.id, name: user.name, role: user.role } });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

// Controlador para registrar un nuevo usuario
export const register = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ message: 'Nombre, email y contraseña son requeridos' });

  try {
    // Verifica si el correo ya está registrado
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) return res.status(400).json({ message: 'Email ya registrado' });

    // Encripta la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crea el nuevo usuario con los datos proporcionados
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role || 'MESERO', // Si no se especifica un rol, se asigna MESERO por defecto
      },
    });

    res.status(201).json({ message: 'Usuario creado exitosamente', userId: user.id });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

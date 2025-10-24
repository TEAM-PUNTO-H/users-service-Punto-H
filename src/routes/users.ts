import { Router, Request, Response } from "express";
import { User } from "../models/User";

const router = Router();

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Lista de usuarios
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Retorna todos los usuarios
 */
router.get("/", async (req: Request, res: Response) => {
    try {
    const users = await User.findAll()
    
    res.status(201).json({ message: 'Usuarios',users});
  } catch (error: any) {
    res.status(500).json({ message: 'Error al traer los usuarios', error: error.message });
  }
});

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Crear Usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                email:
 *                  type: string
 *                phoneNumber:
 *                    type: number
 *                workingHours:
 *                    type: string
 *                socialMedia:
 *                    type: string
 *                address:
 *                    type: string
 *                password:
 *                    type: string
 *                role:
 *                    type: string
 *                fullName:
 *                    type: string
 *     responses:
 *       201:
 *         description: Usuario creado
 */
router.post("/", async (req: Request, res: Response) => {
  try {
    const newUser= await User.create(req.body)
    res.status(201).json({ message: 'Usuario creado',newUser: newUser});
  } catch (error: any) {
    res.status(500).json({ message: 'Error al procesar la creacion del usuario', error: error.message });
  }
});

export default router;

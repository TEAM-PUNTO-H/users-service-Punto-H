import { Router, Request, Response } from "express";
import { User } from "../models/User";
import bcrypt from "bcrypt";
import { generateToken, verifyJwt } from "../middlewares/jwt.middleware";
import { authorizeRoles } from "../middlewares/role.middleware";
import { registerSchema } from "../validator/user.validator";

const router = Router();

/**
 * @swagger
 * /api/users/allUsers:
 *   get:
 *     summary: Lista de usuarios
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Retorna todos los usuarios
 */
router.get("/allUsers", verifyJwt, authorizeRoles("admin"), async (req: Request, res: Response) => {
    try {
    const users = await User.findAll()
    
    res.status(201).json({ message: 'Usuarios',users});
  } catch (error: any) {
    res.status(500).json({ message: 'Error al traer los usuarios', error: error.message });
  }
});

/**
 * @swagger
 * /api/users/registerUser:
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
router.post("/registerUser", async (req: Request, res: Response) => {
  try {
    
    const { error } = registerSchema.validate(req.body);  
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const searchUser= await User.findOne({where: {email: req.body.email}})
    if(searchUser){
      return res.status(400).json({message: 'Este correo ya esta en uso'});
    }
    
    const { email, password, phoneNumber, fullName, role, socialMedia, workingHours, address } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    await User.create({email,password: hashedPassword,phoneNumber,fullName,role,socialMedia,
      workingHours,address});

    res.status(201).json({ message: 'Usuario creado exitosamente' });

  } catch (error: any) {
    res.status(500).json({ message: 'Error al procesar la creacion del usuario', error: error.message });
  }
});


/**
 * @swagger
 * /api/users/login:
 *   post:
  *     summary: Iniciar Sesion
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
 *                password:
 *                    type: string
 *     responses:
 *       201:
 *         description: Login exitoso
 */
router.post("/login", async (req: Request, res: Response) => {  

  try {
    const { email, password } = req.body;
    const user: any = await User.findOne({ where: { email } });
    if(!user){
      return res.status(401).json({ message: 'Este usuario no existe' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    if (user) {
      const {email, role, id} = user;
      const token = generateToken(email, role, id);
      res.cookie("accessToken", token, {
        httpOnly: true,
        sameSite: "strict",
        secure: true,
        maxAge: 60 * 60 * 1000,
      });

      res.status(200).json({ message: 'Login exitoso'});
    }
  }
  catch (error: any) {
    res.status(500).json({ message: 'Error al procesar el login del usuario', error: error.message });
  }

  });

export default router;

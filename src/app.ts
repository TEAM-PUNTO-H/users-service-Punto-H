import express from "express";
import swaggerJsdoc from "swagger-jsdoc";
import userRouter from "./routes/users";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());
app.use(express.json());
require('dotenv').config();


const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Usuarios Microservice",
      version: "1.0.0",
      description: "Microservicio que maneja los usuarios",
    },
  },
  apis: ["./src/routes/*.ts"],
});


app.get('/swagger.json', (req,res)=> res.json(swaggerSpec))
app.use("/api/users", userRouter);
app.get('/api/users/health',(_,res)=> res.send({message: 'OK'}));

export default app;
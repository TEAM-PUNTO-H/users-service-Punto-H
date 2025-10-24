import express from "express";
import swaggerJsdoc from "swagger-jsdoc";
import userRouter from "./routes/users";

const app = express();
app.use(express.json());


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
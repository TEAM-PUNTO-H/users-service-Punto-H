import app from "./app";
import {connectDB,sequelize} from './database'

const PORT = process.env.PORT || 4000;

connectDB();
sequelize.sync({alter:true}).then(()=> console.log('Tablas sincronizadas'))

app.listen(PORT, () => {
  console.log("Users service corriendo en http://users-service:4000");
});


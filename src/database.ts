import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(
    process.env.DATABASE_URL!,
  {
    logging: false,
    dialect: 'postgres',
  }
);

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conectado a PostgreSQL');
  } catch (error) {
    console.error('Error conectando a PostgreSQL:', error);
    process.exit(1);
  }
};

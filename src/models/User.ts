import { DataTypes } from 'sequelize';
import { sequelize } from '../database';

export const User = sequelize.define('Users', {
  role: { type: DataTypes.STRING, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  fullName: { type: DataTypes.STRING, allowNull: false },
  socialMedia: {type: DataTypes.STRING, allowNull: true},
  workingHours: {type: DataTypes.STRING, allowNull: true},
  state: {type: DataTypes.STRING, allowNull: false},
  phoneNumber: {type: DataTypes.STRING, allowNull: false},
  address: {type: DataTypes.STRING, allowNull: true},
});

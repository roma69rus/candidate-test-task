import { Sequelize } from "sequelize-typescript";
import dotenv from 'dotenv';
import { User } from "./models/user.model";


dotenv.config();

const sequelize = new Sequelize({
  database: process.env.POSTGRES_DB,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  dialect: 'postgres',
  models: [User],
  logging: console.log,
});

export default sequelize;
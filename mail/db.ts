import { Sequelize } from "sequelize-typescript";
import dotenv from 'dotenv';
import { Mail } from "./models/mail.model";


dotenv.config();

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  models: [Mail],
  logging: console.log,
});

export default sequelize;
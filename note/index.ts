import express, { Express, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import sequilize from './db';
import cors from 'cors';
import routes from './route/router';
import ErrorHandler from './middleware/ErrorHandlingMiddleware'
import path from 'path'


dotenv.config();
const PORT = process.env.PORT || 6000;

//Middleware
const app: Express = express();
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, "static")))
app.use('/api', routes)

// LAST middleware
app.use(ErrorHandler)


const start = async function start() {
  try {
    await sequilize.authenticate()
    console.log('Connection has been established successfully.');
    await sequilize.sync()
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
  } catch (error) {
    console.log(error)
  }
}

start();


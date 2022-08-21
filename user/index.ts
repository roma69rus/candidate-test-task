import express, { Express, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import sequilize from './db';
import cors from 'cors';
import routes from './route/router';
import ErrorHandler from './middleware/ErrorHandlingMiddleware'
import amqplib from 'amqplib'
import client, {Connection, Channel} from 'amqplib'
import { CREATE_NOTE_QUEUE, DELETE_NOTE_QUEUE, SEND_MAIL_QUEUE, UPDATE_NOTE_QUEUE } from './utils/consts';


dotenv.config();
const PORT = process.env.PORT || 7000;

//Middleware
const app: Express = express();
app.use(cors())
app.use(express.json())
app.use('/api', routes)

// LAST middleware
app.use(ErrorHandler)

export let rabbitConn: Connection;
export let ch1: Channel;

const start = async function start() {
  try {
    await sequilize.authenticate()
    await sequilize.sync()
    console.log('Connection has been established successfully.');

    rabbitConn = await amqplib.connect('amqp://localhost');

    ch1 = await rabbitConn.createChannel();
    ch1.prefetch(1, true)
    await ch1.assertQueue(SEND_MAIL_QUEUE)


    app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

    
  } catch (error) {
    console.log(error)
  }

}

start();


import express, { Express, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import sequilize from './db';
import cors from 'cors';
import routes from './route/router';
import ErrorHandler from './middleware/ErrorHandlingMiddleware'
import path from 'path'
import amqplib from 'amqplib'
import { CREATE_NOTE_QUEUE, DELETE_NOTE_QUEUE, SEND_MAIL_QUEUE, UPDATE_NOTE_QUEUE } from './utils/consts';
import mailService from './service/mailService';



dotenv.config();
const PORT = process.env.PORT || 5000;

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

    const conn = await amqplib.connect('amqp://localhost');

    const ch1 = await conn.createChannel();
    ch1.prefetch(1, true)
    await ch1.assertQueue(SEND_MAIL_QUEUE);

    // Listener
    ch1.consume(SEND_MAIL_QUEUE, (msg) => {
      if (msg !== null) {

        mailService.createMailAMQP({
          to: msg.content.toString(),
          from: "default-SMPTServer-Email@host.ru",
          subject: "Hi",
          text: "Thanks for registration",
        })
        setTimeout(() => {
          ch1.ack(msg);
        }, 1000)

      } else {
        console.log('Consumer cancelled by server');
      }
    });


    app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

  } catch (error) {
    console.log(error)
  }
}

start();


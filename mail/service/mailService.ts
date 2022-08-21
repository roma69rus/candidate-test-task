const jwt = require('jsonwebtoken')
import dotenv from 'dotenv';
import { IMailInput, Mail } from '../models/mail.model';


dotenv.config();


class MailService {

  constructor() { }

  
  async createMailWithToken(dto: IMailInput, token: string) {
    
    //SAVE MAIL IN DB
    const decoded = jwt.verify(token, process.env.SECRET_KEY,)
    const mail = await Mail.create({...dto, from: decoded.email})

    //SEND MAIL (Nodemailer) 
    console.log("Sended mail..: ", dto.text)
    console.log("From: ", decoded.email)
    console.log("To: ", dto.to)

    return mail
  };
  async createMailAMQP (dto: IMailInput) {
    
    //SAVE MAIL IN DB
    const mail = await Mail.create({...dto})

    //SEND MAIL (Nodemailer) 
    console.log("Sended mail..: ", dto.text)
    console.log("From: ", dto.from)
    console.log("To: ", dto.to)

    return mail
  };

  async getAllMails() {
    const notes = await Mail.findAll();
    return notes
  }



}

export default new MailService();
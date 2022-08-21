import { Request, Response, NextFunction } from 'express';
import ApiError from '../error/ApiError';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { IMailInput, Mail } from '../models/mail.model';
import dotenv from 'dotenv';
import mailService from '../service/mailService';

dotenv.config();


class UserController {

  constructor() {

  }

  
  async postMail(req: Request, res: Response, next: NextFunction): Promise<any> {
    const { to, subject, text } = req.body

    const token = (req.headers.authorization as string).split(' ')[1] // Bearer asfasnfkajsfnjk
    if (!token) {
      return res.status(401).json({ message: "Не авторизован" })
    }

    try {
      const mail = await mailService.createMailWithToken({to, subject, text, from: ""}, token);
      return res.json(mail)
    } catch (error) {
      next(ApiError.badRequest(`Ошибка при отправке MAIL: \n${error}`))
    }
  }
  
  async getAllMails(req: Request, res: Response, next: NextFunction): Promise<any> {
    const mails = await Mail.findAll()
    return res.json(mails)
  }



}

export default new UserController();
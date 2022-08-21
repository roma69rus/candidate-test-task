import { Request, Response, NextFunction } from 'express';
import ApiError from '../error/ApiError';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { User } from '../models/user.model';
import dotenv from 'dotenv';
import { ch1 } from '..';
import { SEND_MAIL_QUEUE } from '../utils/consts';

dotenv.config();

const generateJwt = (id: string, email: string) => {
  return jwt.sign(
    { id, email },
    process.env.SECRET_KEY as string,
    { expiresIn: '24h' }
  )
}

class UserController {

  constructor() {

  }

  async registration(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const { email, password } = req.body
      if (!email || !password) {
        return next(ApiError.badRequest('Некорректный email или пароль'));
      }

      const candidate = await User.findOne({ where: { email: email } })
      if (candidate) {
        return next(ApiError.badRequest('Пользователь с таким email уже существует'))
      }

      const hashPassword = await bcrypt.hash(password, 5)
      const user = await User.create({ email, password: hashPassword })
      const id = user.get('id').toString();
      const token = generateJwt(id, email)

      ch1.sendToQueue(SEND_MAIL_QUEUE, Buffer.from(JSON.stringify({to: user.email}))); 

      return res.json({ token });
    } catch (error) {
      next(ApiError.internal(`Ошибка на сервере при регистрации нового пользователя: \n${error}`))
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const { email, password } = req.body

      const user = await User.findOne({ where: { email } })
      const id = user?.get('id').toString();
      const pass = user?.get('password');

      if (!user) {
        return next(ApiError.badRequest('Пользователь не найден'))
      }
      let comparePassword = bcrypt.compareSync(password, pass as string)
      if (!comparePassword) {
        return next(ApiError.badRequest('Указан неверный пароль'))
      }
      const token = generateJwt(id as string, email)
      return res.json({ token })
    } catch (error) {
      next(ApiError.internal(`Ошибка в операции LOGIN на сервере: \n${error}`))
    }
  }
  async check(req: Request, res: Response, next: NextFunction): Promise<any> {
    const token = generateJwt(req.body.user.id, req.body.user.email)
    return res.json({ token })
  }
  
  async getAllUsers(req: Request, res: Response, next: NextFunction): Promise<any> {
    const user = await User.findAll()
    return res.json(user)
  }


  async deleteUser(req: Request, res: Response, next: NextFunction): Promise<any> {
    const { email } = req.body
    if (!email) {
      return next(ApiError.badRequest('Введите email'));
    }

    const deleteCandidate = await User.findOne({ where: { email: email } })
    if (!deleteCandidate) {
      return next(ApiError.badRequest('Такого пользователя не существует'))
    }

    deleteCandidate.destroy();

    return res.json(deleteCandidate);

  }
}

export default new UserController();
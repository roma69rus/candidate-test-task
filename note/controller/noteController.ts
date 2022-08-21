import { Request, Response, NextFunction } from 'express';
import ApiError from '../error/ApiError';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import dotenv from 'dotenv';
import { INoteInput, Note } from '../models/note.model';
import NoteService from '../service/noteService';

dotenv.config();


class NoteController {

  constructor() {
  }

  async getAllNotes(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const notes = await NoteService.getAll();
      return res.json(notes)
    } catch (error) {
      next(ApiError.badRequest(`Ошибка при запросе Notes: \n${error}`))
    }
  }


  async createNote(req: Request, res: Response, next: NextFunction): Promise<any> {
    const { text }: INoteInput = req.body

    const token = (req.headers.authorization as string).split(' ')[1] // Bearer asfasnfkajsfnjk
    if (!token) {
      return res.status(401).json({ message: "Не авторизован" })
    }

    try {
      const note = await NoteService.create(text, token);
      return res.json(note)
    } catch (error) {
      next(ApiError.badRequest(`Ошибка при создании Note: \n${error}`))
    }
  }

  async updateNote(req: Request, res: Response, next: NextFunction): Promise<any> {
    const { text, owner }: INoteInput = req.body
    let { id } = req.params;

    const token = (req.headers.authorization as string).split(' ')[1] // Bearer asfasnfkajsfnjk
    if (!token) {
      return res.status(401).json({ message: "Не авторизован" })
    }

    try {
      const note = await NoteService.update(Number(id), text, token);
      return res.json(note)
    } catch (error) {
      next(ApiError.badRequest(`Ошибка при обновлении Note: \n${error}`))
    }
  }

  async deleteNote(req: Request, res: Response, next: NextFunction): Promise<any> {
    let { id } = req.body;
    const token = (req.headers.authorization as string).split(' ')[1] // Bearer asfasnfkajsfnjk

    try {
      const note = await NoteService.delete(Number(id), token);
      return res.json(note)
    } catch (error) {
      next(ApiError.badRequest(`Ошибка при удалении Note: \n${error}`))
    }
  }
}

export default new NoteController();
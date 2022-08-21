import { INoteInput, Note } from "../models/note.model";
const jwt = require('jsonwebtoken')
import dotenv from 'dotenv';


dotenv.config();


class NoteService {

  constructor() { }

  async create(text: string, token: string) {
    const decoded = jwt.verify(token, process.env.SECRET_KEY,)
    const note = await Note.create({text, owner: decoded.email.toString()})
    return note
  };

  async getAll() {
    const notes = await Note.findAll();
    return notes
  }

  async update(id: number, text: string, token: string) {

    const note = await Note.findOne({ where: { id } });

    if (note) {
      const decoded = jwt.verify(token, process.env.SECRET_KEY,)
      if (decoded.email == note?.owner) {
        note!.text = text;
        await note?.save()
      }

    }
    return note
  }

  async delete(id: number, token: string) {
    const note = await Note.findOne({ where: { id } });
    if (note) {
      const decoded = jwt.verify(token, process.env.SECRET_KEY,)
      if (decoded.email == note?.owner) {
        note.destroy()
      }
    }
    return note
  }

}

export default new NoteService();
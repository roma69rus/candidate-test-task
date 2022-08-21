import { Router } from "express";
import noteController from "../controller/noteController";
import authMiddleware from "../middleware/authMiddleware";


const router = Router(); 


router.get('/', noteController.getAllNotes)
router.post('/create', authMiddleware, noteController.createNote)
router.put('/update/:id', authMiddleware, noteController.updateNote)
router.delete('/del', authMiddleware, noteController.deleteNote)


export default router;
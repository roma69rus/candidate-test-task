import { Router } from "express";
import mailController from "../controller/mailController";
import authMiddleware from "../middleware/authMiddleware";


const router = Router(); 


router.post('/post', authMiddleware, mailController.postMail)
router.get('/getAllMails', authMiddleware, mailController.getAllMails)



export default router;
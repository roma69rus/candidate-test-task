import { Router } from "express";
import userController from "../controller/userController";
import authMiddleware from "../middleware/authMiddleware";


const router = Router(); 


router.get('/auth', authMiddleware, userController.check)
router.get('/', authMiddleware, userController.getAllUsers)
router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.delete('/del', authMiddleware, userController.deleteUser)


export default router;
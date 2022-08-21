import { Router } from "express";
import mailRouter from "./mailRoute"

const router = Router(); 


router.use('/mail', mailRouter)


export default router;
import { Router } from "express";
import noteRouter from "./noteRoute"

const router = Router(); 


router.use('/note', noteRouter)


export default router;
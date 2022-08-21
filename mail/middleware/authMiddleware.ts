import { Request, Response, NextFunction } from 'express';
const jwt = require('jsonwebtoken')

export default function (req:Request, res:Response, next: NextFunction):any {
    if (req.method === "OPTIONS") {
        next()
    }
    try {
        const token:string = (req.headers.authorization as string).split(' ')[1] // удаляем Bearer
        
        if (!token) {
            return res.status(401).json({message: "Не авторизован"})
        }  
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        // const decoded = jwt.verify(token, "SEC")
        console.log("decoded", decoded) 
        req.body.user = decoded
        console.log("req.body.user", req.body.user) 
        next()
    } catch (e) {
        res.status(401).json({message: "Не авторизован"})
    }
};

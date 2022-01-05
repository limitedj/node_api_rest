
import { validationResult } from 'express-validator';
import { NextFunction, Request, Response } from 'express';



export const validarCampos = (req:Request, res:Response, next:NextFunction) => {


    const err = validationResult(req);
    if (!err.isEmpty()) {
        return res.status(400).json({
            ok: false,
            // msg: JSON.stringify(error.mapped()),
            error: err.mapped(),
            // msg: error.mapped(),
            body: req.body
        });
    }
    
    next();

}


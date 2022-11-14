
import { validationResult } from 'express-validator';
import { NextFunction, Request, Response } from 'express';
import { json } from 'stream/consumers';


export const validarCampos = (req:Request, res:Response, next:NextFunction) => {

    const err = validationResult(req);
    if (!err.isEmpty()) {
        return res.status(400).json(err.mapped());
        // return res.status(400).json(err.array());
    }
    
next();
    
}

// ok: false,
// msg: JSON.stringify(error.mapped()),
// error: err.mapped(),

// msg: error.mapped(),
// body: req.body

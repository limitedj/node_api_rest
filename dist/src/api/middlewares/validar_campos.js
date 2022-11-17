"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarCampos = void 0;
const express_validator_1 = require("express-validator");
const validarCampos = (req, res, next) => {
    const err = express_validator_1.validationResult(req);
    if (!err.isEmpty()) {
        return res.status(400).json(err.mapped());
        // return res.status(400).json(err.array());
    }
    next();
};
exports.validarCampos = validarCampos;
// ok: false,
// msg: JSON.stringify(error.mapped()),
// error: err.mapped(),
// msg: error.mapped(),
// body: req.body
//# sourceMappingURL=validar_campos.js.map
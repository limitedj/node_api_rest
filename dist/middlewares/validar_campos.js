"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarCampos = void 0;
const express_validator_1 = require("express-validator");
const validarCampos = (req, res, next) => {
    const err = express_validator_1.validationResult(req);
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
};
exports.validarCampos = validarCampos;
//# sourceMappingURL=validar_campos.js.map
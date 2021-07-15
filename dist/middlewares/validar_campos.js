"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarCampos = void 0;
const express_validator_1 = require("express-validator");
const validarCampos = (req, res, next) => {
    const error = express_validator_1.validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({
            ok: false,
            error: error.mapped()
        });
    }
    next();
};
exports.validarCampos = validarCampos;
//# sourceMappingURL=validar_campos.js.map
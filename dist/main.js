var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
define("db/connection", ["require", "exports", "sequelize", "dotenv"], function (require, exports, sequelize_1, dotenv_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    dotenv_1 = __importDefault(dotenv_1);
    dotenv_1.default.config();
    const db = new sequelize_1.Sequelize(process.env.DB_NOMBRE, process.env.DB_USER, process.env.DB_PASSWORD, { host: process.env.DB_SERVER,
        dialect: process.env.DB_DIALECT,
        port: process.env.DB_PORT,
        //logging: false
    });
    exports.default = db;
});
define("models/usuario", ["require", "exports", "sequelize", "db/connection"], function (require, exports, sequelize_2, connection_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    connection_1 = __importDefault(connection_1);
    const Usuario = connection_1.default.define('usuario', {
        // id:{
        //     type: DataTypes.INTEGER,
        //     autoIncrement: true,
        //     primaryKey: true,
        //     allowNull: false
        // },
        nombre: {
            type: sequelize_2.DataTypes.STRING,
            allowNull: false
        },
        apellido: {
            type: sequelize_2.DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: sequelize_2.DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: sequelize_2.DataTypes.STRING,
            allowNull: false
        },
        imagen: {
            type: sequelize_2.DataTypes.STRING,
        },
        estado: {
            type: sequelize_2.DataTypes.BOOLEAN,
            defaultValue: true
        },
        google: {
            type: sequelize_2.DataTypes.BOOLEAN,
            allowNull: true
        },
    });
    // User.belongsToMany(Project, { as: 'Tasks', through: 'worker_tasks', foreignKey: 'userId' })
    // Project.belongsToMany(User, { as: 'Workers', through: 'worker_tasks', foreignKey: 'projectId' })
    // Usuario.belongsToMany(Rol, {through: 'Usuario_rol', foreignKey: 'usuario_id' })
    // Usuario.belongsToMany(Rol, {through: {model: Usuario_rol}});
    exports.default = Usuario;
});
define("models/rol", ["require", "exports", "sequelize", "db/connection"], function (require, exports, sequelize_3, connection_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    connection_2 = __importDefault(connection_2);
    //Modelo de Roles
    const Rol = connection_2.default.define('roles', {
        codigo: {
            type: sequelize_3.DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        descripcion: {
            type: sequelize_3.DataTypes.STRING,
            allowNull: true
        },
    }, {
        // timestamps : false,
        freezeTableName: true,
        tableName: 'roles',
    });
    // Rol.belongsToMany(Usuario, {through:'Usuario_rol', foreignKey: 'rol_id'});
    exports.default = Rol;
});
define("controllers/usuarios", ["require", "exports", "models/usuario", "bcryptjs", "models/rol"], function (require, exports, usuario_1, bcryptjs_1, rol_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.deleteUsuario = exports.putUsuario = exports.crearUsuario = exports.getUsuario = exports.getUsuarios = exports.getUsuariosPag = void 0;
    usuario_1 = __importDefault(usuario_1);
    bcryptjs_1 = __importDefault(bcryptjs_1);
    rol_1 = __importDefault(rol_1);
    require("../models/asociaciones");
    //Obtener todos los Usuarios paginados
    const getUsuariosPag = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { limite = 5, desde = 5 } = req.query;
        const usuarios = yield usuario_1.default.findAndCountAll({
            // where: {...},
            // order: [...],
            limit: Number(limite),
            offset: Number(desde)
        });
        // .then(function (result) {
        //     res.json({ usuario });
        // });    
        res.json({ usuarios });
    });
    exports.getUsuariosPag = getUsuariosPag;
    //Obtener todos los Usuarios
    const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const usuarios = yield usuario_1.default.findAll({ include: rol_1.default });
        res.json({ usuarios });
    });
    exports.getUsuarios = getUsuarios;
    //Obtener un usuario por id
    const getUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const usuario = yield usuario_1.default.findByPk(id /*, {include:[Rol]}*/);
        if (usuario) {
            res.json({ usuario });
        }
        else {
            return res.status(404).json({
                msg: `No existe un usuario con el id ${id}`
            });
        }
    });
    exports.getUsuario = getUsuario;
    // Crear Usuarios
    const crearUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        // const error = validationResult(req);
        // if (!error.isEmpty()) {
        //     return res.status(400).json({
        //         ok: false,
        //         error: error.mapped()
        //     })
        // };
        const { body } = req;
        const token = req.header('x-token') || '';
        const { password } = body;
        try {
            const existeEmail = yield usuario_1.default.findOne({
                where: {
                    email: body.email
                }
            });
            if (existeEmail) {
                return res.status(400).json({
                    msg: 'Ya existe el usuario con el email ' + body.email
                });
            }
            const salt = bcryptjs_1.default.genSaltSync();
            body.password = bcryptjs_1.default.hashSync(password, salt);
            const usuario = yield usuario_1.default.create(body);
            // await usuario.addRols([Rol,body.rol]);
            // .then(body.rol => {        });
            // const usuario = await Usuario.create({
            //     nombre: body.nombre,
            //     apellido: body.apellido,
            //     email: body.email,
            //     password: body.password,
            //     imagen: body.imagen,
            //     estado: body.estado,
            //     google: body.google,
            //     rol:{
            //         id:body.rol,
            //     },
            //     {include: "Rol_menu"}
            // });
            yield usuario.save();
            res.status(200).json({
                ok: true,
                msg: 'La actualización se realizó con éxito',
                usuario,
                token
            });
            //  res.json(usuario);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                msg: 'Hable con el administrador Miguel Angel'
            });
        }
    });
    exports.crearUsuario = crearUsuario;
    //Actualizar un usuario
    const putUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const _a = req.body, { password, google, email } = _a, resto = __rest(_a, ["password", "google", "email"]);
        if (password) {
            // Encriptar la contraseña
            const salt = bcryptjs_1.default.genSaltSync();
            resto.password = bcryptjs_1.default.hashSync(password, salt);
        }
        try {
            const usuario = yield usuario_1.default.findByPk(id, resto);
            if (!usuario) {
                return res.status(404).json({
                    msg: 'No existe un usuario con el id ' + id
                });
            }
            yield usuario.update(resto);
            yield usuario.save();
            res.status(200).json({
                ok: true,
                msg: 'La actualización se realizó con éxito'
            });
            // res.json(usuario);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                msg: 'Hable con el administrador Update'
            });
        }
    });
    exports.putUsuario = putUsuario;
    const deleteUsuario = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const usuario = yield usuario_1.default.findByPk(id);
        if (!usuario) {
            return res.status(400).json({
                msg: 'No existe un usuario con el id ' + id
            });
        }
        if (!usuario) {
            return res.status(400).json({
                msg: 'No existe un usuario con el id ' + id
            });
        }
        yield usuario.update({ estado: false });
        res.json(usuario);
    });
    exports.deleteUsuario = deleteUsuario;
});
define("middlewares/validar_campos", ["require", "exports", "express-validator"], function (require, exports, express_validator_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.validarCampos = void 0;
    const validarCampos = (req, res, next) => {
        const err = (0, express_validator_1.validationResult)(req);
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
});
define("helpers/db-validators", ["require", "exports", "models/rol", "models/usuario"], function (require, exports, rol_2, usuario_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.exiteUsuarioPorId = exports.existeId = exports.existeEmail = exports.esRolValido = void 0;
    rol_2 = __importDefault(rol_2);
    usuario_2 = __importDefault(usuario_2);
    const esRolValido = (rol = '') => __awaiter(void 0, void 0, void 0, function* () {
        const existeRol = yield rol_2.default.findOne({ where: { codigo: rol } });
        if (!existeRol) {
            throw new Error(`El rol ${rol} no está registrado en la BD`);
        }
    });
    exports.esRolValido = esRolValido;
    const existeEmail = (email = '') => __awaiter(void 0, void 0, void 0, function* () {
        const existeEmail = yield usuario_2.default.findOne({ where: { email: email } });
        if (existeEmail) {
            throw new Error(`El email ${email} ya esta registrado en la base de datos`);
        }
    });
    exports.existeEmail = existeEmail;
    const existeId = (id = 0) => __awaiter(void 0, void 0, void 0, function* () {
        const existeId = yield usuario_2.default.findOne({ where: { id: id } });
        if (existeId) {
            throw new Error(`El id ${id} ya esta registrado en la base de datos`);
        }
    });
    exports.existeId = existeId;
    const exiteUsuarioPorId = (id = 0) => __awaiter(void 0, void 0, void 0, function* () {
        const existeId = yield usuario_2.default.findOne({ where: { id: id } });
        if (!existeId) {
            throw new Error(`El usuario con el id ${id} no existe en la base de datos`);
        }
    });
    exports.exiteUsuarioPorId = exiteUsuarioPorId;
});
define("middlewares/validar-jwt", ["require", "exports", "models/usuario", "jsonwebtoken"], function (require, exports, usuario_3, jsonwebtoken_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    usuario_3 = __importDefault(usuario_3);
    jsonwebtoken_1 = __importDefault(jsonwebtoken_1);
    const validarJWT = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const token = req.header('x-token') || '';
        console.log(`Aqui debe mostrar el toKen = ${token}`);
        if (!token) {
            return res.status(401).json({
                ok: false,
                msg: `error en el token (validar JWT)`
            });
        }
        try {
            const { uid, nombre } = jsonwebtoken_1.default.verify(token, process.env.SECRETORPRIVATEKEY);
            req.uid = uid;
            req.nombre = nombre;
            console.log(uid, nombre);
            const usuario = yield usuario_3.default.findByPk(uid);
            //Verificar si el usuario que solicita el servicio existe en la BD
            if (!usuario) {
                return res.status(401).json({
                    msg: 'Token no válido - usuario no existe en la BD'
                });
            }
            // Verificar si el uid tiene estado en true
            if (!(usuario === null || usuario === void 0 ? void 0 : usuario.estado)) {
                return res.status(401).json({
                    msg: 'Token no válido - usuario con estado false'
                });
            }
            next();
        }
        catch (error) {
            return res.status(401).json({
                ok: false,
                msg: 'Token no válido'
            });
        }
        // TODO OK!
    });
    exports.default = validarJWT;
});
define("middlewares/validar-roles", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.tieneRole = exports.esAdminRole = void 0;
    const esAdminRole = (req, res, next) => {
        if (!req.usuario) {
            return res.status(500).json({
                msg: 'Se quiere verificar el role sin validar el token primero'
            });
        }
        const { rol, nombre } = req.usuario;
        if (rol !== 'ADMIN_ROLE') {
            return res.status(401).json({
                msg: `${nombre} no es administrador - No puede hacer esto`
            });
        }
        next();
    };
    exports.esAdminRole = esAdminRole;
    const tieneRole = (...roles) => {
        return (req, res, next) => {
            if (!req.usuario) {
                return res.status(500).json({
                    msg: 'Se quiere verificar el role sin validar el token primero'
                });
            }
            if (!roles.includes(req.usuario.rol)) {
                return res.status(401).json({
                    msg: `El servicio requiere uno de estos roles ${roles}`
                });
            }
            next();
        };
    };
    exports.tieneRole = tieneRole;
});
define("routes/usuarios", ["require", "exports", "express", "express-validator", "controllers/usuarios", "middlewares/validar_campos", "helpers/db-validators", "middlewares/validar-jwt", "middlewares/validar-roles"], function (require, exports, express_1, express_validator_2, usuarios_1, validar_campos_1, db_validators_1, validar_jwt_1, validar_roles_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    validar_jwt_1 = __importDefault(validar_jwt_1);
    const router = (0, express_1.Router)();
    router.get('/', usuarios_1.getUsuarios);
    //router.get('/',          getUsuariosPag);
    router.get('/:id', usuarios_1.getUsuario);
    router.post('/crear', [
        validar_jwt_1.default,
        //    esAdminRole,
        (0, express_validator_2.check)('nombre', 'El nombre es obligatorio').notEmpty(),
        //    check('email','El email es obligatorio').normalizeEmail().isEmail().notEmpty(),
        (0, express_validator_2.check)('password', 'El password es obligatorio').notEmpty(),
        (0, express_validator_2.check)('password', 'El password debe tener mas de 6 digitos').isLength({ min: 6 }),
        //    check('rol','el rol no exite en la base de datos').notEmpty().custom(esRolValido),
        (0, express_validator_2.check)('email', 'inconveniente con el email').notEmpty().custom(db_validators_1.existeEmail).isEmail(),
        validar_campos_1.validarCampos
    ], usuarios_1.crearUsuario);
    router.put('/:id', [
        // check('password','El password debe tener mas de 6 digitos').isLength({min:6}),
        // check('id').custom(existeId),    
        (0, express_validator_2.check)('rol').notEmpty().custom(db_validators_1.esRolValido),
        // check('email').notEmpty().custom(existeEmail).isEmail(),
        validar_campos_1.validarCampos
    ], usuarios_1.putUsuario);
    router.delete('/:id', [
        validar_jwt_1.default,
        validar_roles_1.esAdminRole,
        (0, express_validator_2.check)('id', 'no es un id valido').notEmpty(),
        (0, express_validator_2.check)('id').custom(db_validators_1.exiteUsuarioPorId),
        validar_campos_1.validarCampos
    ], usuarios_1.deleteUsuario);
    exports.default = router;
});
define("helpers/generarJWT", ["require", "exports", "jsonwebtoken"], function (require, exports, jsonwebtoken_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    jsonwebtoken_2 = __importDefault(jsonwebtoken_2);
    // interface UserPayload {
    //     id: string;
    //   }
    //   interface JwtExpPayload {
    //     expiresIn: string;
    //     exp: number;
    //   }
    const generarJWT = (uid = '', nombre) => {
        return new Promise((resolve, reject) => {
            const payload = { uid, nombre };
            jsonwebtoken_2.default.sign(payload, process.env.SECRETORPRIVATEKEY, {
                expiresIn: '4h'
            }, (err, token) => {
                if (err) {
                    console.log(err);
                    reject('No se pudo generar el token');
                }
                else {
                    resolve(token);
                }
            });
        });
    };
    exports.default = generarJWT;
});
define("controllers/auth", ["require", "exports", "models/usuario", "bcryptjs", "helpers/generarJWT"], function (require, exports, usuario_4, bcryptjs_2, generarJWT_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.revalidarToken = exports.login = void 0;
    usuario_4 = __importDefault(usuario_4);
    bcryptjs_2 = __importDefault(bcryptjs_2);
    generarJWT_1 = __importDefault(generarJWT_1);
    const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password } = req.body;
        try {
            // Verificar si el email existe
            const usuario = yield usuario_4.default.findOne({ where: { email: email } });
            if (!usuario) {
                return res.status(400).json({
                    msg: 'Usuario / Password no son correctos - correo'
                });
            }
            // Si el usuario está activo
            if (!usuario.estado) {
                return res.status(400).json({
                    msg: 'Usuario / Password no son correctos - estado: false'
                });
            }
            // Validar contraseña
            console.log(usuario.password);
            const validPassword = bcryptjs_2.default.compareSync(password, usuario.password);
            if (!validPassword) {
                return res.status(400).json({
                    msg: 'Usuario / Password no son correctos - password: incorrecto'
                });
            }
            //Generar el JWT
            const uid = (usuario.id).toString();
            const token = yield (0, generarJWT_1.default)(uid, usuario.nombre);
            //    console.log(usuario.password);
            res.json({
                ok: true,
                uid: usuario.id,
                nombre: usuario.nombre,
                email: usuario.email,
                token
            });
        }
        catch (error) {
            res.json(500).json({
                msg: 'Hable con el Administrador'
            });
        }
    });
    exports.login = login;
    const revalidarToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { uid } = req;
        // Leer la base de datos
        const usuario = yield usuario_4.default.findByPk(uid);
        // Generar el JWT
        const token = yield (0, generarJWT_1.default)(uid, usuario === null || usuario === void 0 ? void 0 : usuario.nombre);
        // const token = await generarJWT((req.uid), req.nombre);
        console.log(`${req.uid}  ${req.nombre} nuevo token generado = ${token}`);
        return res.json({
            ok: true,
            msg: 'Renew',
            uid: usuario === null || usuario === void 0 ? void 0 : usuario.id,
            nombre: usuario === null || usuario === void 0 ? void 0 : usuario.nombre,
            email: usuario === null || usuario === void 0 ? void 0 : usuario.email,
            token
        });
    });
    exports.revalidarToken = revalidarToken;
});
define("routes/auth", ["require", "exports", "express", "express-validator", "controllers/auth", "middlewares/validar-jwt", "middlewares/validar_campos"], function (require, exports, express_2, express_validator_3, auth_1, validar_jwt_2, validar_campos_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    validar_jwt_2 = __importDefault(validar_jwt_2);
    const router = (0, express_2.Router)();
    router.post('/login', [
        (0, express_validator_3.check)('email', 'El email es obligatorio y/o formato de no valido').isEmail(),
        (0, express_validator_3.check)('password', 'El password es obligatorio').isLength({ min: 6 }),
        validar_campos_2.validarCampos
    ], auth_1.login);
    router.get('/renew', validar_jwt_2.default, auth_1.revalidarToken);
    exports.default = router;
});
define("models/menu", ["require", "exports", "sequelize", "db/connection"], function (require, exports, sequelize_4, connection_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    connection_3 = __importDefault(connection_3);
    const Menu = connection_3.default.define('menus', {
        codigo: {
            type: sequelize_4.DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        descripcion: {
            type: sequelize_4.DataTypes.STRING,
            allowNull: true
        },
        url: {
            type: sequelize_4.DataTypes.STRING,
            allowNull: true
        },
    });
    exports.default = Menu;
});
// id integer GENERATED ALWAYS AS IDENTITY NOT NULL,
// codigo character varying NOT NULL,
// menu_id integer,
// url character varying,
define("controllers/menus", ["require", "exports", "bcryptjs", "models/menu"], function (require, exports, bcryptjs_3, menu_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.deleteMenu = exports.putMenu = exports.crearMenu = exports.getMenu = exports.getMenus = exports.getMenusPag = void 0;
    bcryptjs_3 = __importDefault(bcryptjs_3);
    menu_1 = __importDefault(menu_1);
    //Obtener todos los Menus paginados
    const getMenusPag = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { limite = 5, desde = 5 } = req.query;
        const menus = yield menu_1.default.findAndCountAll({
            // where: {...},
            // order: [...],
            limit: Number(limite),
            offset: Number(desde)
        });
        // .then(function (result) {
        //     res.json({ Menus });
        // });    
        res.json({ menus });
    });
    exports.getMenusPag = getMenusPag;
    //Obtener todos los Menus
    const getMenus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const menus = yield menu_1.default.findAll();
        res.json({ menus });
    });
    exports.getMenus = getMenus;
    //Obtener un Menus por id
    const getMenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const menus = yield menu_1.default.findByPk(id);
        if (menus) {
            res.json({ menus });
        }
        else {
            return res.status(404).json({
                msg: `No existe un menu con el id ${id}`
            });
        }
    });
    exports.getMenu = getMenu;
    // Crear Menu
    const crearMenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        // const error = validationResult(req);
        // if (!error.isEmpty()) {
        //     return res.status(400).json({
        //         ok: false,
        //         error: error.mapped()
        //     })
        // };
        const { body, headers } = req;
        const token = req.header('x-token') || '';
        const { password } = body;
        try {
            const existeMenu = yield menu_1.default.findOne({
                where: {
                    codigo: body.codigo
                }
            });
            if (existeMenu) {
                return res.status(400).json({
                    msg: 'Ya existe el menu con el codigo ' + body.codigo
                });
            }
            // const salt = bcryptjs.genSaltSync();
            // body.password = bcryptjs.hashSync(password, salt);
            const menu = yield menu_1.default.create(body);
            yield menu.save();
            res.status(200).json({
                ok: true,
                msg: 'El menu se creo con éxito',
                menu,
                token
            });
            //  res.json(usuario);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                msg: 'Hable con el Administrador'
            });
        }
    });
    exports.crearMenu = crearMenu;
    //Actualizar un usuario
    const putMenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const _a = req.body, { password, google, email } = _a, resto = __rest(_a, ["password", "google", "email"]);
        if (password) {
            // Encriptar la contraseña
            const salt = bcryptjs_3.default.genSaltSync();
            resto.password = bcryptjs_3.default.hashSync(password, salt);
        }
        try {
            const menu = yield menu_1.default.findByPk(id, resto);
            if (!menu) {
                return res.status(404).json({
                    msg: 'No existe un usuario con el id ' + id
                });
            }
            yield menu.update(resto);
            yield menu.save();
            res.status(200).json({
                ok: true,
                msg: 'La actualización se realizó con éxito'
            });
            // res.json(Menu);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                msg: 'Hable con el administrador Update'
            });
        }
    });
    exports.putMenu = putMenu;
    const deleteMenu = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const menu = yield menu_1.default.findByPk(id);
        if (!menu) {
            return res.status(400).json({
                msg: 'No existe un menu con el id ' + id
            });
        }
        if (!menu) {
            return res.status(400).json({
                msg: 'No existe un menu con el id ' + id
            });
        }
        yield menu.update({ estado: false });
        res.json(menu);
    });
    exports.deleteMenu = deleteMenu;
});
define("routes/menus", ["require", "exports", "express", "express-validator", "controllers/menus", "middlewares/validar_campos"], function (require, exports, express_3, express_validator_4, menus_1, validar_campos_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const router = (0, express_3.Router)();
    router.get('/', menus_1.getMenus);
    router.get('/:id', menus_1.getMenu);
    router.post('/crear', [
        (0, express_validator_4.check)('codigo', 'El codigo es obligatorio').notEmpty(),
        validar_campos_3.validarCampos,
    ], menus_1.crearMenu);
    router.put('/:id', menus_1.putMenu);
    router.delete('/:id', menus_1.deleteMenu);
    exports.default = router;
});
define("controllers/roles", ["require", "exports", "bcryptjs", "models/rol"], function (require, exports, bcryptjs_4, rol_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.deleteRol = exports.putRol = exports.crearRol = exports.getRol = exports.getRoles = exports.getSmallRoles = exports.getRolPag = void 0;
    bcryptjs_4 = __importDefault(bcryptjs_4);
    rol_3 = __importDefault(rol_3);
    //Obtener todos los Rol paginados
    const getRolPag = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { limite = 5, desde = 5 } = req.query;
        const roles = yield rol_3.default.findAndCountAll({
            // where: {...},
            // order: [...],
            limit: Number(limite),
            offset: Number(desde)
        });
        // .then(function (result) {
        //     res.json({ rol });
        // });    
        res.json({ roles });
    });
    exports.getRolPag = getRolPag;
    //Obtener todos los Rol
    const getSmallRoles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const rol = yield rol_3.default.findAll({ attributes: ['id', 'codigo'] });
        // const rol = await Rol.findAll();
        res.json(rol);
    });
    exports.getSmallRoles = getSmallRoles;
    const getRoles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const rol = yield rol_3.default.findAll();
        res.json({ rol, ok: true, });
    });
    exports.getRoles = getRoles;
    //Obtener un rol por id
    const getRol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const rol = yield rol_3.default.findByPk(id);
        if (rol) {
            res.json({ rol });
        }
        else {
            return res.status(404).json({
                msg: `No existe un rol con el id ${id}`
            });
        }
    });
    exports.getRol = getRol;
    // Crear Rol
    const crearRol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        // const error = validationResult(req);
        // if (!error.isEmpty()) {
        //     return res.status(400).json({
        //         ok: false,
        //         error: error.mapped()
        //     })
        // };
        const { body, headers } = req;
        const token = req.header('x-token') || '';
        const { password } = body;
        try {
            const existeRol = yield rol_3.default.findOne({
                where: {
                    codigo: body.codigo
                }
            });
            if (existeRol) {
                return res.status(400).json({
                    msg: 'Ya existe el rol con el codigo ' + body.codigo
                });
            }
            // const salt = bcryptjs.genSaltSync();
            // body.password = bcryptjs.hashSync(password, salt);
            const rol = yield rol_3.default.create(body);
            yield rol.save();
            res.status(200).json({
                ok: true,
                msg: 'El rol se creo con éxito',
                rol,
                token
            });
            //  res.json(usuario);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                msg: 'Hable con el Administrador'
            });
        }
    });
    exports.crearRol = crearRol;
    //Actualizar un usuario
    const putRol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const _a = req.body, { password, google, email } = _a, resto = __rest(_a, ["password", "google", "email"]);
        if (password) {
            // Encriptar la contraseña
            const salt = bcryptjs_4.default.genSaltSync();
            resto.password = bcryptjs_4.default.hashSync(password, salt);
        }
        try {
            const rol = yield rol_3.default.findByPk(id, resto);
            if (!rol) {
                return res.status(404).json({
                    msg: 'No existe un usuario con el id ' + id
                });
            }
            yield rol.update(resto);
            yield rol.save();
            res.status(200).json({
                ok: true,
                msg: 'La actualización se realizó con éxito'
            });
            // res.json(Rol);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                msg: 'Hable con el administrador Update'
            });
        }
    });
    exports.putRol = putRol;
    const deleteRol = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const rol = yield rol_3.default.findByPk(id);
        if (!rol) {
            return res.status(400).json({
                msg: 'No existe un rol con el id ' + id
            });
        }
        if (!rol) {
            return res.status(400).json({
                msg: 'No existe un rol con el id ' + id
            });
        }
        yield rol.update({ estado: false });
        res.json(rol);
    });
    exports.deleteRol = deleteRol;
});
define("routes/roles_menus", ["require", "exports", "express", "express-validator", "controllers/roles", "middlewares/validar_campos"], function (require, exports, express_4, express_validator_5, roles_1, validar_campos_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const router = (0, express_4.Router)();
    router.get('/', roles_1.getRoles);
    router.get('/:id', roles_1.getRol);
    router.post('/crear', [
        (0, express_validator_5.check)('codigo', 'El codigo es obligatorio').notEmpty(),
        validar_campos_4.validarCampos,
    ], roles_1.crearRol);
    router.put('/:id', roles_1.putRol);
    router.delete('/:id', roles_1.deleteRol);
    exports.default = router;
});
define("routes/roles", ["require", "exports", "express", "express-validator", "controllers/roles", "middlewares/validar_campos"], function (require, exports, express_5, express_validator_6, roles_2, validar_campos_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const router = (0, express_5.Router)();
    router.get('/small', roles_2.getSmallRoles);
    router.get('/', roles_2.getRoles);
    router.get('/:id', roles_2.getRol);
    router.post('/crear', [
        (0, express_validator_6.check)('codigo', 'El codigo es obligatorio').notEmpty(),
        validar_campos_5.validarCampos,
    ], roles_2.crearRol);
    router.put('/:id', roles_2.putRol);
    router.delete('/:id', roles_2.deleteRol);
    exports.default = router;
});
define("models/usuario_rol", ["require", "exports", "sequelize", "db/connection"], function (require, exports, sequelize_5, connection_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    connection_4 = __importDefault(connection_4);
    //Modelo de Roles
    const Usuario_rol = connection_4.default.define('usuarios_roles', {
        estado: {
            type: sequelize_5.DataTypes.BOOLEAN,
            allowNull: false,
        },
    }, {
        // timestamps : false,
        freezeTableName: true,
        tableName: 'usuarios_roles',
    });
    exports.default = Usuario_rol;
});
define("controllers/usuarios_roles", ["require", "exports", "bcryptjs", "models/usuario_rol"], function (require, exports, bcryptjs_5, usuario_rol_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.deleteUsuariosRoles = exports.putUsuariosRoles = exports.crearUsuariosRoles = exports.getUsuarioRol = exports.getUsuariosRoles = exports.getUsuariosRolesPag = void 0;
    bcryptjs_5 = __importDefault(bcryptjs_5);
    usuario_rol_1 = __importDefault(usuario_rol_1);
    //Obtener todos los Rol paginados
    const getUsuariosRolesPag = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { limite = 5, desde = 5 } = req.query;
        const roles = yield usuario_rol_1.default.findAndCountAll({
            // where: {...},
            // order: [...],
            limit: Number(limite),
            offset: Number(desde)
        });
        // .then(function (result) {
        //     res.json({ rol });
        // });    
        res.json({ roles });
    });
    exports.getUsuariosRolesPag = getUsuariosRolesPag;
    //Obtener todos los Rol
    const getUsuariosRoles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const rol = yield usuario_rol_1.default.findAll();
        res.json({ rol });
    });
    exports.getUsuariosRoles = getUsuariosRoles;
    //Obtener un rol por id
    const getUsuarioRol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const rol = yield usuario_rol_1.default.findByPk(id);
        if (rol) {
            res.json({ rol });
        }
        else {
            return res.status(404).json({
                msg: `No existe un rol con el id ${id}`
            });
        }
    });
    exports.getUsuarioRol = getUsuarioRol;
    // Crear Rol
    const crearUsuariosRoles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        // const error = validationResult(req);
        // if (!error.isEmpty()) {
        //     return res.status(400).json({
        //         ok: false,
        //         error: error.mapped()
        //     })
        // };
        const { body, headers } = req;
        const token = req.header('x-token') || '';
        // const {password} = body;
        try {
            const existeUsuarioRol = yield usuario_rol_1.default.findOne({
                where: {
                    usuario_id: body.usuario_id,
                    rol_id: body.rol_id
                }
            });
            if (existeUsuarioRol) {
                return res.status(400).json({
                    msg: 'El usuario ya cuenta con ese rol ' + body.rol_id
                });
            }
            // const salt = bcryptjs.genSaltSync();
            // body.password = bcryptjs.hashSync(password, salt);
            const usuario_rol = yield usuario_rol_1.default.create(body);
            yield usuario_rol.save();
            res.status(200).json({
                ok: true,
                msg: 'El rol se creo con éxito',
                usuario_rol,
                token
            });
            //  res.json(usuario);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                msg: 'Hable con el Administrador'
            });
        }
    });
    exports.crearUsuariosRoles = crearUsuariosRoles;
    //Actualizar un usuario
    const putUsuariosRoles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const _a = req.body, { password, google, email } = _a, resto = __rest(_a, ["password", "google", "email"]);
        if (password) {
            // Encriptar la contraseña
            const salt = bcryptjs_5.default.genSaltSync();
            resto.password = bcryptjs_5.default.hashSync(password, salt);
        }
        try {
            const usuario_rol = yield usuario_rol_1.default.findByPk(id, resto);
            if (!usuario_rol) {
                return res.status(404).json({
                    msg: 'No existe un usuario con el id ' + id
                });
            }
            yield usuario_rol.update(resto);
            yield usuario_rol.save();
            res.status(200).json({
                ok: true,
                msg: 'La actualización se realizó con éxito'
            });
            // res.json(Rol);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                msg: 'Hable con el administrador Update'
            });
        }
    });
    exports.putUsuariosRoles = putUsuariosRoles;
    const deleteUsuariosRoles = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const usuario_rol = yield usuario_rol_1.default.findByPk(id);
        if (!usuario_rol) {
            return res.status(400).json({
                msg: 'No existe un rol con el id ' + id
            });
        }
        if (!usuario_rol) {
            return res.status(400).json({
                msg: 'No existe un rol con el id ' + id
            });
        }
        yield usuario_rol.update({ estado: false });
        res.json(usuario_rol);
    });
    exports.deleteUsuariosRoles = deleteUsuariosRoles;
});
define("routes/usuarios_roles", ["require", "exports", "express", "express-validator", "middlewares/validar_campos", "controllers/usuarios_roles"], function (require, exports, express_6, express_validator_7, validar_campos_6, usuarios_roles_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const router = (0, express_6.Router)();
    router.get('/', usuarios_roles_1.getUsuariosRoles);
    router.get('/:id', usuarios_roles_1.getUsuarioRol);
    router.post('/crear', [
        (0, express_validator_7.check)('usuario_id', 'El usuario_id es obligatorio').notEmpty(),
        (0, express_validator_7.check)('rol_id', 'el rol_id es obligatorio').notEmpty(),
        validar_campos_6.validarCampos,
    ], usuarios_roles_1.crearUsuariosRoles);
    router.put('/:id', usuarios_roles_1.putUsuariosRoles);
    router.delete('/:id', usuarios_roles_1.deleteUsuariosRoles);
    exports.default = router;
});
define("models/server", ["require", "exports", "express", "routes/usuarios", "routes/auth", "routes/menus", "routes/roles_menus", "routes/roles", "routes/usuarios_roles", "cors", "db/connection"], function (require, exports, express_7, usuarios_2, auth_2, menus_2, roles_menus_1, roles_3, usuarios_roles_2, cors_1, connection_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    express_7 = __importDefault(express_7);
    usuarios_2 = __importDefault(usuarios_2);
    auth_2 = __importDefault(auth_2);
    menus_2 = __importDefault(menus_2);
    roles_menus_1 = __importDefault(roles_menus_1);
    roles_3 = __importDefault(roles_3);
    usuarios_roles_2 = __importDefault(usuarios_roles_2);
    cors_1 = __importDefault(cors_1);
    connection_5 = __importDefault(connection_5);
    require('./asociaciones');
    class Server {
        constructor() {
            this.apiPaths = {
                login: '/api/auth',
                usuarios: '/api/usuarios',
                roles: '/api/roles',
                usuarios_roles: '/api/usuarios_roles',
                menus: '/api/menus',
                roles_menus: '/api/roles_menus'
            };
            this.app = (0, express_7.default)();
            this.port = process.env.PORT;
            //Metodos Iniciales
            this.dbConnection();
            this.middlewares();
            this.routes();
        }
        dbConnection() {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    yield connection_5.default.authenticate();
                    console.log('Database online');
                }
                catch (error) {
                    console.log(error);
                    // throw new Error(error);
                }
            });
        }
        middlewares() {
            //CORS
            this.app.use((0, cors_1.default)());
            //LECTURA DEL BODY
            this.app.use(express_7.default.json());
            this.app.use(express_7.default.urlencoded({ extended: false }));
            //CARPETA PUBLICA
            this.app.use(express_7.default.static('public'));
        }
        routes() {
            this.app.use(this.apiPaths.login, auth_2.default),
                this.app.use(this.apiPaths.usuarios, usuarios_2.default),
                this.app.use(this.apiPaths.roles, roles_3.default),
                this.app.use(this.apiPaths.usuarios_roles, usuarios_roles_2.default),
                this.app.use(this.apiPaths.menus, menus_2.default),
                this.app.use(this.apiPaths.roles_menus, roles_menus_1.default);
        }
        listen() {
            this.app.listen(this.port, () => {
                console.log('Servidor corriendo en el puerto' + ' ' + this.port);
            });
            // db.sync({alter: true}).then(()=> {
            //     console.log('los modelos se sincronizaron con la tablas');
            // }).catch(error => {
            //     console.log('Se ha producido un error',error);
            // })
        }
    }
    exports.default = Server;
});
define("app", ["require", "exports", "models/server"], function (require, exports, server_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    server_1 = __importDefault(server_1);
    // dotenv.config();
    const server = new server_1.default();
    server.listen();
});
// console.log('VARIABLE GLOBAL DE app' + ' ' + process.env.DB_SERVER + ' ' + process.env.DB_DIALECT);
define("controllers/roles_menus", ["require", "exports", "bcryptjs", "models/rol"], function (require, exports, bcryptjs_6, rol_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.deleteUsuariosRoles = exports.putUsuariosRoles = exports.crearUsuariosRoles = exports.getUsuarioRol = exports.getUsuariosRoles = exports.getUsuariosRolesPag = void 0;
    bcryptjs_6 = __importDefault(bcryptjs_6);
    rol_4 = __importDefault(rol_4);
    //Obtener todos los Rol paginados
    const getUsuariosRolesPag = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { limite = 5, desde = 5 } = req.query;
        const roles = yield rol_4.default.findAndCountAll({
            // where: {...},
            // order: [...],
            limit: Number(limite),
            offset: Number(desde)
        });
        // .then(function (result) {
        //     res.json({ rol });
        // });    
        res.json({ roles });
    });
    exports.getUsuariosRolesPag = getUsuariosRolesPag;
    //Obtener todos los Rol
    const getUsuariosRoles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const rol = yield rol_4.default.findAll();
        res.json({ rol });
    });
    exports.getUsuariosRoles = getUsuariosRoles;
    //Obtener un rol por id
    const getUsuarioRol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const rol = yield rol_4.default.findByPk(id);
        if (rol) {
            res.json({ rol });
        }
        else {
            return res.status(404).json({
                msg: `No existe un rol con el id ${id}`
            });
        }
    });
    exports.getUsuarioRol = getUsuarioRol;
    // Crear Rol
    const crearUsuariosRoles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        // const error = validationResult(req);
        // if (!error.isEmpty()) {
        //     return res.status(400).json({
        //         ok: false,
        //         error: error.mapped()
        //     })
        // };
        const { body, headers } = req;
        const token = req.header('x-token') || '';
        const { password } = body;
        try {
            const existeRol = yield rol_4.default.findOne({
                where: {
                    codigo: body.codigo
                }
            });
            if (existeRol) {
                return res.status(400).json({
                    msg: 'Ya existe el rol con el codigo ' + body.codigo
                });
            }
            // const salt = bcryptjs.genSaltSync();
            // body.password = bcryptjs.hashSync(password, salt);
            const rol = yield rol_4.default.create(body);
            yield rol.save();
            res.status(200).json({
                ok: true,
                msg: 'El rol se creo con éxito',
                rol,
                token
            });
            //  res.json(usuario);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                msg: 'Hable con el Administrador'
            });
        }
    });
    exports.crearUsuariosRoles = crearUsuariosRoles;
    //Actualizar un usuario
    const putUsuariosRoles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const _a = req.body, { password, google, email } = _a, resto = __rest(_a, ["password", "google", "email"]);
        if (password) {
            // Encriptar la contraseña
            const salt = bcryptjs_6.default.genSaltSync();
            resto.password = bcryptjs_6.default.hashSync(password, salt);
        }
        try {
            const rol = yield rol_4.default.findByPk(id, resto);
            if (!rol) {
                return res.status(404).json({
                    msg: 'No existe un usuario con el id ' + id
                });
            }
            yield rol.update(resto);
            yield rol.save();
            res.status(200).json({
                ok: true,
                msg: 'La actualización se realizó con éxito'
            });
            // res.json(Rol);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                msg: 'Hable con el administrador Update'
            });
        }
    });
    exports.putUsuariosRoles = putUsuariosRoles;
    const deleteUsuariosRoles = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const rol = yield rol_4.default.findByPk(id);
        if (!rol) {
            return res.status(400).json({
                msg: 'No existe un rol con el id ' + id
            });
        }
        if (!rol) {
            return res.status(400).json({
                msg: 'No existe un rol con el id ' + id
            });
        }
        yield rol.update({ estado: false });
        res.json(rol);
    });
    exports.deleteUsuariosRoles = deleteUsuariosRoles;
});
define("interfaces/borrame_interfaces", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("interfaces/borrame_payload", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("interfaces/jsonwebtoken", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("interfaces/usuarios.interfaces", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("middlewares/validar-login-jwt", ["require", "exports", "models/usuario", "jsonwebtoken"], function (require, exports, usuario_5, jsonwebtoken_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    usuario_5 = __importDefault(usuario_5);
    jsonwebtoken_3 = __importDefault(jsonwebtoken_3);
    const validarJWT = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const token = req.header('x-token');
        if (!token) {
            return res.status(401).json({
                msg: 'No hay token en la petición'
            });
        }
        try {
            const { uid } = jsonwebtoken_3.default.verify(token, process.env.SECRETORPRIVATEKEY);
            // leer el usuario que corresponde al uid
            const usuario = yield usuario_5.default.findByPk(uid);
            if (!usuario) {
                return res.status(401).json({
                    msg: 'Token no válido - usuario no existe DB'
                });
            }
            // Verificar si el uid tiene estado true
            if (!usuario.estado) {
                return res.status(401).json({
                    msg: 'Token no válido - usuario con estado: false'
                });
            }
            // req.usuario = usuario;
            req.usuario = usuario;
            next();
        }
        catch (error) {
            console.log(error);
            res.status(401).json({
                msg: 'Token no válido'
            });
        }
    });
    exports.default = validarJWT;
});
define("models/asociaciones", ["require", "exports", "models/menu", "models/rol", "models/usuario"], function (require, exports, menu_2, rol_5, usuario_6) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    menu_2 = __importDefault(menu_2);
    rol_5 = __importDefault(rol_5);
    usuario_6 = __importDefault(usuario_6);
    require("./usuario_rol");
    require("./rol_menu");
    usuario_6.default.belongsToMany(rol_5.default, { through: 'usuarios_roles', foreignKey: 'usuario_id', });
    rol_5.default.belongsToMany(usuario_6.default, { through: 'usuarios_roles', foreignKey: 'rol_id', });
    rol_5.default.belongsToMany(menu_2.default, { through: 'roles_menus', foreignKey: 'rol_id' });
    menu_2.default.belongsToMany(rol_5.default, { through: 'roles_menus', foreignKey: 'menu_id' });
});
define("models/rol_menu", ["require", "exports", "sequelize", "db/connection"], function (require, exports, sequelize_6, connection_6) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    connection_6 = __importDefault(connection_6);
    //Modelo de Roles
    const Rol_menu = connection_6.default.define('roles_menus', {
        estado: {
            type: sequelize_6.DataTypes.BOOLEAN,
            allowNull: false,
        },
    }, {
        // timestamps : false,
        freezeTableName: true,
        tableName: 'roles_menus',
    });
    exports.default = Rol_menu;
});
//# sourceMappingURL=main.js.map
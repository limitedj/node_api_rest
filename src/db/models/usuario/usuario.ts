import { DataTypes, Model, Attributes, InferAttributes, InferCreationAttributes, CreationOptional, Optional,
    NonAttribute, ForeignKey,
    ModelAttributeColumnOptions,
    BelongsToManyGetAssociationsMixin,
    BelongsToManyAddAssociationMixin,
    BelongsToManyHasAssociationMixin,
    BelongsToManyCountAssociationsMixin,
    BelongsToManyCreateAssociationMixin,
} from "sequelize";
import db from "../../config";
import Rol from './rol';

interface UsuarioAttributes {
    id: BigInt;
    nombre: string;
    apellido: string;
    email: string;
    password: string;
    imagen: string;
    estado: boolean;
    google: boolean;
    createdAt? : Date;
    updatedAt? : Date;
    deletedAt? : Date;
}



export interface UsuarioInput  extends Optional<UsuarioAttributes, 'id' > {};

export interface UsuarioOutput extends Required<UsuarioAttributes> {};

class Usuario extends Model<UsuarioAttributes, UsuarioInput> {
    
    declare id      : BigInt;
    declare nombre  : string;
    declare apellido: string;
    declare email   : string;
    declare password: string;
    declare imagen  : string; // para campos que aceptan valores NULL | null
    declare estado  : boolean;
    declare google  : boolean; 
    
    // timestamps!
    // createdAt can be undefined during creation
    declare readonly createdAt : Date;
    // updatedAt can be undefined during creation
    declare readonly updatedAt : Date;
    // deleteAt can be undefined during creation        
    declare readonly deletedAt : Date;
    
    // declare getRols     : CreationOptional<BelongsToManyGetAssociationsMixin<Rol>>; // ¡Tenga en cuenta las afirmaciones nulas!
    // declare addRol      : CreationOptional<BelongsToManyAddAssociationMixin<Rol, number>>;
    // declare hasRol      : CreationOptional<BelongsToManyHasAssociationMixin<Rol, number>>;
    // declare countRols   : CreationOptional<BelongsToManyCountAssociationsMixin>;
    // declare createRol   : CreationOptional<BelongsToManyCreateAssociationMixin<Rol>>;
    
    // También puede pre-declarar posibles inclusiones, estas solo se completarán si
    // incluir activamente una relación.
    declare readonly Roles: Rol[]; // Tenga en cuenta que esto es opcional ya que solo se completa cuando se solicita explícitamente en el código
    
        //   declare static associations: {
        //     Rol: Association<Usuario, Rol>;
        //   };    
    }
    
    Usuario.init({
        id:{
            type:DataTypes.BIGINT,
            autoIncrement: true,
        primaryKey: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    apellido: {
        type: DataTypes.STRING,
        allowNull: true ,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    imagen: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    estado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    google: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    createdAt: {type: DataTypes.DATE, allowNull: true},
    updatedAt: {type: DataTypes.DATE, allowNull: true},
    deletedAt: {type: DataTypes.DATE, allowNull: true}
},{
    sequelize: db,
    paranoid: true,
    tableName: 'usuarios'
});


// export interface UsuarioInput  extends Optional<Attributes<Usuario>,'id'> {
//     // descripcion?:RolOutput[]
// };

// export interface UsuarioOutput extends Attributes<Usuario> {
//     Roles?: RolOutput[]
// };  

// export interface UsuarioShow  extends Omit<Attributes<Usuario>,'id' | 'createAt' | 'updateAT' | 'deleteAt'> {};

export default Usuario;
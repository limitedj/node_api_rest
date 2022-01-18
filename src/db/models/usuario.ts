import {   
    Sequelize,
    Model,
    ModelDefined,
    DataTypes,
    BelongsToManyGetAssociationsMixin,
    BelongsToManyAddAssociationMixin,
    BelongsToManyHasAssociationMixin,
    Association,
    BelongsToManyCountAssociationsMixin,
    BelongsToManyCreateAssociationMixin,
    Optional 
} from "sequelize";
import db from "../config";
import Rol from "./rol";

// Estos son todos los atributos del modelo de usuario

export interface UsuarioAttributes {
    id          : number;
    nombre ?    : string;
    apellido ?  : string;
    email ?     : string;
    password ?  : string;
    imagen ?    : string;
    estado ?    : boolean;
    google ?    : boolean;
    createdAt?  : Date;
    updatedAt?  : Date;
    deletedAt?  : Date;

};

// Algunos atributos son opcionales en las llamadas `User.build` y` User.create`

export interface UsuarioInput extends Optional<UsuarioAttributes, 'id'> {};

export interface UsuarioOuput extends Required<UsuarioAttributes> {};


class Usuario extends Model<UsuarioAttributes, UsuarioInput> implements UsuarioAttributes {

        public id!      : number; // Tenga en cuenta que la `aserción nula``! `Es necesaria en modo estricto.
        public nombre!  : string;
        public apellido!: string;
        public email!   : string;
        public password!: string;
        public imagen!  : string; // para campos que aceptan valores NULL | null
        public estado!  : boolean;
        public google!  : boolean;

        // timestamps!
        public readonly createdAt! : Date;
        public readonly updatedAt! : Date;
        public readonly deletedAt! : Date;

  // Dado que TS no puede determinar la asociación del modelo en tiempo de compilación
  // tenemos que declararlos aquí puramente virtualmente
  // estos no existirán hasta que se llame a `Model.init`

        public getRols!: BelongsToManyGetAssociationsMixin<Rol>; // ¡Tenga en cuenta las afirmaciones nulas!
        public addRol!: BelongsToManyAddAssociationMixin<Rol, number>;
        public hasRol!: BelongsToManyHasAssociationMixin<Rol, number>;
        public countRols!: BelongsToManyCountAssociationsMixin;
        public createRol!: BelongsToManyCreateAssociationMixin<Rol>;

  // También puede pre-declarar posibles inclusiones, estas solo se completarán si
  // incluir activamente una relación.
  public readonly projects?: Rol[]; // Tenga en cuenta que esto es opcional ya que solo se completa cuando se solicita explícitamente en el código
        
  public static associations: {
    projects: Association<Usuario, Rol>;
  };    
        
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
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull:false,
    },
    imagen: {
        type: DataTypes.STRING,
        allowNull: false,
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
    }
},{
    sequelize: db,
    paranoid: true,
    tableName: 'usuarios'
});

//Usuario.belongsToMany(Rol,{through: UsuarioRol, foreignKey :'usuario_id'});



export default Usuario;
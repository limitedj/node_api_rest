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
import { RolOutput } from './rol';


//   function getValue<M extends Model>(modelClass: ModelStatic<M>, attribute: keyof Attributes<M>) {}

//   export interface UsuarioInput  extends Omit<Attributes<Usuario>,'id' | 'createAt' | 'updateAT' | 'deleteAt'> {};

//   export interface UsuarioInput  extends Optional<Attributes<Usuario>,'id'> {};

  export interface UsuarioInput  extends Optional<Attributes<Usuario>, 'id'> {
    // descripcion?:RolOutput[]
};

  export interface UsuarioOutput extends Attributes<Usuario> {
    description?: RolOutput[]
  };  

class Usuario extends Model<InferAttributes<Usuario>, InferCreationAttributes<Usuario>> {

        declare id      : CreationOptional<BigInt>;
        declare nombre  : string;
        declare apellido: string;
        declare email   : string;
        declare password: string;
        declare imagen  : string; // para campos que aceptan valores NULL | null
        declare estado  : boolean;
        declare google  : boolean; 

// timestamps!
// createdAt can be undefined during creation
        declare readonly createdAt : CreationOptional<Date>;
// updatedAt can be undefined during creation
        declare readonly updatedAt : CreationOptional<Date>;
// deleteAt can be undefined during creation        
        declare readonly deletedAt : CreationOptional<Date>;

        // declare getRols     : BelongsToManyGetAssociationsMixin<Rol>; // ¡Tenga en cuenta las afirmaciones nulas!
        // declare addRol      : BelongsToManyAddAssociationMixin<Rol, number>;
        // declare hasRol      : BelongsToManyHasAssociationMixin<Rol, number>;
        // declare countRols   : BelongsToManyCountAssociationsMixin;
        // declare createRol   : BelongsToManyCreateAssociationMixin<Rol>;

  // También puede pre-declarar posibles inclusiones, estas solo se completarán si
  // incluir activamente una relación.
  //   public readonly projects?: Rol[]; // Tenga en cuenta que esto es opcional ya que solo se completa cuando se solicita explícitamente en el código
        
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

export default Usuario;
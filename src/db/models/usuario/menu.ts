import { Mode } from "fs";
import { DataTypes, Model, InferAttributes, Attributes, InferCreationAttributes, CreationOptional,Optional} from "sequelize";
import db from "../../config";


interface MenuAttributes {
    id: BigInt;
    codigo: string;
    descripcion: string;
    estado: boolean;
    createdAt? : Date;
    updatedAt? : Date;
    deletedAt? : Date;
}



export interface MenuInput  extends Optional<MenuAttributes, 'id' > {};

export interface MenuOutput extends Required<MenuAttributes> {};


class Menu extends Model<MenuAttributes, MenuInput > {
    
        declare id: BigInt;
        declare codigo: string;
        declare descripcion: string;
        declare estado: boolean;
    
    // timestamps!
    // createdAt can be undefined during creation
    declare readonly createdAt : Date;
    // updatedAt can be undefined during creation
    declare readonly updatedAt : Date;
    // deleteAt can be undefined during creation        
    declare readonly deletedAt : Date;
    }
    
    Menu.init({
        id:{
        type:DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },
    codigo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: true,
    },
    createdAt: {type: DataTypes.DATE, allowNull: true},
    updatedAt: {type: DataTypes.DATE, allowNull: true},
    deletedAt: {type: DataTypes.DATE, allowNull: true}
},{
    sequelize: db,
    paranoid: true,
    tableName: 'menus'
});


export default Menu;


// import { Mode } from "fs";
// import { DataTypes, Model, InferAttributes, Attributes, InferCreationAttributes, CreationOptional,Optional} from "sequelize";
// import db from "../../config";


// class Menu extends Model<InferAttributes<Menu>, InferCreationAttributes<Menu>> {
    
//         declare id: CreationOptional<BigInt>;
//         declare codigo: string;
//         declare descripcion: string;
//         declare estado: boolean;

//         // timestamps!
// // createdAt can be undefined during creation
//         declare readonly createdAt : CreationOptional<Date>;
// // updatedAt can be undefined during creation
//         declare readonly updatedAt : CreationOptional<Date>;
// // deleteAt can be undefined during creation        
//         declare readonly deletedAt : CreationOptional<Date>;
        
//     }
    
//     Menu.init({
//         id:{
//         type:DataTypes.BIGINT,
//         autoIncrement: true,
//         primaryKey: true,
//     },
//     codigo: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     descripcion: {
//         type: DataTypes.STRING,
//         allowNull: true,
//     },
//     estado: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         defaultValue: true,
//     },
//     createdAt: {type: DataTypes.DATE, allowNull: true},
//     updatedAt: {type: DataTypes.DATE, allowNull: true},
//     deletedAt: {type: DataTypes.DATE, allowNull: true}
// },{
//     sequelize: db,
//     paranoid: true,
//     tableName: 'menus'
// });

// export interface MenuInput extends Optional<Attributes<Menu>, 'id'> {};
// // Model<InferAttributes<Menu>> {};

// export interface MenuOutput extends Attributes<Menu> {};

// export default Menu;
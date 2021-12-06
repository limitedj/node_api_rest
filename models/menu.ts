import {
    Sequelize,
    DataTypes
} from 'sequelize';

export interface MenuAttributes {
    codigo ? : string;

}

export interface MenuInstance {
    id: number;
    createdAt: Date;
    updatedAt: Date;

    codigo: string;

}

export = (sequelize: Sequelize, DataTypes: DataTypes) => {
    var menu = sequelize.define('menu', {
        codigo: DataTypes.STRING
    });

    menu.associate = function(models) {
        // associations can be defined here
    };

    return menu;
};

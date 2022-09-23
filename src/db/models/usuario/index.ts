import Menu         from './menu';
import Rol          from './rol';
import Usuario      from './usuario';
import UsuarioRol   from './usuario_rol';
import MenuRol      from './menu_rol';

// Asociacion usuario Rol

Rol.belongsToMany(Usuario,{
    through:UsuarioRol, 
    foreignKey:'rol_id'});        

Usuario.belongsToMany(Rol,{
    through: UsuarioRol, 
    foreignKey :'usuario_id'});

// Asociacion Menu Rol

Menu.belongsToMany(Rol,{
    through:MenuRol, 
    foreignKey:'menu_id'
});

Rol.belongsToMany(Menu,{
    through:MenuRol, 
    foreignKey:'rol_id'
});    

export { Menu, Rol, Usuario, UsuarioRol, MenuRol };


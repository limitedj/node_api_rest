
import { MenuOutput } from "../../../../db/models";
import { Menu } from "../../../interfaces";

export const toMenu = (menu: MenuOutput): Menu => {
    return {
            id             : menu.id,
            codigo         : menu.codigo,
            descripcion    : menu.descripcion,
            estado         : menu.estado,
            createdAt      : menu.createdAt,
            updatedAt      : menu.updatedAt,
            deletedAt      : menu.deletedAt,
        }
}



import { entities } from '@personalizados-lopes/data';
import { TipoUsuario } from 'libs/data/src/lib/enums';

export let Usuario:entities.Usuario =
    new entities.Usuario(
        "Admin",
        "admin@personalizadoslopes.com.br",
        "",
        "@perlopes1245",
        "",
        "",
        "",
        "",
        "",
        TipoUsuario.admin
    );


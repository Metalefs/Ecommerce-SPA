import { entities } from "@personalizados-lopes/data";
import { Categoria } from './categoria.seed';
export let Produto = [
    new entities.Produto(
        "",
        "",
        "",
        Categoria[0],
        "Serigrafia",
        [""],
        0,
        0,
        "",
        "",
        0
    ),
]

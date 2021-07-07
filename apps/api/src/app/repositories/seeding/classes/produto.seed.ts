import { entities } from "@personalizados-lopes/data";
import { CorProduto, TamanhoProduto } from "libs/data/src/lib/classes";
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
        new TamanhoProduto("",[]),
        new CorProduto("",""),
        0
    ),
]

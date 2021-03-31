import { entities } from "@personalizados-lopes/data";
import { Categoria } from './categoria.seed';
export let Cliente = [
    new entities.Cliente(
        "El Chavo",
        "Cliente",
        "Veterinaria BH",
        "Prefiro morrer do que perder a vida.",
        "",
    ),
    new entities.Cliente(
      "Vegeta",
      "UI Artes Marciais",
      "",
      "Os Sayajins são uma familia de guerreiros, não os provoque!!!",
      "",
  ),
]

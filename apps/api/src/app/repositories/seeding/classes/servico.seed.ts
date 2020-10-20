import { entities } from "@personalizados-lopes/data";
import { Categoria } from './categoria.seed';
export let Servico:entities.Servico[] = [
    new entities.Servico(
        "Serigrafia (Camisas)",
        "Serigrafia, silk-screen ou impressão a tela é um processo de impressão permeográfica de texto ou figura em uma superfície, na qual a tinta é vazada, pela pressão de um rodo ou espátula, através de uma tela preparada.",
        Categoria[2],
        ""
    ),
    new entities.Servico(
        "Sublimação",
        "Na sublimação, a tinta sublimática vai passar do seu estado sólido para o gasoso diretamente, marcando indelevelmente o objeto ou o tecido. A técnica de sublimação pode ser aplicada em diversos tipos de tecido ou em objetos dos mais diversos.",
        Categoria[0],
        ""
    ),
]

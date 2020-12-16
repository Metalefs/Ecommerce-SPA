import { Component, OnInit } from '@angular/core';
import { SobreCard } from 'apps/app-web/src/app/data/models';
import { ImagemService } from 'apps/app-web/src/app/data/service';
@Component({
  selector: 'personalizados-lopes-header-footer',
  templateUrl: './header-footer.component.html',
  styleUrls: ['./header-footer.component.scss']
})
export class HeaderFooterComponent implements OnInit {
  Cards:SobreCard[];
  constructor(private imagemService:ImagemService) {

  }
  ngOnInit(): void {
    this.imagemService.FiltrarPorNome("GIF Produtos").subscribe(x=>{
      console.log(x);
      this.Cards = [
        {
          title:"Galeria",
          icon:"group_work",
          color:"#FD6D13",
          class:"red",
          link:"/showcase",
          id:"#SHOWCASE",
          content:"Recebemos pedidos personalizados para a arte do seu produto."
        },
        {
          title:"Produtos",
          icon:"photo_library",
          color:"#FFB041",
          class:"yellow",
          link:"/produtos",
          id:"#PRODUTO",
          content:`Confira nossas canecas, camisetas, almofadas e outros.`,
          img_src:x.filter(x=>x.Nome == "GIF Produtos")[0].Src
        },
        {
          title:"Contato",
          icon:"email",
          color:"#3AB8FF",
          class:"blue",
          link:"/orcamento",
          id:"#ORCAMENTO",
          content:`Faça seu orçamento e envie o seu pedido. <a href="/orcamento">Clique aqui.</a>`
        },
      ]
    })
  }

}

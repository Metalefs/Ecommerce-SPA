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
          title:"Criacao de Arte (Galeria)",
          icon:"group_work",
          color:"#FD6D13",
          class:"red",
          link:"/showcase",
          id:"#SHOWCASE",
          content:"Recebemos pedidos personalizados para a arte do seu produto."
        },
        {
          title:"Nossos Produtos",
          icon:"photo_library",
          color:"#FFB041",
          class:"yellow",
          link:"/produtos",
          id:"#PRODUTO",
          content:`Confira nossas canecas, camisetas, almofadas e outros.`,
          img_src:'https://firebasestorage.googleapis.com/v0/b/personalizados-lopes-web-app.appspot.com/o/imagens%2Fgenerico%2F0.10889060436447451ezgif.com-gif-maker.gif?alt=media&token=e6c057de-05c1-4906-9cfe-37f8e508c735'
        },
        {
          title:"Orçamento",
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

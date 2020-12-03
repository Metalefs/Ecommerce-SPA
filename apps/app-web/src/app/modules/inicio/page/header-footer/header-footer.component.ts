import { Component, OnInit } from '@angular/core';
import { SobreCard } from 'apps/app-web/src/app/data/models';
@Component({
  selector: 'personalizados-lopes-header-footer',
  templateUrl: './header-footer.component.html',
  styleUrls: ['./header-footer.component.scss']
})
export class HeaderFooterComponent implements OnInit {

  Cards:SobreCard[] = [
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
      content:`Confira nossas canecas, camisetas, almofadas e outros.`
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

  constructor() { }

  ngOnInit(): void {
  }

}

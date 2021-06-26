import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { SobreCard } from 'apps/app-web/src/app/shared/models/interfaces';
import { DocumentRef } from 'apps/app-web/src/app/shared/services/document.service';

@Component({
  selector: 'personalizados-lopes-header-footer',
  templateUrl: './header-footer.component.html',
  styleUrls: ['./header-footer.component.scss']
})
export class HeaderFooterComponent implements OnInit {
  Cards:SobreCard[];
  @Input() specify:string;
  loading:boolean = true;
  constructor(
    @Inject(PLATFORM_ID) private platform: Object,
    private document_: DocumentRef
   ) {

  }
  ngOnInit(): void {
    this.Cards = this.specify == 'prod'?[
      {
        title:"Produtos",
        icon:"photo_library",
        color:"#FF4A4A",
        class:"red",
        link:"/produtos",
        id:"#topo",
        content:`Para personalizar.`,
        //img_src:x.filter(x=>x.Nome == "GIF Produtos")[0].Src
      },
    ] : this.specify == 'orc' ?
    [
      {
        title:"Orçamento",
        icon:"email",
        color:"#4d5899",
        class:"blue",
        link:"/orcamento",
        id:"#topo",
        content:`<a href="/orcamento">Clique aqui !</a>`
      },
    ] :
    [

      {
        title:"Nossa produção",
        icon:"image",
        color:"#4d589",
        class:"yellow",
        link:"/showcase",
        id:"#topo",
        content:`Confira nossas canecas,
        camisetas, almofadas e mais !!`
      },
      {
        title:"Produtos",
        icon:"photo_library",
        color:"#FF4A4",
        class:"red",
        link:"/produtos",
        id:"#topo",
        content:`Recebemos pedidos
        personalizados para a arte do
        seu produto.`,
        // img_src:x.filter(x=>x.Nome == "GIF Produtos")[0].Src
      },
      {
        title:"Orçamento",
        icon:"email",
        color:"#00c3d6",
        class:"blue",
        link:"/orcamento",
        id:"#topo",
        content:`Faça seu orçamento enviando o
        seu pedido direto para a loja.<a href="/orcamento">Entre em Contato !</a>`
      },
    ];
    let elements = [];

    let timer=500;
    if(isPlatformBrowser(this.platform)) {
      setTimeout(()=>{
        elements.push(this.document_.nativeDocument.getElementById("yellow"));
        elements.push(this.document_.nativeDocument.getElementById("red"));
        elements.push(this.document_.nativeDocument.getElementById("blue"));
        elements.push(this.document_.nativeDocument.getElementsByClassName("yellow"))
        elements.push(this.document_.nativeDocument.getElementsByClassName("red"))
        elements.push(this.document_.nativeDocument.getElementsByClassName("blue"))
        elements.forEach(el=>{

          if(el.length){
            toggleActiveArr(el);
            toggleActiveArr(el);
          }
          else{
            toggleActive(el);
            toggleActive(el);
          }

        })

      },500);

      this.loading = false;
    }
    function toggleActive(el){
      setTimeout(()=>{
        if(el.classList.contains("active") && !el.classList.contains("inactive")){
          el.classList.remove("active");

        }
        else
        el.classList.add("active");
      },timer)
      timer+=500;
    }
    function toggleActiveArr(el){
      setTimeout(()=>{
        el.forEach(item=>{
          if(item.classList.contains("active") && !item.classList.contains("inactive"))
            item.classList.remove("active");
          else
          item.classList.add("active");
        })
      },timer)
      timer+=500;
    }
  }


}

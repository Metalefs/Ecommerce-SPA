import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { SobreCard } from 'apps/app-web/src/app/data/models';
import { ImagemService } from 'apps/app-web/src/app/data/service';
import { DocumentRef } from 'apps/app-web/src/app/data/service/document.service';

@Component({
  selector: 'personalizados-lopes-header-footer',
  templateUrl: './header-footer.component.html',
  styleUrls: ['./header-footer.component.scss']
})
export class HeaderFooterComponent implements OnInit {
  Cards:SobreCard[];
  @Input() specify:string;
  loading:boolean = true;
  constructor(@Inject(PLATFORM_ID) private platform: Object, private imagemService:ImagemService, private document_: DocumentRef) {

  }
  ngOnInit(): void {
    this.imagemService.FiltrarPorNome("GIF Produtos").subscribe(x=>{
      this.loading = false;
      this.Cards = this.specify == 'prod'?[
        {
          title:"Produtos",
          icon:"photo_library",
          color:"#FF4A4A",
          class:"red",
          link:"/produtos",
          id:"#topo",
          content:`Confira nossas canecas, camisetas, almofadas e outros para personalizar.`,
          img_src:x.filter(x=>x.Nome == "GIF Produtos")[0].Src
        },
      ] : this.specify == 'orc' ?
      [
        {
          title:"Orçamento",
          icon:"email",
          color:"transparent",
          class:"blue",
          link:"/orcamento",
          id:"#topo",
          content:`Precisa de um orçamento? alguma dúvida ou sujestão? <a href="/orcamento">Clique aqui !</a>`
        },
      ] :
      [
        {
          title:"Produtos",
          icon:"photo_library",
          color:"transparent",
          class:"red",
          link:"/produtos",
          id:"#topo",
          content:`Confira nossas canecas, camisetas, almofadas e outros para personalizar.`,
          img_src:x.filter(x=>x.Nome == "GIF Produtos")[0].Src
        },
        {
          title:"Galeria",
          icon:"image",
          color:"transparent",
          class:"yellow",
          link:"/showcase",
          id:"#topo",
          content:`Veja nossos últimos trabalhos`
        },
        {
          title:"Orçamento",
          icon:"email",
          color:"#00c3d6",
          class:"blue",
          link:"/orcamento",
          id:"#topo",
          content:`Precisa de um orçamento? alguma dúvida ou sujestão? <a href="/orcamento">Clique aqui !</a>`
        },
      ];
      let elements = [];

      let timer=500;
      if(isPlatformBrowser(PLATFORM_ID)) {
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

    })


  }


}

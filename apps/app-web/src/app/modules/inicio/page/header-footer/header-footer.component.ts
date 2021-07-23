import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { ImagemService } from 'apps/app-web/src/app/data/service';
import { SobreCard } from 'apps/app-web/src/app/shared/models/interfaces';
import { DocumentRef } from 'apps/app-web/src/app/shared/services/document.service';

@Component({
  selector: 'personalizados-lopes-header-footer',
  templateUrl: './header-footer.component.html',
  styleUrls: ['./header-footer.component.scss']
})
export class HeaderFooterComponent implements OnInit {
  Cards:SobreCard[]|any;
  @Input() specify:string;
  loading:boolean = true;
  constructor(
    @Inject(PLATFORM_ID) private platform: Object,
    private document_: DocumentRef,
    private imgService: ImagemService
   ) {

  }
  ngOnInit(): void {
    this.imgService.FiltrarPorNome("GIF Produtos").subscribe(img=>{

      this.Cards = this.specify == 'prod'?[
        {
          title:"Produtos",
          icon:"photo_library",
          color:"#FD6D13",
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
          color:"#3AB8FF",
          class:"blue",
          link:"/orcamento",
          id:"#topo",
          content:`<a href="/orcamento">Clique aqui !</a>`
        },
      ] :
      [

        {
          title:"Galeria de fotos",
          icon:"image",
          color:"#FFB041",
          class:"yellow",
          link:"/showcase",
          id:"#topo",
          content:`Veja as fotos dos ultimos produtos no instagram`,
          column_class:"is-6-touch"
        },
        {
          title:"Todos os produtos",
          icon:"photo_library",
          color:"#FF4A4A",
          class:"red",
          link:"/produtos",
          id:"#topo",
          content:`Veja todos os produtos por categoria.`,
          column_class:"is-6-touch"
          //img_src:img[0].Src
        },
        {
          title:"Orçamento e contato",
          icon:"email",
          color:"#00c3d6",
          class:"blue",
          link:"/orcamento",
          id:"#topo",
          content:`Faça um orçamento ou <a href="/orcamento">Entre em Contato !</a>`,
          column_class:"is-12-touch"
        },
      ];
      let elements = [];

      let timer=500;
      if(isPlatformBrowser(this.platform)) {
        setTimeout(()=>{
          timer=500;
          elements.push(this.document_.nativeDocument.getElementById("yellow"));
          elements.push(this.document_.nativeDocument.getElementById("red"));
          elements.push(this.document_.nativeDocument.getElementById("blue"));
          elements.forEach(el=>{

            if(el?.length){
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
          if(el.forEach)
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

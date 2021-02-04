import { Component, OnInit } from '@angular/core';
import { SobreCard } from 'apps/app-web/src/app/data/models';
import { ImagemService } from 'apps/app-web/src/app/data/service';
import { ObterGIFProdutos } from 'apps/app-web/src/app/helper/FileHelper';
@Component({
  selector: 'personalizados-lopes-header-footer',
  templateUrl: './header-footer.component.html',
  styleUrls: ['./header-footer.component.scss']
})
export class HeaderFooterComponent implements OnInit {
  Cards:SobreCard[];
  loading:boolean = true;
  constructor(private imagemService:ImagemService) {

  }
  ngOnInit(): void {
    this.imagemService.FiltrarPorNome("GIF Produtos").subscribe(x=>{
      this.loading = false;
      this.Cards = [
        {
          title:"Produtos para personalizar",
          icon:"photo_library",
          color:"#FFB041",
          class:"yellow",
          link:"/produtos",
          id:"#PRODUTO",
          content:`Confira nossas canecas, camisetas, almofadas e outros.`,
          img_src:x.filter(x=>x.Nome == "GIF Produtos")[0].Src
        },
        {
          title:"Galeria",
          icon:"group_work",
          color:"#FD6D13",
          class:"red",
          link:"/showcase",
          id:"#SHOWCASE",
          content:"Dê uma olhada nos ultimos items que personalizamos!",

        },
        {
          title:"Entre em Contato",
          icon:"email",
          color:"#3AB8FF",
          class:"blue",
          link:"/orcamento",
          id:"#ORCAMENTO",
          content:`Precisa de um orçamento? alguma dúvida ou sujestão? <a href="/orcamento">Clique aqui !</a>`
        },
      ]
      let elements = [];
      setTimeout(()=>{
          elements.push(window.document.getElementById("yellow"));
          elements.push(window.document.getElementById("red"));
          elements.push(window.document.getElementById("blue"));
          elements.push(window.document.getElementsByClassName("yellow"))
          elements.push(window.document.getElementsByClassName("red"))
          elements.push(window.document.getElementsByClassName("blue"))
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
        let timer=500;
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

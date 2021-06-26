import { isPlatformBrowser } from '@angular/common';
import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Servico } from 'libs/data/src/lib/classes';
import { Observable } from 'rxjs';
import { cardFlip, fade } from '../../../animations';
import { SobreCard } from '../../../shared/models/interfaces';
import { DocumentRef } from '../../../shared/services/document.service';
import { ServicoState } from '../../../data/store/state';
import { removeDuplicates } from '../../../helper/ObjHelper';

@Component({
  selector: 'personalizados-lopes-servico',
  templateUrl: './servico.component.html',
  styleUrls: ['./servico.component.scss'],
  animations:[cardFlip,fade]
})
export class ServicoComponent implements OnInit {
  state = "flipped"
  Cards : SobreCard[] = [

  ];
  @Select(ServicoState.ObterServico) Servico$: Observable<Servico[]>;

  constructor(private document: DocumentRef, @Inject(PLATFORM_ID) private platform: Object) {

  }

  LerServicosCarregados(){
    if(isPlatformBrowser(this.platform)){
    let element:HTMLElement = this.document.nativeDocument.createElement("div");
    this.Servico$.subscribe(x=>{
      x.forEach(servico =>{
        element.innerHTML = servico.Descricao;
        element.querySelectorAll( 'oembed[url]' ).forEach( element => {
          // Create the <a href="..." class="embedly-card"></a> element that Embedly uses
          // to discover the media.
          const anchor = this.document.nativeDocument.createElement( 'a' );

          anchor.setAttribute( 'href', element.getAttribute( 'url' ) );
          anchor.className = 'embedly-card';

          element.appendChild( anchor );
        } );
        servico.Descricao = element.innerHTML;
        let classe = servico.Categoria.Nome == "Serigrafia" ? "left" : "right";
        this.Cards.push(
          {
            title:servico.Nome,
            icon:"group_work",
            color:"#FD6D13",
            class:classe,
            link:"/produto/"+servico.Categoria,
            content:servico
          }
        );
        this.Cards = removeDuplicates(this.Cards,"title")
      })
    })
  }
  }

  ngOnInit(): void {
    this.LerServicosCarregados();
    if(isPlatformBrowser(this.platform)){

      setTimeout(()=>{
        this.flip()
      },0)
    }
  }

  ngOnDestroy(){
    this.flip()
  }

  flip(){
    if (this.state === "default") {
      this.state = "flipped";
    } else {
      this.state = "default";
    }
  }

}

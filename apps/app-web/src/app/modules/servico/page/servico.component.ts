import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Servico } from 'libs/data/src/lib/classes';
import { Observable, Subscription } from 'rxjs';
import { cardFlip, fade } from '../../../animations';
import { SobreCard } from '../../../data/models';
import { DocumentRef } from '../../../data/service/document.service';
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

  @Select(ServicoState.IsServicoLoaded) IsServicoLoaded$;

  IsServicoLoadedSub: Subscription;

  constructor(private document: DocumentRef) {

  }

  LerServicosCarregados(){
    let element:HTMLElement = this.document.nativeDocument.createElement("div");
    this.Servico$.subscribe(x=>{
      console.log(x);
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

  ngOnInit(): void {
    if(isPlatformBrowser(PLATFORM_ID))
    this.LerServicosCarregados();
    setTimeout(()=>{
      this.flip()
    },0)
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

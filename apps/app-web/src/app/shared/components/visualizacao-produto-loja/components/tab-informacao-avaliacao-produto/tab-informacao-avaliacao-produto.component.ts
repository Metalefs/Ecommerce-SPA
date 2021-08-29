import { Component, Input, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { OrcamentoState } from 'apps/app-web/src/app/data/store/state';
import { DocumentRef } from 'apps/app-web/src/app/shared/services/document.service';
import { Produto } from 'libs/data/src/lib/classes';
import { Observable } from 'rxjs';

@Component({
  selector: 'personalizados-lopes-tab-informacao-avaliacao-produto',
  templateUrl: './tab-informacao-avaliacao-produto.component.html',
  styleUrls: ['./tab-informacao-avaliacao-produto.component.scss']
})
export class TabInformacaoAvaliacaoProdutoComponent implements OnInit {
  @Input() Produto:Produto;
  @Select(OrcamentoState.ObterProdutoAberto) Produto$: Observable<Produto>;

  el: HTMLElement;
  constructor(
    private document: DocumentRef) { }

  ngOnInit(): void {
    this.AdicionarDescricao(this.Produto);
    this.Produto$.subscribe(x=>{

      this.AdicionarDescricao(x);
    })
  }
  AdicionarDescricao(produto:Produto){
    let element:HTMLElement = this.document.nativeDocument.createElement("div");

    if(produto){
      element.innerHTML = produto?.Descricao;
      element.querySelectorAll( 'oembed[url]' ).forEach( element => {
        // Create the <a href="..." class="embedly-card"></a> element that Embedly uses
        // to discover the media.
        const anchor = this.document.nativeDocument.createElement( 'a' );

        anchor.setAttribute( 'href', element.getAttribute( 'url' ) );
        anchor.className = 'embedly-card';

        element.appendChild( anchor );
      } );
      this.el = element;
    }
  }
}

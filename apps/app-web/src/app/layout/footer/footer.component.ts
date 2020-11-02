import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { entities } from '@personalizados-lopes/data';
import { InformacoesContato, Sobre } from 'libs/data/src/lib/classes';
import { Link } from '../../data/models';
import { Observable, Subscription } from 'rxjs';
import { SobreService } from '../../data/service';
import { SobreState, InformacoesContatoState } from 'apps/app-web/src/app/data/store/state';
import { tap } from 'rxjs/operators';
import { LerSobre } from '../../data/store/actions/sobre.actions';
import { LerInformacoesContato } from '../../data/store/actions/informacoescontato.actions';
import { NavLinks } from '../../data/models/navlinks';
@Component({
  selector: 'personalizados-lopes-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  Links:Link[] = [
    {name:"QUEM SOMOS", href:"empresa", id:"SOBRE"},
    {name:"PRODUTOS",   href:"produtos", id:"PRODUTOS"},
    {name:"ORÇAMENTO",  href:"orcamento", id:"ORCAMENTO"},
  ];
  links = NavLinks;
  Ano:number = new Date().getFullYear();

  @Select(SobreState.ObterSobre) Sobre$: Observable<Sobre>;
  @Select(InformacoesContatoState.ObterInformacoesContato) InformacoesContato$: Observable<InformacoesContato>;

  @Select(SobreState.IsSobreLoaded) IsSobreLoaded$;
  IsSobreLoadedSub: Subscription;
  @Select(InformacoesContatoState.IsInformacoesContatoLoaded) IsInformacoesContatoLoaded$;
  IsInformacoesContatoLoadedSub: Subscription;

  constructor(
    private store: Store,
    ) {

  }

  Carregar(){
    this.IsSobreLoadedSub = this.IsSobreLoaded$.pipe(
      tap((IsSobreLoaded) => {
        if (!IsSobreLoaded) {
          this.store.dispatch(new LerSobre());
        }
      })
    ).subscribe(value => {
      // console.log(value);
    });


    this.IsInformacoesContatoLoadedSub = this.IsInformacoesContatoLoaded$.pipe(
      tap((IsInformacoesContatoLoaded) => {
        if (!IsInformacoesContatoLoaded) {
          this.store.dispatch(new LerInformacoesContato());
        }
      })
    ).subscribe(value => {
      // console.log(value);
    });
  }

  ngOnInit(){
    this.Carregar();
  }

}

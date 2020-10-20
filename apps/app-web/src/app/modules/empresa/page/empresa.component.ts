import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Sobre } from 'libs/data/src/lib/classes';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SobreCard } from '../../../data/models';
import { LerSobre } from '../../../data/store/actions/sobre.actions';
import { SobreState } from '../../../data/store/state';

@Component({
  selector: 'personalizados-lopes-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.scss']
})
export class EmpresaComponent implements OnInit {

  @Select(SobreState.ObterSobre) Sobre$: Observable<Sobre>;

  @Select(SobreState.IsSobreLoaded) IsSobreLoaded$;

  IsSobreLoadedSub: Subscription;

  constructor(private store: Store) { }


  Atualizar(){
    this.IsSobreLoadedSub = this.IsSobreLoaded$.pipe(
      tap((IsSobreLoaded) => {
          if(!IsSobreLoaded)
          this.store.dispatch(new LerSobre());
      })
    ).subscribe(value => {
      // console.log(value);
    });
  }

  ngOnInit(): void {
    this.Atualizar();
  }

}

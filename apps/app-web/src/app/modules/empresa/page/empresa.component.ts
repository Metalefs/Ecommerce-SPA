import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Sobre } from 'libs/data/src/lib/classes';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { cardFlip, fade } from '../../../animations';
import { SobreCard } from '../../../data/models';
import { ImagemService } from '../../../data/service';
import { LerSobre } from '../../../data/store/actions/sobre.actions';
import { SobreState } from '../../../data/store/state';

@Component({
  selector: 'personalizados-lopes-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.scss'],
  animations:[cardFlip,fade]
})
export class EmpresaComponent implements OnInit {
  state = "flipped"
  @Select(SobreState.ObterSobre) Sobre$: Observable<Sobre>;

  @Select(SobreState.IsSobreLoaded) IsSobreLoaded$;

  IsSobreLoadedSub: Subscription;

  constructor(private store: Store, private imagemService: ImagemService) { }


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
  url:string = '';
  url2:string = '';
  ngOnInit(): void {
    this.Atualizar();
    this.imagemService.FiltrarPorNome("empresa").subscribe(x=>{
      this.url = x.filter(x=>x.Nome == "empresa")[0].Src;
      this.url2 = x.filter(x=>x.Nome == "Fundo")[0].Src;
    })
    setTimeout(()=>{
      // this.flip()
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

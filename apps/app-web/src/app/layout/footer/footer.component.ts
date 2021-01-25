import { Component, OnInit, ViewChild } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { entities } from '@personalizados-lopes/data';
import { EmailNotificacao, InformacoesContato, Sobre } from 'libs/data/src/lib/classes';
import { Link } from '../../data/models';
import { Observable, Subscription } from 'rxjs';
import { EmailNotificacaoService, SobreService } from '../../data/service';
import { SobreState, InformacoesContatoState } from 'apps/app-web/src/app/data/store/state';
import { tap } from 'rxjs/operators';
import { LerSobre } from '../../data/store/actions/sobre.actions';
import { LerInformacoesContato } from '../../data/store/actions/informacoescontato.actions';
import { NavLinks } from '../../data/models/navlinks';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'personalizados-lopes-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  Links:Link[] = [
    {name:"Quem Somos", href:"empresa", id:"Sobre"},
    {name:"Produtos",   href:"produtos", id:"Básicos"},
    {name:"Contato",    href:"orcamento", id:"Contato"},
    {name:"Inicio",     href:"inicio",  id:"INICIO"},
    {name:"Blog",       href:"blog",  id:"Blog"},
    {name:"Galeria",    href:"showcase",  id:"showcase"},
  ];
  links = NavLinks;
  Ano:number = new Date().getFullYear();

  @Select(SobreState.ObterSobre) Sobre$: Observable<Sobre>;
  @Select(InformacoesContatoState.ObterInformacoesContato) InformacoesContato$: Observable<InformacoesContato>;

  @Select(SobreState.IsSobreLoaded) IsSobreLoaded$;
  IsSobreLoadedSub: Subscription;
  @Select(InformacoesContatoState.IsInformacoesContatoLoaded) IsInformacoesContatoLoaded$;
  IsInformacoesContatoLoadedSub: Subscription;

  @ViewChild("email") email;
  Email:string = "";
  Nome:string = "";
  constructor(
    private store: Store,
    private emailNotificacaoService:EmailNotificacaoService,
    private _snackBar: MatSnackBar,
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

  AssinarNewsLetter(){
    if(this.Email != "" && this.email.nativeElement.validity.valid){
      let emailnotificacao = new EmailNotificacao(this.Email, this.Nome, null);
      this.emailNotificacaoService.Incluir(emailnotificacao).subscribe(x=> {
        let snack = this._snackBar.open("Iremos avisá-lo por e-mail das nossas promoções e novidades!", "Fechar", {

        });
      });
    }
  }
}

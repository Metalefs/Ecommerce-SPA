import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { EmailNotificacao, InformacoesContato, Sobre } from 'libs/data/src/lib/classes';
import { Observable, Subscription } from 'rxjs';
import { SobreState, InformacoesContatoState } from 'apps/app-web/src/app/data/store/state';
import { tap } from 'rxjs/operators';
import { LerSobre } from '../../data/store/actions/sobre.actions';
import { LerInformacoesContato } from '../../data/store/actions/informacoescontato.actions';
import { NavLinks, Link } from '../../shared/models/interfaces';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmailNotificacaoService } from '../../data/service';

@Component({
  selector: 'personalizados-lopes-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, OnDestroy {

  Links:Link[] = [
    {name:"Quem Somos", href:"empresa", id:"Sobre"},
    {name:"Produtos",   href:"produtos", id:"Todos"},
    {name:"Orçamento",    href:"orcamento", id:"Contato"},
    {name:"Inicio",     href:"inicio",  id:"INICIO"},
    {name:"Blog",       href:"blog",  id:"Blog"},
    {name:"Galeria",    href:"showcase",  id:"showcase"},
    {name:"Meus pedidos",    href:"/minha-conta/pessoal/pedidos",  id:"topo"},
    {name:"Meu Perfil",    href:"/minha-conta/pessoal/",  id:"topo"},
    {name:"Carrinho",    href:"/checkout/",  id:"topo"},
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
  ngOnDestroy(){
    this.IsSobreLoadedSub.unsubscribe();
    this.IsInformacoesContatoLoadedSub.unsubscribe();
  }
  AssinarNewsLetter(){
    if(this.Email != "" && this.email.nativeElement.validity.valid){
      let emailnotificacao = new EmailNotificacao(this.Email, this.Nome, null);
      this.emailNotificacaoService.Incluir(emailnotificacao).subscribe(x=> {
        let snack = this._snackBar.open("Iremos avisá-lo por e-mail das nossas promoções e novidades!", "Fechar", {
          duration: 3000
        });
      });
    }
  }
}

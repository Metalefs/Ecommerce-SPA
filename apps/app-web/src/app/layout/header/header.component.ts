import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { AuthenticationService } from '../../core/service/authentication/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { entities } from '@personalizados-lopes/data';
import { Select, Store } from '@ngxs/store';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CheckoutComponent } from '../../modules/checkout/page/checkout/checkout.component';

import { Orcamento, Sobre } from 'libs/data/src/lib/classes';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LerSobre } from '../../data/store/actions/sobre.actions';
import { NavStateState, OrcamentoState, SobreState } from '../../data/store/state';
import { NavState } from '../../data/models/navstate';
import { NavLinks } from '../../data/models/navlinks';

import { EditarNavState } from '../../data/store/actions/navstate.actions';
import { Link } from '../../data/models';
import { ConfirmacaoComponent } from '../../modules/checkout/page/confirmacao/confirmacao.component';
import { CheckoutDisplayComponent } from '../../shared/components/dialogs/checkout-display/checkout-display.component';
@Component({
  selector: 'personalizados-lopes-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user: entities.Usuario;
  @Select(SobreState.ObterSobre) Sobre$: Observable<Sobre>;
  @Select(SobreState.IsSobreLoaded) IsSobreLoaded$;
  IsSobreLoadedSub: Subscription;
  links = NavLinks;
  @Select(NavStateState.ObterNavState) NavState$: Observable<NavState>;
  route: string;

  @Select(OrcamentoState.ObterOrcamentos) Orcamento$: Observable<Orcamento>;
  carrinhoVazio:boolean = true;
  constructor(
    private AuthenticationService:AuthenticationService,
    private location: Location, private router: Router,
    private ativatedRoute: ActivatedRoute,
    private store: Store,
    public dialog: MatDialog
    ) {

  }

  ngOnInit(): void {
    this.Carregar();
    this.router.events.subscribe(val => {
      if (this.location.path() != "") {
        this.route = this.location.path();
      } else {
        this.route = "inicio";
      }
      this.links.forEach(x=>{
        if(x.href == this.route.replace("/",''))
          this.SetActiveNav(x);
      })
    });
    this.Orcamento$.subscribe(x=>{
      if(x.Produto.length > 1)
        this.carrinhoVazio = false;
    });
    this.AuthenticationService.currentUser.subscribe(x=>this.user=x);
  }


  openCheckout(){
    this.dialog.open(CheckoutDisplayComponent, {
      restoreFocus: false,
      width:'30vw',
      height:'100vh',
      position:{
        right:'0'
      }
    });
  }

  Carregar(){
    this.IsSobreLoadedSub = this.IsSobreLoaded$.pipe(
      tap((IsSobreLoaded) => {
        if (!IsSobreLoaded) {
          this.store.dispatch(new LerSobre());
        }
      })
    ).subscribe(value => {
      console.log(value);
    });
  }

  SetActiveNav(link:Link){
    this.store.dispatch(new EditarNavState({activeNav:link.name}));
    this.NavState$.subscribe()
  }

  Logout(){
    this.AuthenticationService.logout();
    this.router.navigateByUrl("/")
  }

}

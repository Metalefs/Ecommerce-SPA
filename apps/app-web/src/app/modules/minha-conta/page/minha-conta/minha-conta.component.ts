import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { entities } from '@personalizados-lopes/data';
import { AuthenticationService } from 'apps/app-web/src/app/core/service/authentication/authentication.service';
import { Link } from 'apps/app-web/src/app/data/models';

@Component({
  selector: 'personalizados-lopes-minha-conta',
  templateUrl: './minha-conta.component.html',
  styleUrls: ['./minha-conta.component.scss']
})
export class MinhaContaComponent implements OnInit {
  mobileQuery: MediaQueryList;
  user: entities.Usuario;
  activenav:string = "Meu Cadastro";

  navs:Link[];

  private _mobileQueryListener: () => void;

  constructor(private cdr: ChangeDetectorRef,
    media: MediaMatcher,
    private AuthenticationService:AuthenticationService,
     private router: Router) {
      this.mobileQuery = media.matchMedia('(max-width: 600px)');
      this._mobileQueryListener = () => cdr.detectChanges();
      this.mobileQuery.addListener(this._mobileQueryListener);
     }

  LerWindowSize(){
      return this.mobileQuery;
  }

  Logout(){
    this.AuthenticationService.logout();
    this.router.navigateByUrl("/")
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.AuthenticationService.currentUser.subscribe(x=>this.user=x);

    this.navs = [
      {name: "Meu Cadastro", href: "perfil"},
      {name: "Pedidos", href: "pedidos"},
    ]
  }

}

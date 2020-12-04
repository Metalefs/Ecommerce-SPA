import { Component, Input, OnInit } from '@angular/core';

import { AuthenticationService } from '../../core/service/authentication/authentication.service';
import { entities } from '@personalizados-lopes/data';
import { NavLinks } from '../../data/models/navlinks';
import { SideNavState } from '../content-layout/page/content-layout.component';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { NavStateState } from '../../data/store/state';
import { Link, NavState } from '../../data/models';
import { EditarNavState } from '../../data/store/actions/navstate.actions';


@Component({
  selector: 'personalizados-lopes-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user: entities.Usuario;
  collapsed=true;
  links = NavLinks;
  @Input()NavState:SideNavState;
  Copyright:string = "@ Personalizados Lopes"
  @Select(NavStateState.ObterNavState) NavState$: Observable<NavState>;
  constructor(private AuthenticationService:AuthenticationService,
    private router: Router,
    private store: Store) { }

  ToggleNav(delay:number){
    setTimeout(()=>{
      this.NavState.open = this.NavState.open ? false : true;
    },delay);
  }

  SetActiveNav(link:Link){
    this.store.dispatch(new EditarNavState({activeNav:link.name}));
    this.NavState$.subscribe()
  }

  Logout(){
    this.AuthenticationService.logout();
    this.router.navigateByUrl("/")
  }

  ngOnInit(): void {
  }

}

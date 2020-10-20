import { Component, Input, OnInit } from '@angular/core';

import { AuthenticationService } from '../../core/service/authentication/authentication.service';
import { entities } from '@personalizados-lopes/data';
import { NavLinks } from '../../data/models/navlinks';
import { NavState } from '../content-layout/page/content-layout.component';
import { Router } from '@angular/router';

@Component({
  selector: 'personalizados-lopes-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user: entities.Usuario;
  collapsed=true;
  links = NavLinks;
  @Input()NavState:NavState;
  Copyright:string = "@ Personalizados Lopes"
  constructor(private AuthenticationService:AuthenticationService,
    private router: Router) { }

  ToggleNav(delay:number){
    setTimeout(()=>{
      this.NavState.open = this.NavState.open ? false : true;
    },delay);
  }


  Logout(){
    this.AuthenticationService.logout();
    this.router.navigateByUrl("/")
  }

  ngOnInit(): void {
  }

}

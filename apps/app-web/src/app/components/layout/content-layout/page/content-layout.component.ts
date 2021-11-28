import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { Select } from '@ngxs/store';
import { InformacoesContato, } from 'libs/data/src/lib/classes';
import { Observable } from 'rxjs';
import { cardFlip, fade, slideInOut, slider } from 'apps/app-web/src/app/animations';
import { MensagemService } from 'apps/app-web/src/app/data/service';
import { InformacoesContatoState } from 'apps/app-web/src/app/data/store/state';

@Component({
  selector: 'personalizados-lopes-content-layout',
  templateUrl: './content-layout.component.html',
  styleUrls: ['./content-layout.component.scss'],
  animations: [cardFlip, slider, fade, slideInOut]
})
export class ContentLayoutComponent implements OnInit {
  @Select(InformacoesContatoState.ObterInformacoesContato) InformacoesContato$: Observable<InformacoesContato>;
  Mensagem:string;
  Alerta:string = "Covid-19: Atendendo normalmente, na Personalizados Lopes você recebe em casa.";
  constructor(private service: MensagemService, private router:Router) { }
  NavState:SideNavState = {open : false};
  url:string;
  ngOnInit(): void {
    this.service.Ler().subscribe((x : any):any=>{
      this.Mensagem = x[0].Whatsapp;
    });
    this.router.events.subscribe(event=>{
      if(event instanceof NavigationStart) {
        this.url = event.url;
      }
      if(event instanceof NavigationEnd) {
        this.url = event.url;
      }
    })
  }

  ToggleNav(delay:number){
    setTimeout(()=>{
      this.NavState.open = this.NavState.open ? false : true;
    },delay);
  }
  CloseNav(){
    if(this.NavState.open)
    this.NavState.open = false;
  }
  showHeader(){
    return true;//!this.url?.includes('checkout')
  }
  prepareRoute(outlet: RouterOutlet) {
    try{
      return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
    }
    catch(ex){

    }
  }

}
export interface SideNavState{
  open:boolean
}

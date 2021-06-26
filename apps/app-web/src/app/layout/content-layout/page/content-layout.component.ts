import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Select } from '@ngxs/store';
import { InformacoesContato, } from 'libs/data/src/lib/classes';
import { Observable } from 'rxjs';
import { cardFlip, fade, slideInOut, slider } from '../../../animations';
import { InformacoesContatoState } from '../../../data/store/state';
import { MensagemService } from '../../../shared/services';

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
  constructor(private service: MensagemService) { }
  NavState:SideNavState = {open : false};

  ngOnInit(): void {
    this.service.Ler().subscribe(x=>{
      this.Mensagem = x[0].Whatsapp;
    });
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

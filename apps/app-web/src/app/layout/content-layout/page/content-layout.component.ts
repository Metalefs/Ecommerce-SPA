import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { InformacoesContato, Mensagem } from 'libs/data/src/lib/classes';
import { Observable } from 'rxjs';
import { fade, slider } from '../../../animations';
import { MensagemService } from '../../../data/service';
import { LerMensagem } from '../../../data/store/actions/Mensagem.actions';
import { InformacoesContatoState, MensagemState } from '../../../data/store/state';

@Component({
  selector: 'personalizados-lopes-content-layout',
  templateUrl: './content-layout.component.html',
  styleUrls: ['./content-layout.component.scss'],
  animations: [slider]
})
export class ContentLayoutComponent implements OnInit {
  @Select(InformacoesContatoState.ObterInformacoesContato) InformacoesContato$: Observable<InformacoesContato>;
  Mensagem:string;
  constructor(private service: MensagemService) { }
  NavState:NavState = {open : false};

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
export interface NavState{
  open:boolean
}

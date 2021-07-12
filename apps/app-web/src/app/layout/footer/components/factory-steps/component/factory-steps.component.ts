import { Component, OnInit, Input } from '@angular/core';

export class EstadoNav {
    pagina:string;
    has_badge:boolean;
    is_solid:boolean;
  }

@Component({
  selector: 'personalizados-lopes-factory-steps',
  templateUrl: './factory-steps.component.html',
  styleUrls: ['./factory-steps.component.scss']
})
export class FactoryStepsComponent implements OnInit {

  constructor() {  }
  EstadoNav = new EstadoNav();
  Opcoes:OpcaoNavbar[] = [
    new OpcaoNavbar("Inicio", "/inicio","pi pi-home"),
    new OpcaoNavbar("Produtos", "/produtos", "pi pi-shopping-cart"),
    new OpcaoNavbar("Checkout", "/checkout", "pi pi-check"),
    new OpcaoNavbar("Orcamento", "/orcamento", "pi pi-mobile"),
  ];

  ngOnInit(): void {
  }
  ChangeToThis(link){
    this.EstadoNav.pagina = link;
  }
}
export class OpcaoNavbar{
  Titulo: string;
  Link: string;
  Icon: string;
  constructor(Titulo: string,
    Link: string,
    Icon: string){
    this.Titulo= Titulo;
    this.Link= Link;
    this.Icon= Icon;
  }
}

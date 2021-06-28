import { Component, Input, OnInit } from '@angular/core';
import { Produto } from 'libs/data/src/lib/classes';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'personalizados-lopes-exibicao-breadcrumb',
  templateUrl: './exibicao-breadcrumb.component.html',
  styleUrls: ['./exibicao-breadcrumb.component.scss']
})
export class ExibicaoBreadcrumbComponent implements OnInit {
  @Input() Produto:Produto;

  items: MenuItem[];
  home: MenuItem;
  constructor() { }

  ngOnInit(): void {
    this.home = {icon: 'pi pi-home', url:"/produtos"};
    this.items = [
      {label:this.Produto?.NomeCategoria, url:"/produtos/?categoria=" + this.Produto?.NomeCategoria},
      {label:this.Produto?.Nome, styleClass:'desb'}
    ];
  }

}

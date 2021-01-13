import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { entities } from '@personalizados-lopes/data';
import { ProdutoService, CategoriaService } from '../../../../data/service/';
@Component({
  selector: 'personalizados-lopes-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  Produtos:entities.Produto[];
  constructor(private breakpointObserver: BreakpointObserver,
    private service: ProdutoService, private ServicoCategoria: CategoriaService) {
    this.service = service;
  }

  ngOnInit(){
  }
}

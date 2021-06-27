import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Select } from '@ngxs/store';
import { Categoria } from 'libs/data/src/lib/classes';
import { FiltrarProdutoSearchQuery } from 'libs/data/src/lib/interfaces';
import { Observable } from 'rxjs';
import { ProdutoService } from '../../../data/service';
import { FiltroProdutoState } from '../../../data/store/state';
import { FiltroProdutoStateModel } from '../../../data/store/state/filtroproduto.state';

@Component({
  selector: 'personalizados-lopes-autocomplete-dropdown',
  templateUrl: './autocomplete-dropdown.component.html',
  styleUrls: ['./autocomplete-dropdown.component.scss']
})
export class AutocompleteDropdownComponent implements OnInit {
  selectedProduto: any;
  Produtos: any[];
  filteredProdutoes: any[];
  selectedProdutoes: any[];
  selectedProdutoAdvanced: any[];
  filteredBrands: any[];
  CategoriaAtiva:Categoria;
  constructor(private sProduto:ProdutoService) { }
  @Select(FiltroProdutoState.ObterListaFiltroProdutos) Filtro$: Observable<FiltroProdutoStateModel>;
  @Output()
  SearchValueChanged = new EventEmitter();
  @Output()
  VerTodosResultados = new EventEmitter();
  fQuery:FiltrarProdutoSearchQuery={
    Nome:"",
    NomeCategoria:"",
    Preco:"",
    Status:"",
    Marca:"",
    Modelo:"",
    Tags:""
  }
  ngOnInit(): void {
     this.filtrar();
  }
  async filtrar(){
    this.Filtro$.subscribe(x=>{
      this.CategoriaAtiva = x.Categoria;
    })
    this.sProduto.FiltrarProdutos(this.fQuery,1,50).subscribe(x=>{
      this.Produtos = x.items;
      this.filteredProdutoes = x.items;
    })
  }
  outputNewValue(){
    this.SearchValueChanged.emit(this.selectedProdutoAdvanced);
  }
  verTodosResultados(){
    this.VerTodosResultados.emit(this.selectedProdutoAdvanced);
  }
  filterProduto(event) {
    let query = event.query;
    this.fQuery.Nome = query;
    this.filtrar();
  }
}

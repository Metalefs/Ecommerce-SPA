import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FiltrarProdutoSearchQuery } from 'libs/data/src/lib/interfaces';
import { ProdutoService } from '../../../data/service';

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
  constructor(private sProduto:ProdutoService) { }

  @Output()
  SearchValueChanged = new EventEmitter();
  fQuery:FiltrarProdutoSearchQuery={
    Nome:"",
    NomeCategoria:"",
    Preco:"",
    Status:"",
    Marca:"",
    Modelo:"",
  }
  ngOnInit(): void {
     this.filtrar();
  }
  async filtrar(){
    this.sProduto.FiltrarProdutos(this.fQuery,1,50).subscribe(x=>{
      this.Produtos = x.items;
      this.filteredProdutoes = x.items;
    })
  }
  outputNewValue(){
    console.log(this.selectedProdutoAdvanced)
    this.SearchValueChanged.emit(this.selectedProdutoAdvanced);
  }

  filterProduto(event) {
    let query = event.query;
    this.fQuery.Nome = query;
    this.filtrar();
  }
}

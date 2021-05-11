import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProdutoService } from 'apps/app-web/src/app/data/service';
import { Categoria, Produto } from 'libs/data/src/lib/classes';
import { FiltrarProdutoSearchQuery } from 'libs/data/src/lib/interfaces';
import { MegaMenuItem, MenuItem } from 'primeng/api';

@Component({
  selector: 'personalizados-lopes-mega-menu',
  templateUrl: './mega-menu.component.html',
  styleUrls: ['./mega-menu.component.scss']
})
export class MegaMenuComponent implements OnInit {

  @Input() Categorias: Categoria[];
  festas: Array<Categoria>;
  acessorios: Array<Categoria>;
  empresas: Array<Categoria>;
  items: MegaMenuItem[];

  constructor(private router: Router, private prodService: ProdutoService) { }
  fQuery: FiltrarProdutoSearchQuery = {
    Nome: "",
    NomeCategoria: "",
    Preco: "",
    Status: "",
    Marca: "",
    Modelo: "",
    Tags: ""
  }
  ngOnInit() {

    this.items = [{}];

    this.CarregarMenus("Festas",'Festas');
    this.CarregarMenus("Empresas",'Empresas');
    this.CarregarMenus("Acessório",'Acessórios');
  }

  CarregarMenus(nicho:string, label:string){


    this.festas = this.Categorias.filter((categoria) => categoria?.Nicho?.includes(nicho));
    let items:MegaMenuItem = {
      label:"",
      items:[]
    };
    let festaProds: Array<Produto> = [];
    this.festas.forEach(festa => {
      let newItem:MenuItem[] = [{
        label: festa.Nome,
        items: []
      }];
      this.prodService.FiltrarProdutos({
        Nome: "",
        NomeCategoria: festa.Nome,
        Preco: "",
        Status: "",
        Marca: "",
        Modelo: "",
        Tags: ""
      }, 1, 15).subscribe(prods => {
        prods.items.forEach(prod => {
          if(festaProds?.filter(x=>x._id != prod._id)){
            festaProds.push(prod);
            newItem[0].items.push({
              label: prod.Nome,
              command: ()=>{this.abrirProduto(prod._id)}
            });
          }
        })
        items.items.push(
          newItem
        )
      })
    })
    this.items.push({
      label: label, icon: 'pi pi-caret-down',
      items:
        items.items
    })
  }

  abrirProduto(prodId:string){
    this.router.navigate(['/produtos/'+prodId]);
  }
}

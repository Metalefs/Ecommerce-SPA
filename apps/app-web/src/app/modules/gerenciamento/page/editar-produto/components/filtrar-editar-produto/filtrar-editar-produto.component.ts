import { LabelType, Options } from '@angular-slider/ngx-slider';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Select, Store } from '@ngxs/store';
import { entities } from '@personalizados-lopes/data';
import { AuthenticationService } from 'apps/app-web/src/app/core/service/authentication/authentication.service';
import { ProdutoState, CategoriaState } from 'apps/app-web/src/app/data/store/state';
import { order, orderPreco } from 'apps/app-web/src/app/helper/ObjHelper';
import { TiposOrdenacao } from 'apps/app-web/src/app/modules/produtos/page/produtos.component';
import { OrderType, OrderStatus } from 'apps/app-web/src/app/shared/models/interfaces';
import { Categoria, Produto } from 'libs/data/src/lib/classes';
import { StatusProduto } from 'libs/data/src/lib/classes/produto';
import { FiltrarProdutoSearchQuery } from 'libs/data/src/lib/interfaces';
import { Observable } from 'rxjs';
import { EditarProdutoService } from '../../editar-produto.service';

@Component({
  selector: 'personalizados-lopes-filtrar-editar-produto',
  templateUrl: './filtrar-editar-produto.component.html',
  styleUrls: ['./filtrar-editar-produto.component.scss']
})
export class FiltrarEditarProdutoComponent implements OnInit {
  @Output() onEditar:EventEmitter<any> = new EventEmitter<any>();
  @Output() onRemover:EventEmitter<any> = new  EventEmitter<any>();

  fQuery:FiltrarProdutoSearchQuery={
    Nome:"",
    NomeCategoria:"Todos",
    Preco:"",
    Status:"",
    Marca:"",
    Modelo:"",
    Tags:""
  }

  Categorias: entities.Categoria[];

  value: number = 1;
  maxValue: number = 100;
  options: Options = {
    floor: 1,
    ceil: 200,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return "<span>Minimo:</span> R$" + value;
        case LabelType.High:
          return "<span>Máximo:</span> R$" + value;
        default:
          return "";
      }
    }
  };

  @Select(ProdutoState.areProdutosLoaded) areProdutosLoaded$;
  @Select(CategoriaState.ObterListaCategorias) Categorias$: Observable<Categoria[]>;
  Produtos:Produto[];
  ProdutoToBeUpdated: Produto;
  pagina:number=1;
  items:number=12;
  total:number=0;
  isUpdateActivated = false;
  activeSearchFilter = "";
  activeOrderFilter:number = TiposOrdenacao.nome;

  page:number = 1;
  activeOrderLimit:number = 10;
  loading:boolean = false;
  loading_more:boolean = false;

  ordertypes:OrderType[]= [
    {name:'nome (a-z)', id: TiposOrdenacao.nome},
    {name:'nome (z-a)', id: TiposOrdenacao.nomeDesc},
    {name:'maior preço', id: TiposOrdenacao.preco},
    {name:'menor preço', id: TiposOrdenacao.precoDesc},
  ]
  orderLimit:OrderType[]= [
    {name:'10 produtos por página', id: 10},
    {name:'15 produtos por página', id: 15},
    {name:'30 produtos por página', id: 30},
    {name:'50 produtos por página', id: 50},
  ]
  activeOrderStatus : OrderStatus;
  orderStatus:OrderStatus[]= [
    {name:'Padrão', id: StatusProduto.padrao},
    {name:'Novos', id: StatusProduto.novo},
    {name:'Em promoção', id: StatusProduto.promocao},
    {name:'Esgotados', id: StatusProduto.esgotado},
  ]

  Parcelamento:boolean;
  MultiplasCores:boolean;
  defaultCategory = "Todos os produtos";
  CategoriaAtiva:Categoria;

  constructor(
    protected store: Store,
    protected dialog: MatDialog,
    protected _snackBar: MatSnackBar,
    protected produtoService: EditarProdutoService,
    protected authService: AuthenticationService
    ) {
      this.fQuery={
        Nome:"",
        NomeCategoria:this.defaultCategory,
        Preco:"",
        Status:"",
        Marca:"",
        Modelo:"",
        Tags:""
      }
  }

  ngOnInit(): void {
    this.Atualizar();
    this.atualizarFiltroAtivo();
  }

  atualizarFiltroAtivo(){
    this.loading = true;
    this.fQuery.Nome = this.activeSearchFilter||''
    this.fQuery.NomeCategoria  = this.CategoriaAtiva?.Nome||"Todos";
    if(this.page > 1)
      this.page =1;
    this.produtoService.FiltrarProdutos(this.fQuery,this.page,this.activeOrderLimit).subscribe(async x=>{
      this.total = x.total;
      switch(+this.activeOrderFilter){
        case TiposOrdenacao.nome:
         x.items = x.items.sort((a, b) => a.Nome.localeCompare(b.Nome));
        break;

        case TiposOrdenacao.nomeDesc:
         x.items = x.items.sort((a, b) => this.order(a,b,true));
        break;

        case TiposOrdenacao.preco:
         x.items = x.items.sort((a, b) => this.orderPreco(a,b,false));
        break;

        case TiposOrdenacao.precoDesc:
         x.items = x.items.sort((a, b) => this.orderPreco(a,b,true));
        break;
      }
      this.Produtos = x.items;
      this.changeOptions(this.Produtos.length > 1 ? Math.max(...this.Produtos.map(o=> o.Preco)) : this.Produtos[0].Preco);
    })
  }

  changeOptions(ceil:number) {
    const newOptions: Options = Object.assign({}, this.options);
    newOptions.ceil = ceil;
    this.options = newOptions;
  }

  filtroAtivo(produto:Produto){
    if(produto){
      if(this.matchSearchFilter(produto) &&
          this.matchPriceFilter(produto) &&
          this.matchStatusFilter(produto) &&
          this.matchParcelamentoFilter(produto) &&
          this.matchMultiplasCoresFilter(produto))
          return this.CategoriaAtiva?.Nome == this.defaultCategory
                  ||  this.CategoriaAtiva?.Nome == produto?.Categoria?.Nome || null;
    }
    return false;
  }

  matchParcelamentoFilter(produto:Produto){
    if(this.Parcelamento)
      return produto?.Parcelas > 0;
    return true;
  }
  matchMultiplasCoresFilter(produto:Produto){
    if(this.MultiplasCores)
      return produto?.Cores.length > 1;
    return true;
  }
  matchPriceFilter(produto:Produto){
    if(this.value)
      return produto?.Preco >= this.value && produto.Preco <= this.maxValue ;
  }
  matchStatusFilter(produto:Produto){
    if(this.activeOrderStatus)
      if(this.activeOrderStatus.id == StatusProduto.padrao)
        return true;
      else
        return produto.Status >= this.activeOrderStatus.id;
    return true;
  }
  matchSearchFilter(produto:Produto){
    if(this.activeSearchFilter)
    return this.activeSearchFilter.length > 0 ?
     produto.Nome.toLocaleLowerCase().includes(this.activeSearchFilter.toLocaleLowerCase())
     :
     true;
    return true;
  }

  order(a,b,desc){
    return order(a,b,desc)
  }
  orderPreco(a,b,desc){
    return orderPreco(a,b,desc)
  }

  SetCategoria(categoria:Categoria){
    this.CategoriaAtiva = categoria == null ?
    new Categoria(this.defaultCategory,this.defaultCategory)
    :
    this.CategoriaAtiva = categoria;
    this.ResetPage();
    this.atualizarFiltroAtivo();
  }

  ResetPage(){
    this.page = 1;
  }

  async Remover(Produto){
    let confirmation = confirm("Deletar?");
    if(confirmation){
      (await this.produtoService.Remover(Produto._id)).subscribe(async x=>{
        this._snackBar.open("Produto "+Produto.Nome+" removido com sucesso", "Fechar", {
          duration: 3000
        });
       this.Atualizar();
      });
    }
  }

  Atualizar(){
    this.produtoService.FiltrarProdutos(this.fQuery,1,50).subscribe(x=>{
      this.Produtos = x.items;
      this.total = x.total;
    })
  }

  CarregarMaisProdutos(){
    this.pagina++;
    this.produtoService.FiltrarProdutos(this.fQuery,this.pagina,this.items).subscribe(x=>{
      this.total = x.total;
      x.items.forEach(item=>this.Produtos.push(item))
      console.log(x);
    })
  }

}

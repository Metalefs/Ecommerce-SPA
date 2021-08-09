import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngxs/store';
import { fade } from 'apps/app-web/src/app/animations';
import { AuthenticationService } from 'apps/app-web/src/app/core/service/authentication/authentication.service';
import { ProdutosComponent } from 'apps/app-web/src/app/modules/produtos/page/produtos.component';
import { ProdutoStateService } from 'apps/app-web/src/app/modules/produtos/produto-state.service';
import { Produto } from 'libs/data/src/lib/classes';
import { EditarProdutoService } from '../../editar-produto.service';

@Component({
  selector: 'personalizados-lopes-filtrar-editar-produto',
  templateUrl: './filtrar-editar-produto.component.html',
  styleUrls: ['./filtrar-editar-produto.component.scss'],
  animations: [fade]
})
export class FiltrarEditarProdutoComponent extends ProdutosComponent implements OnInit{
  @Output() onEditar:EventEmitter<any> = new EventEmitter<any>();
  @Output() onRemover:EventEmitter<any> = new  EventEmitter<any>();


  private _Produtos: Produto[];
  public get Produtos(): Produto[] {
    return this.produtoStateService.Produtos;
  }
  public set Produtos(value: Produto[]) {
    this.produtoStateService.Produtos = value;
  }
  ProdutoToBeUpdated: Produto;
  isUpdateActivated = false;

  private _Categorias$;
  public get Categorias$() {
    return this.produtoStateService.Categorias$;
  }
  public set Categorias$(value) {
    this.produtoStateService.Categorias$ = value;
  }
  private _CategoriaAtiva;
  public get CategoriaAtiva() {
    return this.produtoStateService.CategoriaAtiva;
  }
  public set CategoriaAtiva(value) {
    this.produtoStateService.CategoriaAtiva = value;
  }
  private _ordertypes;
  public get ordertypes() {
    return this.produtoStateService.ordertypes;
  }
  public set ordertypes(value) {
    this.produtoStateService.ordertypes = value;
  }
  private _activeOrderLimit;
  public get activeOrderLimit() {
    return this.produtoStateService.activeOrderLimit;
  }
  public set activeOrderLimit(value) {
    this.produtoStateService.activeOrderLimit = value;
  }
  private _orderLimit;
  public get orderLimit() {
    return this.produtoStateService.orderLimit;
  }
  public set orderLimit(value) {
    this.produtoStateService.orderLimit = value;
  }
  private _activeSearchFilter;
  public get activeSearchFilter() {
    return this.produtoStateService.activeSearchFilter;
  }
  public set activeSearchFilter(value) {
    this.produtoStateService.activeSearchFilter = value;
  }
  private _activeOrderFilter;
  public get activeOrderFilter() {
    return this.produtoStateService.activeOrderFilter;
  }
  public set activeOrderFilter(value) {
    this.produtoStateService.activeOrderFilter = value;
  }
  private _activeOrderStatus;
  public get activeOrderStatus() {
    return this.produtoStateService.activeOrderStatus;
  }
  public set activeOrderStatus(value) {
    this.produtoStateService.activeOrderStatus = value;
  }
  private _orderStatus;
  public get orderStatus() {
    return this.produtoStateService.orderStatus;
  }
  public set orderStatus(value) {
    this.produtoStateService.orderStatus = value;
  }
  private _Parcelamento;
  public get Parcelamento() {
    return this.produtoStateService.Parcelamento;
  }
  public set Parcelamento(value) {
    this.produtoStateService.Parcelamento = value;
  }
  private _MultiplasCores;
  public get MultiplasCores() {
    return this.produtoStateService.MultiplasCores;
  }
  public set MultiplasCores(value) {
    this.produtoStateService.MultiplasCores = value;
  }

  private _value;
  public get value() {
    return this.produtoStateService.value;
  }
  public set value(value) {
    this.produtoStateService.value = value;
  }

  private _maxValue;
  public get maxValue() {
    return this.produtoStateService.maxValue;
  }
  public set maxValue(value) {
    this.produtoStateService.maxValue = value;
  }
  private _options;
  public get options() {
    return this.produtoStateService.options;
  }
  public set options(value) {
    this.produtoStateService.options = value;
  }

  constructor(
    protected store: Store,
    protected dialog: MatDialog,
    protected _snackBar: MatSnackBar,
    protected produtoService: EditarProdutoService,
    protected produtoStateService: ProdutoStateService,
    protected authService: AuthenticationService
    ) {
      super(produtoStateService)
  }

  filtroAtivo(produto){
    return this.produtoStateService.filtroAtivo(produto);
  }
  CarregarMaisProdutos(){
    this.produtoStateService.CarregarMaisProdutos();
  }

  async Remover(Produto){
    let confirmation = confirm("Deletar?");
    if(confirmation){
      (await this.produtoService.Remover(Produto._id)).subscribe(async x=>{
        this._snackBar.open("Produto "+Produto.Nome+" removido com sucesso", "Fechar", {
          duration: 3000
        });
       this.produtoStateService.Atualizar();
      });
    }
  }
}

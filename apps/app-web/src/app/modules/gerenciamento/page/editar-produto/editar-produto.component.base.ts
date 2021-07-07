import { Injectable, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { entities } from '@personalizados-lopes/data';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { BlogPost, CorProduto, Produto, TamanhoProduto } from 'libs/data/src/lib/classes';
import { EditarProdutoService } from './editar-produto.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { translateEnum } from 'apps/app-web/src/app/helper/ObjHelper';
import { StatusProduto } from 'libs/data/src/lib/classes/produto';
import { LabelType, Options } from '@angular-slider/ngx-slider';
import { FormControl } from '@angular/forms';
import { AdicionarCategoria } from 'apps/app-web/src/app/data/store/actions/categoria.actions';
import { MatChipInputEvent } from '@angular/material/chips';
import { GalleryConfig } from 'ng-gallery';
import { CriarPostComponent } from '../editar-blog/dialogs/criar-post/criar-post.component';
import { CriarClienteDialogComponent } from '../editar-clientes/DialogComponents/criar-cliente-dialog/criar-cliente-dialog.component';
import { AdicionarCliente } from 'apps/app-web/src/app/data/store/actions/cliente.actions';
import { AuthenticationService } from 'apps/app-web/src/app/core/service/authentication/authentication.service';
import { CriarCategoriaDialogComponent } from './components/editar-categoria/DialogComponents/criar-dialog/criar-dialog.component';
@Injectable({
  providedIn: 'root'
})
export class EditarProdutoComponentBase implements OnInit {

  galleryConfig$: Observable<GalleryConfig>;
  enumStatusProduto = StatusProduto;
  fileNames:string="nenhum arquivo selecionado.";
  Produto:Produto;
  visible = true;
  selectable = true;
  removable = true;
  public Editor;

  tagCtrl = new FormControl();
  colorCtrl:FormControl = new FormControl();
  sizeCtrl = new FormControl();
  filteredSizes: Observable<string[]>;
  allSizes: string[] = ['P','M','G','GG','XGG'];

  Categorias: entities.Categoria[];
  Cores: CorProduto[];
  Tamanhos: TamanhoProduto[];

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

  constructor(
    protected store: Store,
    protected dialog: MatDialog,
    protected _snackBar: MatSnackBar,
    protected produtoService: EditarProdutoService,
    protected authService: AuthenticationService
    ) {

  }

  ngOnInit(): void {
  }


  CriarCategoria(): void {
    const dialogRef = this.dialog.open(CriarCategoriaDialogComponent, {
      width: '90%',
      data: ""
    });
    dialogRef.afterClosed().subscribe((Categoria : entities.Categoria) => {
      if(Categoria != undefined)
      this.store.dispatch(new AdicionarCategoria(Categoria)).subscribe(x=> {
        this._snackBar.open("Categoria "+Categoria.Nome+" criada com sucesso", "Fechar", {

        });
        this.CarregarCategorias();
      });
    });
  }

  CriarPostagem(): void {
    const dialogRef = this.dialog.open(CriarPostComponent, {
      width: '90%',
      data: ""
    });
    dialogRef.afterClosed().subscribe((post: BlogPost) => {
      if (post != undefined) {
        this.authService.currentUser.subscribe(usr => {
          post.Autor.Nome = usr.Nome;
          post.Autor.Email = usr.Email;
          post.DataHoraAlteracao = new Date();
          post.DataHoraCriacao = new Date();
          this.produtoService.CriarPostagem(post).then(() => {
            this._snackBar.open("Adicionando postagem", "Fechar", {

            });
          });
        })
      }
    });
  }

  CriarDepoimento(): void {
    const dialogRef = this.dialog.open(CriarClienteDialogComponent, {
      width: '90%',
      data: ""
    });
    dialogRef.afterClosed().subscribe((Cliente: entities.Cliente) => {
      if (Cliente != undefined) {
        this.produtoService.SalvarImagemCliente(Cliente.Foto).then(async task => {
          Cliente.Foto = await this.produtoService.ObterCaminhoImagem((await task).metadata.fullPath, Cliente.Nome, "Cliente");
          this.store.dispatch(new AdicionarCliente(Cliente)).subscribe();
        })
      }
    });
  }

  CarregarCategorias(){
    this.produtoService.CarregarCategorias().subscribe(x=>{this.Categorias = x;});
  }

  CarregarCores(){
    this.produtoService.CarregarCores().subscribe(x=>{this.Cores = x;});
  }

  CarregarTamanhos(){
    this.produtoService.CarregarTamanhos().subscribe(x=>{this.Tamanhos = x;});
  }

  upload($event){
    this.Produto.FileList = $event.target.files;
    this.fileNames = '';

    for(let i =0; i < this.Produto.FileList.length; i++)
      this.fileNames+=this.Produto.FileList[i].name+',';
  }

  addTag(event: MatChipInputEvent): void{
    const input = event.input;
    const value = event.value;
    if ((value || '').trim())
      this.Produto.Tags.push(value.trim());
    if (input)
      input.value = '';
    this.tagCtrl.setValue(null);
  }
  removeTag(tag: string){
    const index = this.Produto.Tags.indexOf(tag);
    if (index >= 0) {
      this.Produto.Tags.splice(index, 1);
    }
  }

  SelecionarCategoria($event){
    this.Produto.Categoria = this.Categorias.filter(cat => cat.Nome == $event.value)[0];
  }

  IncrementarQuantidade(){
    this.Produto.Quantidade++;
    if(this.Produto.QuantidadeMinima < this.Produto.Quantidade)
      this.Produto.QuantidadeMinima = this.Produto.Quantidade;
  }
  DecrescerQuantidade(){
    if(this.Produto.Quantidade > this.Produto.QuantidadeMinima)
    this.Produto.Quantidade--;

    if(this.Produto.QuantidadeMinima > this.Produto.Quantidade)
    this.Produto.QuantidadeMinima = this.Produto.Quantidade;
  }
  VerificarQuantidade($event){
    if($event.target.value < this.Produto.QuantidadeMinima)
      this.Produto.Quantidade = this.Produto.QuantidadeMinima;
  }
  translateStatusProduto(status){
    return translateEnum(StatusProduto,status);
  }
}

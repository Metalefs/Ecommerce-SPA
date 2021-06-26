import { Component, Injectable, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { entities } from '@personalizados-lopes/data';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { BlogPost, Categoria, Produto } from 'libs/data/src/lib/classes';
import { ProdutoState } from 'apps/app-web/src/app/data/store/state/produto.state';
import { EditarProdutoService } from './editar-produto.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { translateEnum } from 'apps/app-web/src/app/helper/ObjHelper';
import { Cor, StatusProduto } from 'libs/data/src/lib/classes/produto';
import { LabelType, Options } from '@angular-slider/ngx-slider';
import { fade } from 'apps/app-web/src/app/animations';
import { FormControl } from '@angular/forms';
import { CriarCategoriaDialogComponent } from '../editar-categoria/DialogComponents/criar-dialog/criar-dialog.component';
import { AdicionarCategoria } from 'apps/app-web/src/app/data/store/actions/categoria.actions';
import { MatChipInputEvent } from '@angular/material/chips';
import { GalleryConfig } from 'ng-gallery';
import { CriarPostComponent } from '../editar-blog/dialogs/criar-post/criar-post.component';
import { CriarClienteDialogComponent } from '../editar-clientes/DialogComponents/criar-cliente-dialog/criar-cliente-dialog.component';
import { AdicionarCliente } from 'apps/app-web/src/app/data/store/actions/cliente.actions';
import { AuthenticationService } from 'apps/app-web/src/app/core/service/authentication/authentication.service';
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
  colorCtrl = new FormControl();
  filteredColors: Observable<Cor[]>;
  allColors: Cor[] = [
    {nome: 'Branco', cor:'white'},
    {nome: 'Preto', cor:'black'},
    {nome: 'Azul Marinho', cor:'tealblue'},
  ];

  tagCtrl = new FormControl();
  sizeCtrl = new FormControl();
  filteredSizes: Observable<string[]>;
  allSizes: string[] = ['P','M','G','GG','XGG'];

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

  upload($event){
    this.Produto.FileList = $event.target.files;
    this.fileNames = '';
    for(let i =0; i < this.Produto.FileList.length; i++){
      this.fileNames+=this.Produto.FileList[i].name+',';
      console.log(this.Produto.FileList[i].name)
    }
    console.log(this.fileNames)
  }

  addCor(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim())
      this.Produto.Cores.push(
        {
          nome:value.split(';')[0].trim(),
          cor:value.split(';')[1].trim()
        }
      );

    if (input)
      input.value = '';
    this.colorCtrl.setValue(null);
  }
  addTamanho(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim())
      this.Produto.Tamanhos.push(value.trim());
    if (input)
      input.value = '';

    this.sizeCtrl.setValue(null);
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
  removeCor(color: Cor): void {
    const index = this.Produto.Cores.indexOf(color);
    if (index >= 0) {
      this.Produto.Cores.splice(index, 1);
    }
  }
  removeTamanho(tamanho: string): void {
    const index = this.Produto.Tamanhos.indexOf(tamanho);
    if (index >= 0) {
      this.Produto.Tamanhos.splice(index, 1);
    }
  }

  SelecionarCategoria($event){
    this.Produto.Categoria = this.Categorias.filter(cat => cat.Nome == $event.value)[0];
  }

  IncrementarQuantidade(){
    this.Produto.Quantidade++;
  }
  DecrescerQuantidade(){
    if(this.Produto.Quantidade > this.Produto.QuantidadeMinima)
    this.Produto.Quantidade--;
  }
  VerificarQuantidade($event){
    if($event.target.value < this.Produto.QuantidadeMinima)
      this.Produto.Quantidade = this.Produto.QuantidadeMinima;
  }
  translateStatusProduto(status){
    return translateEnum(StatusProduto,status);
  }
}

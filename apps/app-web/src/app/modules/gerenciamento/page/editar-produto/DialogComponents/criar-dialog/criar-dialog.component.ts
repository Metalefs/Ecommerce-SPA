import { SelectionChange } from '@angular/cdk/collections';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { entities } from '@personalizados-lopes/data';
import { BlogPostService, CategoriaService, ImagemService } from 'apps/app-web/src/app/data/service';
import { BlogPost, Produto } from 'libs/data/src/lib/classes';
import { Cor, StatusProduto } from 'libs/data/src/lib/classes/produto';
import { Observable } from 'rxjs';
import { EditarProdutoDialogComponent } from '../editar-dialog/editar-dialog.component';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-balloon';
import { translateEnum } from 'apps/app-web/src/app/helper/ObjHelper';
import { CriarCategoriaDialogComponent } from '../../../editar-categoria/DialogComponents/criar-dialog/criar-dialog.component';
import { Store } from '@ngxs/store';
import { AdicionarCategoria } from 'apps/app-web/src/app/data/store/actions/categoria.actions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from 'apps/app-web/src/app/core/service/authentication/authentication.service';
import { CriarClienteDialogComponent } from '../../../editar-clientes/DialogComponents/criar-cliente-dialog/criar-cliente-dialog.component';
import { AdicionarCliente } from 'apps/app-web/src/app/data/store/actions/cliente.actions';
import { PathDictionary } from 'libs/data/src/lib/routes/image-folders';
import { CriarPostComponent } from '../../../editar-blog/dialogs/criar-post/criar-post.component';

@Component({
  selector: 'personalizados-lopes-criar-dialog',
  templateUrl: './criar-dialog.component.html',
  styleUrls: ['./criar-dialog.component.scss']
})
export class CriarProdutoDialogComponent implements OnInit {

  enumStatusProduto = StatusProduto;
  fileNames:string="nenhum arquivo selecionado.";
  Produto:Produto;
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  public Editor = ClassicEditor;
  colorCtrl = new FormControl();
  filteredColors: Observable<Cor[]>;
  allColors: Cor[] = [
    {nome: 'Branco', cor:'white'},
    {nome: 'Preto', cor:'black'},
    {nome: 'Azul Marinho', cor:'tealblue'},
  ];

  sizeCtrl = new FormControl();
  filteredSizes: Observable<string[]>;
  allSizes: string[] = ['P','M','G','GG','XGG'];

  tagCtrl = new FormControl();
  @ViewChild('colorInput') colorInput: ElementRef<HTMLInputElement>;
  @ViewChild('tamanhoInput') tamanhoInput: ElementRef<HTMLInputElement>;
  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto1') matAutocompleteCor: MatAutocomplete;
  @ViewChild('auto2') matAutocompleteTamanho: MatAutocomplete;

  Categorias: entities.Categoria[];
  statusProduto:string[] = [];
  constructor(public dialogRef: MatDialogRef<EditarProdutoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:  entities.Produto,
    private ServicoCategoria: CategoriaService,
    private dialog:MatDialog,
    private store:Store,
    private snack:MatSnackBar,
    private servicoImagens:ImagemService,
    private authService:AuthenticationService,
    private BlogService:BlogPostService

    ) {
      this.Produto = new Produto (
        "",
        "",
        "",
        null,
        "",
        [""],
        0,
        0,
        "",
        null,
        0,
        [{nome:'branco',cor:'white'}],
        ["M"],
        StatusProduto.novo,
        0,
        false,
        [''],
        "",
        "",
        0,
        {Altura:0,Largura:0, Comprimento:0},
        "",
        "",
        [],
        "",
        "",
        );
    }

  ngOnInit() {
    this.CarregarCategorias();
    for (var enumMember in StatusProduto){
      if(isNaN(parseInt(StatusProduto[enumMember])))
      this.statusProduto.push(StatusProduto[enumMember])
    }

  }
  CriarCategoria(): void {

    const dialogRef = this.dialog.open(CriarCategoriaDialogComponent, {
      width: '90%',
      data: ""
    });

    dialogRef.afterClosed().subscribe((Categoria : entities.Categoria) => {
      if(Categoria != undefined)
      this.store.dispatch(new AdicionarCategoria(Categoria)).subscribe(x=> {
        this.snack.open("Categoria "+Categoria.Nome+" criada com sucesso", "Fechar", {
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

    dialogRef.afterClosed().subscribe((post : BlogPost) => {
      if(post != undefined){
        this.authService.currentUser.subscribe(usr=>{
          post.Autor.Nome = usr.Nome;
          post.Autor.Email = usr.Email;
          post.DataHoraAlteracao = new Date();
          post.DataHoraCriacao = new Date();
          this.BlogService.create(post).then(() => {
            this.snack.open("Adicionando postagem", "Fechar", {

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

    dialogRef.afterClosed().subscribe((Cliente : entities.Cliente) => {
      if(Cliente != undefined){
        this.servicoImagens.storeImage(PathDictionary.clientes,Cliente.Foto).then(async x=>{
          Cliente.Foto = await this.servicoImagens.getRef((await x).metadata.fullPath,Cliente.Nome,"Cliente");
          console.log(Cliente.Foto);
          this.store.dispatch(new AdicionarCliente(Cliente)).subscribe();
        })
      }
    });

  }
  CarregarCategorias(){
    this.ServicoCategoria.Ler().subscribe(x=>{this.Categorias = x; console.log(x)});
  }

  SelecionarCategoria($event){
    console.log($event);
    this.Produto.Categoria = this.Categorias.filter(cat => cat.Nome == $event.value)[0];
    this.Produto.NomeCategoria = this.Produto.Categoria.Nome;
    console.log(this.Produto.Categoria)
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
  onNoClick(): void {
    this.dialogRef.close();
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


  selectedCor(event: MatAutocompleteSelectedEvent): void {
    alert(event.option.viewValue);
    // this.Produto.Cores.push();
    this.colorInput.nativeElement.value = '';
    this.colorCtrl.setValue(null);
  }
  selectedTamanho(event: MatAutocompleteSelectedEvent): void {
    this.Produto.Tamanhos.push(event.option.viewValue);
    this.colorInput.nativeElement.value = '';
    this.colorCtrl.setValue(null);
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

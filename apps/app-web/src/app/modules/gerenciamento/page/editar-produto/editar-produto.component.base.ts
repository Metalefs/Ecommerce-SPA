import { Injectable, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { entities } from '@personalizados-lopes/data';
import { Store } from '@ngxs/store';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

import { BlogPost, CorProduto, FornecedorProduto, Produto, TamanhoProduto } from 'libs/data/src/lib/classes';
import { EditarProdutoService } from './editar-produto.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { isEmpty, translateEnum } from 'apps/app-web/src/app/helper/ObjHelper';
import { StatusProduto } from 'libs/data/src/lib/classes/produto';
import { LabelType, Options } from '@angular-slider/ngx-slider';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdicionarCategoria } from 'apps/app-web/src/app/data/store/actions/categoria.actions';
import { MatChipInputEvent } from '@angular/material/chips';
import { GalleryConfig } from 'ng-gallery';
import { CriarPostComponent } from '../editar-blog/dialogs/criar-post/criar-post.component';
import { CriarClienteDialogComponent } from '../editar-clientes/DialogComponents/criar-cliente-dialog/criar-cliente-dialog.component';
import { AdicionarCliente } from 'apps/app-web/src/app/data/store/actions/cliente.actions';
import { AuthenticationService } from 'apps/app-web/src/app/core/service/authentication/authentication.service';
import { CriarCategoriaDialogComponent } from './components/editar-categoria/DialogComponents/criar-dialog/criar-dialog.component';
import { EditarFornecedorProdutoComponent } from './components/editar-fornecedor-produto/editar-fornecedor-produto.component';
import { EditarFornecedorProdutoFormComponent } from './components/editar-fornecedor-produto/components/editar-fornecedor-produto-form/editar-fornecedor-produto-form.component';
import { EditarCorProdutoFormComponent } from './components/editar-cor-produto/components/editar-cor-produto-form/editar-cor-produto-form.component';
import { EditarTamanhoProdutoDialogComponent } from './components/editar-tamanho-produto/dialogs/editar-tamanho-produto-dialog/editar-tamanho-produto-dialog.component';
import { DynFormQuestions, QuestionBase } from 'apps/app-web/src/app/shared/components/dynamic-form/question-base';
import { TextboxQuestion } from 'apps/app-web/src/app/shared/components/dynamic-form/question-textbox';
import { DynamicFormComponent } from 'apps/app-web/src/app/shared/components/dynamic-form/dynamic-form.component';
@Injectable({
  providedIn: 'root'
})
export class EditarProdutoComponentBase implements OnInit {

  galleryConfig$: Observable<GalleryConfig>;
  enumStatusProduto = StatusProduto;
  fileNames:string="nenhum arquivo selecionado.";
  Produto: Produto;

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
  Fornecedores: FornecedorProduto[];

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
  produtoForm:FormGroup;

  constructor(
    protected store: Store,
    protected dialog: MatDialog,
    protected _snackBar: MatSnackBar,
    protected produtoService: EditarProdutoService,
    protected authService: AuthenticationService,
    protected fb:FormBuilder
    ) {
      this.produtoForm = this.fb.group({
        Categoria: [this.Produto?.Categoria,[Validators.required]],
        Nome: [this.Produto?.Nome,[Validators.required]],
        Subtitulo: [this.Produto?.Subtitulo,[Validators.required]],
        DescricaoRapida: [this.Produto?.DescricaoRapida,[Validators.required]],
        Marca: [this.Produto?.Marca,[Validators.required]],
        Modelo: [this.Produto?.Modelo,[Validators.required]],
        Preco: [this.Produto?.Preco,[Validators.required]],
        Quantidade: [this.Produto?.Quantidade,[Validators.required]],
        QuantidadeMinima: [this.Produto?.QuantidadeMinima,[Validators.required]],
        Cores: [this.Produto?.Cores,[Validators.required]],
        Dimensoes: [this.Produto?.Dimensoes,[Validators.required]],
        Peso: [this.Produto?.Peso,[Validators.required]],
        Tamanhos: [this.Produto?.Tamanhos,[Validators.required]],
        Status: [this.Produto?.Status,[Validators.required]],
        Tags: [this.Produto?.Tags,[Validators.required]],
        Imagem: [this.Produto?.Imagem,[]],
        Descricao: [this.Produto?.Descricao,[Validators.required]],
        Especificacoes: [this.Produto?.Especificacoes,[Validators.required]],
      })
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
            this._snackBar.open("Postagem adicionada com sucesso", "Fechar", {

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


  CriarFornecedor(){
    const fornecedor = new FornecedorProduto('','');
    let questions: QuestionBase<string>[] = [];
      let method = "Editar";
      let name = "Fornecedor Produto";
      let id = fornecedor._id;
      Object.entries(fornecedor).forEach(([key, value]) => {
        if (key != "_id")
          questions.push(
            new TextboxQuestion({
              key: key,
              label: key,
              value: value as string,
              required: true,
              type: "textbox",
              order: 1
            })
          )
      })
      let Data = new DynFormQuestions(questions, method, name);
      const dialogRef = this.dialog.open(DynamicFormComponent, {
        width: '90%',
        height: "100%",
        data: Data,
      });

      dialogRef.afterClosed().subscribe((result: TextboxQuestion[]) => {
        if (result == undefined)
          return;
        let fornecedor = new FornecedorProduto(
          result[0].value,
          result[1].value,
        )
        fornecedor._id = id;
        this.produtoService.CriarFornecedor(fornecedor).subscribe(() => {
          this._snackBar.open("Fornecedor adicionado com sucesso", "Fechar", {

          });
        });
        this.CarregarFornecedores();
      });
  }

  CriarCorProduto(){
    const dialogRef = this.dialog.open(EditarCorProdutoFormComponent, {
      width: '90%',
      data: new CorProduto('','')
    });
    dialogRef.afterClosed().subscribe((corProduto: entities.CorProduto) => {
      if (corProduto != undefined) {
        this.produtoService.CriarCorProduto(corProduto).subscribe(() => {
          this._snackBar.open("Cor adicionada com sucesso", "Fechar", {

          });
          this.CarregarCores();
        });
      }
    });
  }

  CriarTamanhoProduto(){
    const dialogRef = this.dialog.open(EditarTamanhoProdutoDialogComponent, {
      width: '90%',
      data: new TamanhoProduto('',[])
    });
    dialogRef.afterClosed().subscribe((tamanho: entities.TamanhoProduto) => {
      if (tamanho != undefined) {
        this.produtoService.CriarTamanhoProduto(tamanho).subscribe(() => {
          this._snackBar.open("Tamanho adicionado com sucesso", "Fechar", {

          });
          this.CarregarTamanhos();
        });
      }
    });
  }

  CarregarCategorias(){
    this.produtoService.CarregarCategorias().subscribe(x=>{this.Categorias = x as any;});
  }

  CarregarCores(){
    this.produtoService.CarregarCores().subscribe(x=>{this.Cores = x;});
  }

  CarregarTamanhos(){
    this.produtoService.CarregarTamanhos().subscribe(x=>{this.Tamanhos = x;});
  }

  CarregarFornecedores(){
    this.produtoService.CarregarFornecedores().subscribe(x=>{this.Fornecedores = x});
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
    this.produtoForm.get("Tags").setValue(this.Produto.Tags);

  }
  removeTag(tag: string){
    const index = this.Produto.Tags.indexOf(tag);
    if (index >= 0) {
      this.Produto.Tags.splice(index, 1);
    }
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

    this.produtoForm.get("Quantidade").setValue(this.Produto.Quantidade);
  }
  translateStatusProduto(status){
    return translateEnum(StatusProduto,status);
  }
}

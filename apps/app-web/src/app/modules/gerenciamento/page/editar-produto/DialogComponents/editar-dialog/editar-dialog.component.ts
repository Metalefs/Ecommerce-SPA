import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Component, ElementRef, Inject, OnInit, ViewChild,Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';

import { Observable } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { entities } from '@personalizados-lopes/data';
import { CategoriaService } from 'apps/app-web/src/app/data/service';
import { Produto } from 'libs/data/src/lib/classes';
import { Cor, StatusProduto } from 'libs/data/src/lib/classes/produto';

import * as ClassicEditor from '@ckeditor/ckeditor5-build-balloon';
import { translateEnum } from 'apps/app-web/src/app/helper/ObjHelper';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { GalleryConfig, GalleryItem, Gallery, ThumbnailsPosition } from 'ng-gallery';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngxs/store';
import { AdicionarCategoria } from 'apps/app-web/src/app/data/store/actions/categoria.actions';
import { CriarCategoriaDialogComponent } from '../../../editar-categoria/DialogComponents/criar-dialog/criar-dialog.component';

@Component({
  selector: 'personalizados-lopes-editar-dialog',
  templateUrl: './editar-dialog.component.html',
  styleUrls: ['./editar-dialog.component.scss']
})
export class EditarProdutoDialogComponent implements OnInit {
  galleryConfig$: Observable<GalleryConfig>;
  images: GalleryItem[];
  images$: Observable<GalleryItem[]>;
  enumStatusProduto = StatusProduto;
  fileNames:string="nenhum arquivo selecionado.";
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

  @Input() Produto:Produto;
  Categorias: entities.Categoria[];
  statusProduto:string[] = [];
  constructor(public dialogRef: MatDialogRef<EditarProdutoDialogComponent>,
    breakpointObserver: BreakpointObserver,
    private gallery: Gallery,
    @Inject(MAT_DIALOG_DATA) public data:  entities.Produto,
    private ServicoCategoria: CategoriaService,
    private dialog:MatDialog,
    private store:Store,
    private snack:MatSnackBar
  ) {
    dialogRef.disableClose = true;
    this.Produto = data;
    if(!this.Produto.Cores){
      this.Produto.Cores = [{cor:'',nome:''}]
    }
    if(!this.Produto.Tamanhos){
      this.Produto.Tamanhos = []
    }
    this.galleryConfig$ = breakpointObserver.observe([
      Breakpoints.HandsetPortrait
    ]).pipe(
      map(res => {
        if (res.matches) {
          return {
            thumbPosition: ThumbnailsPosition.Bottom,
            thumbWidth: 80,
            thumbHeight: 80,
          };
        }
        return {
          thumbPosition: ThumbnailsPosition.Bottom,
          thumbWidth: 120,
          thumbHeight: 90
        };
      })
    );
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
  CarregarCategorias(){
    this.ServicoCategoria.Ler().subscribe(x=>{this.Categorias = x;});
  }

  ngOnInit() {
    this.CarregarCategorias();
    for (var enumMember in StatusProduto){
      if(isNaN(parseInt(StatusProduto[enumMember])))
      this.statusProduto.push(StatusProduto[enumMember])
    }
    const galleryRef = this.gallery.ref('myGallery');
    this.Produto?.Imagem.forEach(img =>{
      console.log(img);
      galleryRef.addImage({ src:img, thumb: img });
    });
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
  SelecionarCategoria($event){
    console.log($event);
    this.Produto.Categoria = this.Categorias.filter(cat => cat.Nome == $event.value)[0];
    console.log(this.Produto.Categoria)
  }

  onNoClick(): void {
    this.dialogRef.close();
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

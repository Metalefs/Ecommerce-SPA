import { Component, ElementRef, Inject, OnInit, ViewChild,Input, PLATFORM_ID } from '@angular/core';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { entities } from '@personalizados-lopes/data';
import { Produto } from 'libs/data/src/lib/classes';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Gallery, ThumbnailsPosition } from 'ng-gallery';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngxs/store';
import { isPlatformBrowser } from '@angular/common';
import { EditarProdutoComponentBase } from '../../editar-produto.component.base';
import { EditarProdutoService } from '../../editar-produto.service';
import { AuthenticationService } from 'apps/app-web/src/app/core/service/authentication/authentication.service';
import { FormBuilder, Validators } from '@angular/forms';
import { StatusProduto } from 'libs/data/src/lib/classes/produto';
declare var require: any;
@Component({
  selector: 'personalizados-lopes-editar-dialog',
  templateUrl: './editar-dialog.component.html',
  styleUrls: ['./editar-dialog.component.scss']
})
export class EditarProdutoDialogComponent extends EditarProdutoComponentBase implements OnInit {

  @ViewChild('colorInput') colorInput: ElementRef<HTMLInputElement>;
  @ViewChild('tamanhoInput') tamanhoInput: ElementRef<HTMLInputElement>;
  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto1') matAutocompleteCor: MatAutocomplete;
  @ViewChild('auto2') matAutocompleteTamanho: MatAutocomplete;

  Produto: Produto;
  Status:string;
  produtoFormulario;

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    public dialogRef: MatDialogRef<EditarProdutoDialogComponent>,
    breakpointObserver: BreakpointObserver,
    private gallery: Gallery,
    @Inject(MAT_DIALOG_DATA) public data:  entities.Produto,
    protected dialog:MatDialog,
    protected store:Store,
    protected snack:MatSnackBar,
    protected produtoService:EditarProdutoService,
    protected authService: AuthenticationService,
    protected fb:FormBuilder
  ) {
    super(store,dialog,snack,produtoService,authService,fb);
    dialogRef.disableClose = true;
    this.Produto = data;
    if(!this.Produto.Cores){
      this.Produto.Cores = []
    }
    if(!this.Produto.Tamanhos){
      this.Produto.Tamanhos = []
    }
    if(!this.Produto.Peso){
      this.Produto.Peso = 0
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
    if(isPlatformBrowser(this.platformId)){
      const ClassicEditor = require('@ckeditor/ckeditor5-build-balloon');
      this.Editor = ClassicEditor;
    }
  }

  ngOnInit() {
    this.CarregarCategorias();

    const galleryRef = this.gallery.ref('myGallery');
    this.Produto?.Imagem.forEach(img =>{
      console.log(img);
      galleryRef.addImage({ src:img, thumb: img });
    });

  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  salvar(): void {
    const auxProduto = {...this.Produto, ...this.produtoFormulario};
    this.dialogRef.close(auxProduto);
  }
}

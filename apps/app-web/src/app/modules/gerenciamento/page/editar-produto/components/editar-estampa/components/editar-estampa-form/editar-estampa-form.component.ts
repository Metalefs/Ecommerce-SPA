import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { getPreviewURL } from 'apps/app-web/src/app/helper/FileHelper';
import { Categoria, Estampa } from 'libs/data/src/lib/classes';
import { EditarEstampaService } from '../../editar-estampa.service';

@Component({
  selector: 'personalizados-lopes-editar-estampa-form',
  templateUrl: './editar-estampa-form.component.html',
  styleUrls: ['./editar-estampa-form.component.scss']
})
export class EditarEstampaFormComponent implements OnInit {
  @Input() Estampa:Estampa;
  @Output() onUpdate:EventEmitter<any> = new EventEmitter<any>();
  estampaForm:FormGroup;
  categorias: Categoria[] = [];
  fileNames:string = "";
  constructor(
    private estampaService:EditarEstampaService,
    private fb:FormBuilder,
    protected snackBar: MatSnackBar,
    ) { }

  ngOnInit(): void {
    this.estampaForm = this.fb.group({
      IdCategoria:[this.Estampa?.IdCategoria||'',[Validators.required]],
      Imagem:[this.Estampa?.Imagem||'',[]],
      Base64:[this.Estampa?.Base64||'',[]],
      Preco:[this.Estampa?.Preco||'',[Validators.required]],
      Descricao:[this.Estampa?.Descricao||'',[Validators.required]],
      Posicao:[this.Estampa?.Posicao||'',[]],
      Destaque:[this.Estampa?.Destaque||'',[]],
      FileList:[this.Estampa?.FileList||'',[]],
    })
    this.CarregarCategorias();
  }

  CarregarCategorias(){
    this.estampaService.CarregarCategorias().subscribe(x=>{this.categorias = x;});
  }

  SelecionarCategoria(Categoria:Categoria[]){
    this.estampaForm.get("IdCategoria").setValue(Categoria.map(x=>x._id).join(","));
  }

  SetPrecoEstampa(preco){
    this.estampaForm.get("Preco").setValue(preco);
  }

  SetDescricaoEstampa(descricao){
    this.estampaForm.get("Descricao").setValue(descricao);
  }

  SetPosicaoEstampa(posicao){
    this.estampaForm.get("Posicao").setValue(posicao);
  }

  SetDestaqueEstampa(destacar){
    this.estampaForm.get("Destaque").setValue(destacar.checked);
  }

  UploadFiles(files){
    this.estampaService.UploadFile(files, this.estampaForm.getRawValue() as Estampa, this.fileNames);
    getPreviewURL(files, this.fileNames, (res,name)=>{
      this.Estampa.Base64 = res;
      this.estampaForm.get("FileList").setValue(files.target.files);
      this.fileNames = name;
    })
  }

  async Criar() {
    await (await this.estampaService.CriarEstampa(this.estampaForm.getRawValue())).subscribe(result=>{
      this.snackBar.open("Estampa criada com sucesso", "Fechar", {verticalPosition:"top"});
      this.onUpdate.emit();
    })
  }
}

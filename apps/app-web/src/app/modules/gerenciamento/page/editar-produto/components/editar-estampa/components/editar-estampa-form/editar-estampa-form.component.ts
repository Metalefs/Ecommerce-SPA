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
  @Input() Estampa: Estampa;
  @Output() onUpdate: EventEmitter<any> = new EventEmitter<any>();
  estampaForm: FormGroup;
  categorias: Categoria[] = [];
  fileNames: string = "";
  constructor(
    private estampaService: EditarEstampaService,
    private fb: FormBuilder,
    protected snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.estampaForm = this.fb.group({
      IdCategoria: [this.Estampa?.IdCategoria || '', [Validators.required]],
      Imagem: [this.Estampa?.Imagem || '', []],
      Base64: [this.Estampa?.Base64 || '', []],
      Preco: [this.Estampa?.Preco || '', [Validators.required]],
      Descricao: [this.Estampa?.Descricao || '', [Validators.required]],
      Posicao: [this.Estampa?.Posicao || '', []],
      Destaque: [this.Estampa?.Destaque || '', []],
      Nome: [this.Estampa?.Nome || '', []],
      Files: [this.Estampa?.Files || '', []],
    })
    this.CarregarCategorias();
  }

  CarregarCategorias() {
    this.estampaService.CarregarCategorias().subscribe(x => { this.categorias = x; });
  }

  SelecionarCategoria(Categoria: Categoria[]) {
    this.estampaForm.get("IdCategoria").setValue(Categoria.map(x => x._id).join(","));
  }

  SetPrecoEstampa(preco) {
    this.estampaForm.get("Preco").setValue(preco);
  }

  SelecionarNome(nome) {
    this.estampaForm.get("Nome").setValue(nome);
  }

  SetDescricaoEstampa(descricao) {
    this.estampaForm.get("Descricao").setValue(descricao);
  }

  SetPosicaoEstampa(posicao) {
    this.estampaForm.get("Posicao").setValue(posicao);
  }

  SetDestaqueEstampa(destacar) {
    this.estampaForm.get("Destaque").setValue(destacar.checked);
  }

  UploadFiles(files) {
    this.estampaService.UploadFile(files, this.estampaForm.getRawValue() as Estampa, this.fileNames);
    getPreviewURL(files, this.fileNames, (res, name) => {
      this.Estampa.Base64 = res;
      this.Estampa.Files = files.target.files;
      this.estampaForm.get("Files").setValue(files.target.files);
      this.fileNames = name;
    })
  }

  async Criar() {
    let estampaCriar = this.estampaForm.getRawValue() as Estampa;
    if (estampaCriar.Files.length) {
      for (let i = 0; i < estampaCriar.Files.length; i++) {
        let estampaaux =
          new Estampa(
            estampaCriar.Nome,
            estampaCriar.IdCategoria,
            estampaCriar.Imagem,
            estampaCriar.Preco,
            estampaCriar.Descricao,
            estampaCriar.Posicao,
            estampaCriar.Destaque
          );

        estampaaux.Files = [];
        estampaaux.Files[0] = estampaCriar.Files.item(i);

        await (await this.estampaService.CriarEstampa(estampaaux)).subscribe(result => {
          this.snackBar.open("Estampa criada com sucesso", "Fechar", { verticalPosition: "top" });
          this.onUpdate.emit();
        })
      }
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';
import { entities } from '@personalizados-lopes/data';
import { ImagemService } from 'apps/app-web/src/app/data/service';
import { DynamicFormComponent } from 'apps/app-web/src/app/shared/components/dynamic-form/dynamic-form.component';
import { QuestionBase, DynFormQuestions } from 'apps/app-web/src/app/shared/components/dynamic-form/question-base';
import { FileQuestion } from 'apps/app-web/src/app/shared/components/dynamic-form/question-file';
import { TextboxQuestion } from 'apps/app-web/src/app/shared/components/dynamic-form/question-textbox';
import { Imagem } from 'libs/data/src/lib/classes';
import { MaterialTable } from 'libs/data/src/lib/structures/MaterialTable';

@Component({
  selector: 'personalizados-lopes-editar-imagem',
  templateUrl: './editar-imagem.component.html',
  styleUrls: ['./editar-imagem.component.scss']
})
export class EditarImagemComponent implements OnInit {

  ImagemTable:MaterialTable;
  Imagems:any;
  Loading:boolean = true;

  constructor(
    private service:ImagemService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar) { }

  AtualizarTabela(){
    this.service.Ler().subscribe((x : entities.Imagem[])=>{
      this.Imagems = x;
      this.ImagemTable.dataSource = new Array(x);
      this.Loading = false;
    })
  }

  ngOnInit(): void {
    this.ImagemTable = new MaterialTable();
    this.AtualizarTabela();
    this.ImagemTable.displayedColumns = [
      "Src",
      "Nome",
      "Tipo",
      "Acoes",
    ];
  }

  Criar(): void {
    let questions: QuestionBase<string>[] = [];
    let method = "Criar";
    let name = "Imagem";
    let imagem = new entities.Imagem("", "", "", null);
    Object.entries(imagem).forEach(([key, value]) => {
      if(key != "_id" && key != "FileList")
      questions.push(
        new TextboxQuestion({
          key: key,
          label: key,
          value: value,
          required: true,
          type:"textbox",
          order: 1
        })
      )
      if(key == "FileList")
      questions.push(
        new FileQuestion({
          key: key,
          label: key,
          value: value,
          required: true,
          type:"Imagem",
          order: 1
        })
      )
    });
    let Data = new DynFormQuestions(questions,method,name);
    const dialogRef = this.dialog.open(DynamicFormComponent, {
      width: '90%',
      data: Data
    });

    dialogRef.afterClosed().subscribe((result : TextboxQuestion[]) => {
      let imagem = new Imagem(
        result[0].value,
        result[1].value,
        result[2].value,
        result[3].value as unknown as FileList,
        )
      if(imagem != undefined){
        this.service.Incluir(imagem,true).subscribe(x=> {
          this.AtualizarTabela();
          this._snackBar.open("Imagem"+imagem.Src+" configurado com sucesso", "Fechar", {

          });
        });
      }
    });
  }

  Editar(Imagem:entities.Imagem){

    let questions: QuestionBase<string>[] = [];
    let method = "Editar";
    let name = "Imagem";
    let id = Imagem._id;
    Object.entries(Imagem).forEach(([key, value]) => {
      if(key != "_id")
      questions.push(
        new TextboxQuestion({
          key: key,
          label: key,
          value: value,
          required: true,
          type:"textbox",
          order: 1
        })
      )
    })
    console.log(questions)
    let Data = new DynFormQuestions(questions,method,name);
    const dialogRef = this.dialog.open(DynamicFormComponent, {
      width: '90%',
      data: Data
    });

    dialogRef.afterClosed().subscribe((result :TextboxQuestion[]) => {
      if(result == undefined)
      return;
      let Imagem = new entities.Imagem(
        result[0].value,
        result[1].value,
        result[2].value,
      )
      Imagem._id = id;
      this.service.Editar(Imagem).subscribe(x=> {
        this.AtualizarTabela();
        this._snackBar.open("Imagem"+ Imagem.Src +" alterado com sucesso", "Fechar", {

        });
      });
    });
  }

  async Remover(Imagem:entities.Imagem){
    let confirmation = confirm("Deletar?");
    if(confirmation){
      await this.service.deleteImage(Imagem.Src).then(x=>{
        this.AtualizarTabela();
        this._snackBar.open("Imagem"+ Imagem.Src +" removido com sucesso", "Fechar", {

        });
      });
    }
  }
}

import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MaterialTable } from 'libs/data/src/lib/structures/MaterialTable';

import { DynamicFormComponent } from '../../../../shared/components/dynamic-form/dynamic-form.component';
import { TextboxQuestion } from '../../../../shared/components/dynamic-form/question-textbox';
import { QuestionBase, DynFormQuestions } from '../../../../shared/components/dynamic-form/question-base';

import { entities } from '@personalizados-lopes/data';
import { TemaService } from '../../../../data/service/';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'personalizados-lopes-editar-tema',
  templateUrl: './editar-tema.component.html',
  styleUrls: ['./editar-tema.component.scss']
})
export class EditarTemaComponent implements OnInit {


  Tema:entities.Tema = null;
  TemaTable:MaterialTable;

  constructor(
    private service: TemaService,
    private dialog: MatDialog,
    private _snackBar:MatSnackBar) {

    this.service = service;

  }
  AtualizarTabela(){
    this.service.Ler().subscribe(x=>{
      this.TemaTable.dataSource = x;
    })
  }

  Editar(Tema:entities.Tema){

    let questions: QuestionBase<string>[] = [];
    let method = "Editar";
    let name = "Tema";
    let id = Tema._id;
    Object.entries(Tema).forEach(([key, value]) => {
      if(key != "_id")
      questions.push(
        new TextboxQuestion({
          key: key,
          label: key,
          value: value,
          required: true,
          type:"textarea",
          order: 1
        })
      )
    })

    let Data = new DynFormQuestions(questions,method,name);
    const dialogRef = this.dialog.open(DynamicFormComponent, {
      width: '90%',
      data: Data
    });

    dialogRef.afterClosed().subscribe((result :TextboxQuestion[]) => {
      let Tema = new entities.Tema(
        result[0].value,
        result[1].value,
        result[2].value,
      )
      Tema._id = id;
      this.service.Editar(Tema).subscribe(x=> {
        this.AtualizarTabela();
        this._snackBar.open("Informação alterada","Fechar");
      });
    });
  }

  Remover(Tema:entities.Tema){
    this.service.Remover(Tema._id);
  }

  ngOnInit(): void {
    this.TemaTable = new MaterialTable();
    this.AtualizarTabela();
    this.TemaTable.displayedColumns = [
        "CorPrimaria",
        "CorSecundaria",
        "CorTerciaria",
        "Acoes",
    ];
  }

}

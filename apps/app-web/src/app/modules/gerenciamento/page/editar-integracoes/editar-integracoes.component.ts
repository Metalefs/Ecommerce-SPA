import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { entities } from '@personalizados-lopes/data';
import { IntegracoesService } from 'apps/app-web/src/app/data/service';
import { DynamicFormComponent } from 'apps/app-web/src/app/shared/components/dynamic-form/dynamic-form.component';
import { DynFormQuestions, QuestionBase } from 'apps/app-web/src/app/shared/components/dynamic-form/question-base';
import { TextboxQuestion } from 'apps/app-web/src/app/shared/components/dynamic-form/question-textbox';
import { Integracoes } from 'libs/data/src/lib/classes';
import { MaterialTable } from 'libs/data/src/lib/structures/MaterialTable';

@Component({
  selector: 'personalizados-lopes-editar-integracoes',
  templateUrl: './editar-integracoes.component.html',
  styleUrls: ['./editar-integracoes.component.scss']
})
export class EditarIntegracoesComponent implements OnInit {

  IntegracoesTable:MaterialTable;

  constructor(
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private servicoIntegracoes: IntegracoesService) {
      this.IntegracoesTable = new MaterialTable();

  }
  AtualizarTabela(){
    this.servicoIntegracoes.Ler().subscribe(x=>{
      console.log(x);
      this.IntegracoesTable.dataSource = [x];
    });
  }

  Editar(Integracoes:entities.Integracoes){

    let questions: QuestionBase<string>[] = [];
    let method = "Editar";
    let name = "Informações Integrações";
    let id = Integracoes._id;
    Object.entries(Integracoes).forEach(([key, value]) => {
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
      let Integracoes = new entities.Integracoes(
        result[0].value,
        parseInt(result[1].value),
        result[2].value,
      )
      Integracoes._id = id;
      this.servicoIntegracoes.Editar(Integracoes).subscribe(x=> {
        this.AtualizarTabela();
        this._snackBar.open("Informação alterada com sucesso", "Fechar", {

        });
      });
    });
  }

  Remover(Integracoes:entities.Integracoes){
    throw "not implemented";
  }

  ngOnInit(): void {

    this.IntegracoesTable = new MaterialTable();
    this.AtualizarTabela();
    this.IntegracoesTable.displayedColumns = [
      "MP_access_token",
      "ParcelasPadrao",
      "ResumoCartao",
      "Acoes"
    ];
  }

}

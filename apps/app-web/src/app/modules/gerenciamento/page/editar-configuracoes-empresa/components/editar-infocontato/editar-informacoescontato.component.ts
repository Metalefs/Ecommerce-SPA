import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { MaterialTable } from 'libs/data/src/lib/structures/MaterialTable';
import { DynamicFormComponent } from 'apps/app-web/src/app/shared/components/dynamic-form/dynamic-form.component';
import { TextboxQuestion } from 'apps/app-web/src/app/shared/components/dynamic-form/question-textbox';
import { QuestionBase, DynFormQuestions } from 'apps/app-web/src/app/shared/components/dynamic-form/question-base';

import { entities } from '@personalizados-lopes/data';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InformacoesContatoState } from 'apps/app-web/src/app/data/store/state';
import { Select, Store } from '@ngxs/store';
import { InformacoesContato } from 'libs/data/src/lib/classes';
import { Observable } from 'rxjs';
import { EditarInformacoesContato } from 'apps/app-web/src/app/data/store/actions/informacoescontato.actions';

@Component({
  selector: 'personalizados-lopes-editar-informacoescontato',
  templateUrl: './editar-informacoescontato.component.html',
  styleUrls: ['./editar-informacoescontato.component.css']
})
export class EditarInformacoesContatoComponent implements OnInit {

  @Select(InformacoesContatoState.ObterInformacoesContato) InformacoesContato$: Observable<InformacoesContato[]>;
  InformacoesContatoTable:MaterialTable;

  constructor(
    private dialog: MatDialog,
    private store: Store,
    private _snackBar: MatSnackBar) {


  }
  AtualizarTabela(){
    this.InformacoesContato$.subscribe(x=>{
      this.InformacoesContatoTable.dataSource = [x];
    })
  }

  Editar(InformacoesContato:entities.InformacoesContato){

    let questions: QuestionBase<string>[] = [];
    let method = "Editar";
    let name = "Informações de contato";
    let id = InformacoesContato._id;
    Object.entries(InformacoesContato).forEach(([key, value]) => {
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
      let InformacoesContato = new entities.InformacoesContato(
        result[0].value,
        result[1].value,
        result[2].value,
        result[3].value,
        result[4].value,
        result[5].value,
        result[6].value
      )
      InformacoesContato._id = id;
      this.store.dispatch( new EditarInformacoesContato(InformacoesContato,InformacoesContato._id)).subscribe(x=> {
        this.AtualizarTabela();
        this._snackBar.open("Informação alterada com sucesso", "Fechar", {

        });
      });
    });
  }

  Remover(InformacoesContato:entities.InformacoesContato){
    throw "not implemented";
  }

  ngOnInit(): void {
    this.InformacoesContatoTable = new MaterialTable();
    this.AtualizarTabela();
    this.InformacoesContatoTable.displayedColumns = [
      "Telefone",
      "Email",
      "HorarioAtendimento",
      "Endereco",
      "Whatsapp",
      "Instagram",
      "Facebook",
      "Acoes"
    ];
  }


}

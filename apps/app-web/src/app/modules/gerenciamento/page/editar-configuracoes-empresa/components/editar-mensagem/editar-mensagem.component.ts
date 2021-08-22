import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { MaterialTable } from 'libs/data/src/lib/structures/MaterialTable';
import { DynamicFormComponent } from 'apps/app-web/src/app/shared/components/dynamic-form/dynamic-form.component';
import { TextboxQuestion } from 'apps/app-web/src/app/shared/components/dynamic-form/question-textbox';
import { EmailMessageQuestion } from 'apps/app-web/src/app/shared/components/dynamic-form/question-email-message';
import { QuestionBase, DynFormQuestions } from 'apps/app-web/src/app/shared/components/dynamic-form/question-base';

import { entities } from '@personalizados-lopes/data';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Mensagem } from 'libs/data/src/lib/classes';
import { MensagemState } from 'apps/app-web/src/app/data/store/state';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { AdicionarMensagem, EditarMensagem, RemoverMensagem } from 'apps/app-web/src/app/data/store/actions/mensagem.actions';

@Component({
  selector: 'personalizados-lopes-editar-mensagem',
  templateUrl: './editar-mensagem.component.html',
  styleUrls: ['./editar-mensagem.component.scss']
})
export class EditarMensagemComponent implements OnInit {

  @Select(MensagemState.ObterListaMensagems) Mensagem$: Observable<Mensagem[]>;
  MensagemTable:MaterialTable;

  constructor(
     private store: Store,
     private dialog: MatDialog,
     private _snackBar: MatSnackBar) {  }
  AtualizarTabela(){
    this.Mensagem$.subscribe(x=>{
      this.MensagemTable.dataSource = x;
    })
  }

  Criar(): void {
    let questions: QuestionBase<string>[] = [];
    let method = "Criar";
    let name = "Mensagem";
    let message = new Mensagem("","","","","","","","");
    Object.entries(message).forEach(([key, value]) => {
      if(key != "_id" && key != "Whatsapp")
      questions.push(
        new EmailMessageQuestion({
          key: key,
          label: key,
          value: value,
          required: true,
          type:"email-messaging",
          order: 1
        })
      )
      else
      if(key == "Whatsapp")
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
    });
    let Data = new DynFormQuestions(questions,method,name);
    const dialogRef = this.dialog.open(DynamicFormComponent, {
      width: '90%',
      data: Data
    });

    dialogRef.afterClosed().subscribe((result :TextboxQuestion[]) => {
      if(result != undefined) {
        let Mensagem = new entities.Mensagem(
          result[0].value,
          result[1].value,
          result[2].value,
          result[3].value,
          result[4].value,
          result[5].value,
          result[6].value,
          )
          this.store.dispatch(new AdicionarMensagem(Mensagem)).subscribe(x=> {
            this.AtualizarTabela();
            this._snackBar.open("Mensagem configurada com sucesso", "Fechar", {

            });
          });
        }
    });
  }
  Editar(Mensagem:entities.Mensagem){

    let questions: QuestionBase<string>[] = [];
    let method = "Editar";
    let name = "Mensagem";
    let id = Mensagem._id;
    Object.entries(Mensagem).forEach(([key, value]) => {
      if(key != "_id" && key != "Whatsapp" && key != "DataHoraCriacao" && key != "DataHoraAlteracao")
      questions.push(
        new EmailMessageQuestion({
          key: key,
          label: key,
          value: value,
          required: true,
          type:"email-messaging",
          order: 1
        })
      )
      if(key == "Whatsapp")
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
      let Mensagem = new entities.Mensagem(
        result[0].value,
        result[1].value,
        result[2].value,
        result[3].value,
        result[4].value,
        result[5].value,
        result[6].value,
      )
      Mensagem._id = id;
      this.store.dispatch(new EditarMensagem(Mensagem, Mensagem._id)).subscribe(x=> {
        this.AtualizarTabela();
        this._snackBar.open("Mensagem alterada com sucesso", "Fechar", {

        });
      });
    });
  }

  Remover(Mensagem:entities.Mensagem){
    this.store.dispatch(new RemoverMensagem(Mensagem._id)).subscribe(x=>{
      this.AtualizarTabela();
      this._snackBar.open("Mensagem removida com sucesso", "Fechar", {

      });
    });
  }

  ngOnInit(): void {
    this.MensagemTable = new MaterialTable();
    this.AtualizarTabela();
    this.MensagemTable.displayedColumns = [
      "Whatsapp",
      "EmailRecebimentoOrcamento",
      "EmailRecebimentoContato",
      "EmailCadadastroUsuario",
      "EmailProdutoReestocado",
      "EmailRecuperacaoSenha",
      "EmailCadastroCodRastreamentoPedido",
      "Acoes",
    ];
  }


}

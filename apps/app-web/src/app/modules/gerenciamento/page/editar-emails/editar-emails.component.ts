import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { entities } from '@personalizados-lopes/data';
import { EmailNotificacaoService } from 'apps/app-web/src/app/data/service/EmailNotificacaoService';
import { DynamicFormComponent } from 'apps/app-web/src/app/shared/components/dynamic-form/dynamic-form.component';
import { QuestionBase, DynFormQuestions } from 'apps/app-web/src/app/shared/components/dynamic-form/question-base';
import { TextboxQuestion } from 'apps/app-web/src/app/shared/components/dynamic-form/question-textbox';
import { EmailNotificacao } from 'libs/data/src/lib/classes';
import { MaterialTable } from 'libs/data/src/lib/structures/MaterialTable';
declare var require: any;

@Component({
  selector: 'personalizados-lopes-editar-emails',
  templateUrl: './editar-emails.component.html',
  styleUrls: ['./editar-emails.component.scss']
})
export class EditarEmailsComponent implements OnInit {

  emailTable:MaterialTable;
  emails:any;
  Loading:boolean = true;
  public Editor;
  isBrowser = false;
  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private service:EmailNotificacaoService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar) {
      this.isBrowser = isPlatformBrowser(this.platformId);
      if (this.isBrowser) {
         const ClassicEditor = require('@ckeditor/ckeditor5-build-balloon');
         this.Editor = ClassicEditor;
      }
     }

  AtualizarTabela(){
    this.service.Ler().subscribe((x : entities.EmailNotificacao[])=>{
      x.forEach(y=>{
        y = new checkable(y);
      })
      this.emails = x;
      this.emailTable.dataSource = x;
      this.Loading = false;
    })
  }

  ngOnInit(): void {
    this.emailTable = new MaterialTable();
    this.AtualizarTabela();
    this.emailTable.displayedColumns = [
      "checked",
      "Email",
      "Nome",
      "Produto",
      "Acoes",
    ];
  }

  CheckAll(){
    this.emails.forEach(x=>{
      x.checked = !x.checked;
    })
    this.emailTable.dataSource = this.emails;
  }

  Criar(): void {
    let questions: QuestionBase<string>[] = [];
    let method = "Criar";
    let name = "EmailNotificacao";
    let emailNotificacao = new EmailNotificacao("", "");
    Object.entries(emailNotificacao).forEach(([key, value]) => {
      if(key != "_id")
      questions.push(
        new TextboxQuestion({
          key: key,
          label: key,
          value: value,
          required: true,
          type:"email",
          order: 1
        })
      )
    });
    let Data = new DynFormQuestions(questions,method,name);
    const dialogRef = this.dialog.open(DynamicFormComponent, {
      width: '90%',
      data: Data
    });

    dialogRef.afterClosed().subscribe((EmailNotificacao : entities.EmailNotificacao) => {
      if(EmailNotificacao != undefined)
      this.service.Incluir(EmailNotificacao).subscribe(x=> {
        this.AtualizarTabela();
        this._snackBar.open("EmailNotificacao "+EmailNotificacao.Email+" configurado com sucesso", "Fechar", {

        });
      });
    });

  }
  Editar(EmailNotificacao:entities.EmailNotificacao){

    let questions: QuestionBase<string>[] = [];
    let method = "Editar";
    let name = "EmailNotificacao";
    let id = EmailNotificacao._id;
    Object.entries(EmailNotificacao).forEach(([key, value]) => {
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
      let EmailNotificacao = new entities.EmailNotificacao(
        result[0].value,
        result[1].value,
      )
      EmailNotificacao._id = id;
      this.service.Editar(EmailNotificacao).subscribe(x=> {
        this.AtualizarTabela();
        this._snackBar.open("EmailNotificacao "+ EmailNotificacao.Email +" alterado com sucesso", "Fechar", {

        });
      });
    });
  }

  Remover(EmailNotificacao:EmailNotificacao){
    let confirmacao = confirm("Deletar ?");
    if(confirmacao)
    this.service.Remover(EmailNotificacao._id).subscribe(x=>{
      this.AtualizarTabela();
      this._snackBar.open("EmailNotificacao "+ EmailNotificacao.Email +" removido com sucesso", "Fechar", {

      });
    });
  }
}
class checkable extends EmailNotificacao {
  checked:boolean;
  constructor(ent: EmailNotificacao){
    super(ent.Email,ent.Nome);

  }
}

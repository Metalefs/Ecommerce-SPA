import { Component, Input, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngxs/store';
import { entities } from '@personalizados-lopes/data';
import { ClienteService, ImagemService } from 'apps/app-web/src/app/data/service';
import { EditarCliente, RemoverCliente } from 'apps/app-web/src/app/data/store/actions/cliente.actions';
import { DynamicFormComponent } from 'apps/app-web/src/app/shared/components/dynamic-form/dynamic-form.component';
import { QuestionBase, DynFormQuestions } from 'apps/app-web/src/app/shared/components/dynamic-form/question-base';
import { TextboxQuestion } from 'apps/app-web/src/app/shared/components/dynamic-form/question-textbox';
import { FileQuestion } from 'apps/app-web/src/app/shared/components/dynamic-form/question-file';
import { Cliente } from 'libs/data/src/lib/classes';

import { fade } from '../.././../../../../animations';
import { PathDictionary } from 'libs/data/src/lib/routes/image-folders';

@Component({
  selector: 'personalizados-lopes-edicao-card-cliente',
  templateUrl: './edicao-card-cliente.component.html',
  styleUrls: ['./edicao-card-cliente.component.scss'],
  animations:[
    fade
  ]
})
export class EdicaoCardClienteComponent implements OnInit {

  @Input() Cliente:entities.Cliente;
  constructor(
    private service: ClienteService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private store: Store,
    private servicoImagens:ImagemService
    ) {

    this.service = service;

  }

  ngOnInit(): void {
  }

  Editar(){

    let questions: QuestionBase<string>[] = [];
    let method = "Editar";
    let name = "Depoimento";
    let id = this.Cliente._id;
    Object.entries(this.Cliente).forEach(([key, value]) => {
      if(key != "_id" && key != "Foto")
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
      if(key == "Foto"){
        questions.push(
          new FileQuestion({
            key: key,
            label: key,
            value: value,
            required: true,
            type:"file",
            controlType:"file",
            order: 1
          })
        )
      }
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
      let Cliente = new entities.Cliente(
        result[0].value,
        result[1].value,
        result[2].value,
        result[3]?.value,
        result[4]?.value,
      )
      Cliente._id = id;

      this.SalvarCliente(Cliente);

    });
  }

  async SalvarCliente(cliente:Cliente){
    this.servicoImagens.storeImage(PathDictionary.clientes,cliente.Foto).then(async x=>{
      cliente.Foto = await this.servicoImagens.getRef((await x).metadata.fullPath,cliente.Nome,"Cliente");
      console.log(cliente.Foto);
      this.store.dispatch(new EditarCliente(cliente,cliente._id)).subscribe(x=>{
        this._snackBar.open("Depoimento alterado com sucesso", "Fechar", {

        });
      });
    })
  }

  Remover(){
    let confirmation = confirm("Deletar?");
    if(confirmation){
      this.store.dispatch(new RemoverCliente(this.Cliente._id)).subscribe(x=>{
        this._snackBar.open("Depoimento "+this.Cliente.Nome+" removido com sucesso", "Fechar", {

        });
      });
    }
  }

}

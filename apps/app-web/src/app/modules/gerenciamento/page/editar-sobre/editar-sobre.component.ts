import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MaterialTable } from 'libs/data/src/lib/structures/MaterialTable';

import { DynamicFormComponent } from '../../../../shared/components/dynamic-form/dynamic-form.component';
import { TextboxQuestion } from '../../../../shared/components/dynamic-form/question-textbox';
import { QuestionBase, DynFormQuestions } from '../../../../shared/components/dynamic-form/question-base';

import { entities } from '@personalizados-lopes/data';
import { SobreService } from '../../../../data/service/';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SobreState } from 'apps/app-web/src/app/data/store/state';
import { Sobre } from 'libs/data/src/lib/classes';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { EditarSobre } from 'apps/app-web/src/app/data/store/actions/sobre.actions';
import { EmailMessageQuestion } from 'apps/app-web/src/app/shared/components/dynamic-form/question-email-message';

@Component({
  selector: 'personalizados-lopes-editar-sobre',
  templateUrl: './editar-sobre.component.html',
  styleUrls: ['./editar-sobre.component.css']
})
export class EditarSobreComponent implements OnInit {

  @Select(SobreState.ObterSobre) Sobre$: Observable<Sobre>;

  constructor(
    private store: Store,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar) {
  }

  Editar(){
    this.Sobre$.subscribe(sobre=>{

      let questions: QuestionBase<string>[] = [];
      let method = "Editar";
      let name = "Sobre";
      let id = sobre._id;
      Object.entries(sobre).forEach(([key, value]) => {
        if(key != "_id")
        questions.push(
          new EmailMessageQuestion({
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
        if(result == undefined)
        return;
        let Sobre = new entities.Sobre(
          result[0].value,
          result[1].value,
          result[2].value,
          result[3].value,
          result[5].value,
        )
        Sobre._id = id;
        this.store.dispatch(new EditarSobre(Sobre, Sobre._id)).subscribe(x=> {
          this._snackBar.open("Informação alterada","Fechar");
        });
      });
    })
  }

  Remover(Sobre:entities.Sobre){
    throw 'not implemented'
  }

  ngOnInit(): void {

  }
}

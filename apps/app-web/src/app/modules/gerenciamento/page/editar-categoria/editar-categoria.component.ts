import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { MaterialTable } from 'libs/data/src/lib/structures/MaterialTable';
import { DynamicFormComponent } from '../../../../shared/components/dynamic-form/dynamic-form.component';
import { TextboxQuestion } from '../../../../shared/components/dynamic-form/question-textbox';
import { ColorQuestion } from '../../../../shared/components/dynamic-form/question-color';
import { QuestionBase, DynFormQuestions } from '../../../../shared/components/dynamic-form/question-base';

import { entities } from '@personalizados-lopes/data';
import { CategoriaService } from '../../../../data/service/';

import { CriarCategoriaDialogComponent } from './DialogComponents/criar-dialog/criar-dialog.component';
import { fade } from 'apps/app-web/src/app/animations';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoriaState } from 'apps/app-web/src/app/data/store/state';
import { Categoria } from 'libs/data/src/lib/classes';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AdicionarCategoria, EditarCategoria, RemoverCategoria } from 'apps/app-web/src/app/data/store/actions/categoria.actions';
@Component({
  selector: 'personalizados-lopes-editar-categoria',
  templateUrl: './editar-categoria.component.html',
  styleUrls: ['./editar-categoria.component.scss'],
  animations: [fade]
})
export class EditarCategoriaComponent implements OnInit {

  @Select(CategoriaState.ObterListaCategorias) Categorias$: Observable<Categoria[]>;
  CategoriaTable:MaterialTable;

  constructor(
     private store:Store,
     private dialog: MatDialog,
     private _snackBar: MatSnackBar) {

  }
  AtualizarTabela(){
    this.Categorias$.subscribe(x=>{
      this.CategoriaTable.dataSource = x;
    })
  }

  Criar(): void {

    const dialogRef = this.dialog.open(CriarCategoriaDialogComponent, {
      width: '90%',
      data: ""
    });

    dialogRef.afterClosed().subscribe((Categoria : entities.Categoria) => {
      if(Categoria != undefined)
      this.store.dispatch(new AdicionarCategoria(Categoria)).subscribe(x=> {
        this.AtualizarTabela();
        this._snackBar.open("Categoria "+Categoria.Nome+" criada com sucesso", "Fechar", {

        });
      });
    });

  }
  Editar(Categoria:entities.Categoria){

    let questions: QuestionBase<string>[] = [];
    let method = "Editar";
    let name = "Categoria";
    let id = Categoria._id;
    Object.entries(Categoria).forEach(([key, value]) => {
      if(key != "_id" && key != "Cor")
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
      if(key == "Cor")
      questions.push(
        new ColorQuestion({
          key: key,
          label: key,
          value: value,
          required: true,
          type:"color",
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
      let Categoria = new entities.Categoria(
        result[0].value,
        result[1].value,
        result[2].value,
        result[3].value,
      )
      Categoria._id = id;
      console.log(Categoria);
      this.store.dispatch(new EditarCategoria(Categoria, Categoria._id)).subscribe(x=> {
        this.AtualizarTabela();
        this._snackBar.open("Categoria alterada com sucesso", "Fechar", {

        });
      });
    });
  }

  Remover(Categoria:entities.Categoria){
    let confirmation = confirm("Deletar?");
    if(confirmation){
      this.store.dispatch(new RemoverCategoria(Categoria._id)).subscribe(x=>{
        this.AtualizarTabela();
        this._snackBar.open("Categoria "+Categoria.Nome+" removida com sucesso", "Fechar", {

        });
      });
    }
  }

  ngOnInit(): void {
    this.CategoriaTable = new MaterialTable();
    this.AtualizarTabela();
    this.CategoriaTable.displayedColumns = [
      "Nome",
      "Processo",
      "Acoes",
      "Caminho"
    ];
  }


}

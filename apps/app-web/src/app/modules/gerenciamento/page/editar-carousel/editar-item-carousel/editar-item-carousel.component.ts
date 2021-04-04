import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';
import { Select, Store } from '@ngxs/store';
import { entities } from '@personalizados-lopes/data';
import { ItemCarouselState } from 'apps/app-web/src/app/data/store/state';
import { DynamicFormComponent } from 'apps/app-web/src/app/shared/components/dynamic-form/dynamic-form.component';
import { QuestionBase, DynFormQuestions } from 'apps/app-web/src/app/shared/components/dynamic-form/question-base';
import { FileQuestion } from 'apps/app-web/src/app/shared/components/dynamic-form/question-file';
import { TextboxQuestion } from 'apps/app-web/src/app/shared/components/dynamic-form/question-textbox';
import { ItemCarousel, Sobre } from 'libs/data/src/lib/classes';
import { MaterialTable } from 'libs/data/src/lib/structures/MaterialTable';
import { Observable } from 'rxjs';
import {AdicionarItemCarousel, EditarItemCarousel, RemoverItemCarousel} from '../../../../../data/store/actions/item-carousel.actions';
import { CriarProdutoDialogComponent } from '../../editar-produto/DialogComponents/criar-dialog/criar-dialog.component';
import { CriarItemCarouselDialogComponent } from '../dialogComponents/criar-item-carousel-dialog/criar-item-carousel-dialog.component';

@Component({
  selector: 'personalizados-lopes-editar-item-carousel',
  templateUrl: './editar-item-carousel.component.html',
  styleUrls: ['./editar-item-carousel.component.scss']
})
export class EditarItemCarouselComponent implements OnInit {
  @Select(ItemCarouselState.ObterListaItemsCarousel) ItemsCarousel$: Observable<Sobre>;
  ItemsCarouselTable:MaterialTable;

  constructor( private store:Store,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar) { }

  AtualizarTabela(){
    this.ItemsCarousel$.subscribe(x=>{
      console.log(x)
      this.ItemsCarouselTable.dataSource = x;
    })
  }

  ngOnInit(): void {
    this.ItemsCarouselTable = new MaterialTable();
    this.AtualizarTabela();
    this.ItemsCarouselTable.displayedColumns = [
      "nome",
      "url",
      "href",
      "caption",
      "backgroundSize",
      "backgroundPosition",
      "Acoes",
    ];
  }

  Criar(){
    const dialogRef = this.dialog.open(CriarItemCarouselDialogComponent, {
      width: '90%',
    });

    dialogRef.afterClosed().subscribe((result :ItemCarousel) => {
      if(result == undefined)
      return;
      this.store.dispatch(new AdicionarItemCarousel(result)).subscribe(x=> {
        this._snackBar.open("ItemCarousel"+ result.nome +" criado com sucesso", "Fechar", {

        });
      });
    });
  }
  Editar(ItemCarousel:entities.ItemCarousel){

    let questions: QuestionBase<string>[] = [];
    let method = "Editar";
    let name = "ItemCarousel";
    let id = ItemCarousel._id;
    Object.entries(ItemCarousel).forEach(([key, value]) => {
      if(key != "_id" && key != "url")
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
      if(key == "url"){
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
      let ItemCarousel = new entities.ItemCarousel(
        result[0].value,
        result[1].value,
        result[2].value,
        result[3].value,
        result[4].value,
        result[5].value,
      )
      ItemCarousel._id = id;
      this.store.dispatch(new EditarItemCarousel(ItemCarousel, ItemCarousel._id)).subscribe(x=> {
        this._snackBar.open("ItemCarousel "+ ItemCarousel.nome +" alterado com sucesso", "Fechar", {

        });
        this.AtualizarTabela();
      });
    });
  }

  Remover(ItemCarousel:entities.ItemCarousel){
    let confirmation = confirm("Deletar?");
    if(confirmation)
    this.store.dispatch(new RemoverItemCarousel(ItemCarousel._id)).subscribe(x=>{
      this._snackBar.open("ItemCarousel "+ ItemCarousel.nome +" removido com sucesso", "Fechar", {

      });
    })
  }
}

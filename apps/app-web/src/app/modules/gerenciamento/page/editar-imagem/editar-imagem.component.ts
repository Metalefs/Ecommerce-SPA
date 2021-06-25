import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { entities } from '@personalizados-lopes/data';
import { ImagemService } from 'apps/app-web/src/app/shared/services';
import { DynamicFormComponent } from 'apps/app-web/src/app/shared/components/dynamic-form/dynamic-form.component';
import { QuestionBase, DynFormQuestions } from 'apps/app-web/src/app/shared/components/dynamic-form/question-base';
import { FileQuestion } from 'apps/app-web/src/app/shared/components/dynamic-form/question-file';
import { TextboxQuestion } from 'apps/app-web/src/app/shared/components/dynamic-form/question-textbox';
import { Imagem } from 'libs/data/src/lib/classes';
import { FormControl } from '@angular/forms';
import { MatTableFilter } from 'mat-table-filter';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'personalizados-lopes-editar-imagem',
  templateUrl: './editar-imagem.component.html',
  styleUrls: ['./editar-imagem.component.scss']
})
export class EditarImagemComponent implements OnInit {
  tabs : Array<{name:string,table: MatTableDataSource<Imagem>}>;
  selected = new FormControl(0);
  displayedColumns:string[] = [
    "Src",
    "Nome",
    "Tipo",
    "Acoes",
  ];
  EmpresaTable: MatTableDataSource<Imagem>;
  ProdutoTable: MatTableDataSource<Imagem>;
  ClienteTable: MatTableDataSource<Imagem>;
  Imagems:any;
  Loading:boolean = true;
  filterEntity: Imagem;
  filterType: MatTableFilter;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private service:ImagemService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar) { }

  AtualizarTabela(){
    this.service.Ler().subscribe((x : entities.Imagem[])=>{
      this.Imagems = x;
      this.ProdutoTable = new MatTableDataSource(x.filter(x=>x.Tipo == "Produto"));
      this.EmpresaTable = new MatTableDataSource(x.filter(x=>x.Tipo == "Empresa"));
      this.ClienteTable = new MatTableDataSource(x.filter(x=>x.Tipo == "Cliente"));
      this.tabs = [
        {name:'Empresa',  table:this.EmpresaTable},
        {name:'Produtos', table:this.ProdutoTable},
        {name:'Clientes', table:this.ClienteTable}
      ];
      this.ProdutoTable.paginator = this.paginator;
      this.EmpresaTable.paginator = this.paginator;
      this.ClienteTable.paginator = this.paginator;

      this.ProdutoTable.sort = this.sort;
      this.EmpresaTable.sort = this.sort;
      this.ClienteTable.sort = this.sort;
      this.Loading = false;
    })
  }

  ngOnInit(): void {
    this.filterEntity = new Imagem('','','');
    this.filterType = MatTableFilter.ANYWHERE;
    this.AtualizarTabela();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.ProdutoTable.filter = filterValue.trim().toLowerCase();
    this.EmpresaTable.filter = filterValue.trim().toLowerCase();
    this.ClienteTable.filter = filterValue.trim().toLowerCase();

    if (this.ProdutoTable.paginator) {
      this.ProdutoTable.paginator.firstPage();
    }
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

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { entities } from '@personalizados-lopes/data';
import { CupomDescontoService } from 'apps/app-web/src/app/data/service';
import { MaterialTable } from 'libs/data/src/lib/structures/MaterialTable';

import { EditarIntegracaoDialogComponent } from '../editar-integracoes/dialogs/editar-integracao-dialog/editar-integracao-dialog.component';
import { EditarCupomDescontoDialogComponent } from './dialogs/editar-cupom-desconto-dialog/editar-cupom-desconto-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { CupomDesconto } from 'libs/data/src/lib/classes';

@Component({
  selector: 'personalizados-lopes-editar-cupom-desconto',
  templateUrl: './editar-cupom-desconto.component.html',
  styleUrls: ['./editar-cupom-desconto.component.scss']
})
export class EditarCupomDescontoComponent implements OnInit {

  CupomDescontoTable:MaterialTable;

  constructor(
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private servicoCupomDesconto: CupomDescontoService) {

  }

  ngOnInit(): void {

    this.CupomDescontoTable = new MaterialTable();
    this.AtualizarTabela();
    this.CupomDescontoTable.displayedColumns = [
      "Codigo",
      "Tipo",
      "Valor",
      "Acoes"
    ];
  }

  AtualizarTabela(){
    this.servicoCupomDesconto.Ler().subscribe((cupons:CupomDesconto[])=>{
      console.log(cupons);
      this.CupomDescontoTable.dataSource = new MatTableDataSource<entities.CupomDesconto>(cupons);
    });
  }

  Criar(){
    const cupomDesconto:entities.CupomDesconto = new entities.CupomDesconto("",1,0);

    const dialogRef = this.dialog.open(EditarCupomDescontoDialogComponent, {
      width: '90%',
      data: cupomDesconto
    });

    dialogRef.afterClosed().subscribe((result :entities.CupomDesconto) => {
      if(result === undefined)
      return;
      this.servicoCupomDesconto.Incluir(result).subscribe(x=> {
        this.AtualizarTabela();
        this._snackBar.open("Informação criada com sucesso", "Fechar", {

        });
      });
    });
  }
  Editar(cupomDesconto:entities.CupomDesconto){
    const id = cupomDesconto._id;

    const dialogRef = this.dialog.open(EditarCupomDescontoDialogComponent, {
      width: '90%',
      data: cupomDesconto
    });

    dialogRef.afterClosed().subscribe((result :entities.CupomDesconto) => {
      if(result === undefined)
      return;

      result._id = id;
      this.servicoCupomDesconto.Editar(result).subscribe(x=> {
        this.AtualizarTabela();
        this._snackBar.open("Informação alterada com sucesso", "Fechar", {

        });
      });
    });
  }

  Remover(cupomDesconto:entities.CupomDesconto){
    let confirmacao = confirm("Deletar ?");
    if(confirmacao)
    this.servicoCupomDesconto.Remover(cupomDesconto._id).subscribe(x=>{
      this.AtualizarTabela();
      this._snackBar.open("cupomDesconto "+ cupomDesconto.Codigo +" removido com sucesso", "Fechar", {

      });
    });
  }

}

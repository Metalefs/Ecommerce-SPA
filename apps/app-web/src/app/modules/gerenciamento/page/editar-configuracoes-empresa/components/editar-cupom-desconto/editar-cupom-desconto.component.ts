import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { entities } from '@personalizados-lopes/data';
import { CupomDescontoService } from 'apps/app-web/src/app/data/service';
import { MaterialTable } from 'libs/data/src/lib/structures/MaterialTable';
import { EditarIntegracaoDialogComponent } from '../editar-integracoes/dialogs/editar-integracao-dialog/editar-integracao-dialog.component';
import { EditarCupomDescontoDialogComponent } from './dialogs/editar-cupom-desconto-dialog/editar-cupom-desconto-dialog.component';

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
    this.servicoCupomDesconto.Ler().subscribe(x=>{
      console.log(x);
      this.CupomDescontoTable.dataSource = x;
    });
  }

  Criar(){
    let CupomDesconto:entities.CupomDesconto = new entities.CupomDesconto("",1,0);

    const dialogRef = this.dialog.open(EditarCupomDescontoDialogComponent, {
      width: '90%',
      data: CupomDesconto
    });

    dialogRef.afterClosed().subscribe((result :entities.CupomDesconto) => {
      if(result == undefined)
      return;
      this.servicoCupomDesconto.Incluir(result).subscribe(x=> {
        this.AtualizarTabela();
        this._snackBar.open("Informação criada com sucesso", "Fechar", {

        });
      });
    });
  }
  Editar(CupomDesconto:entities.CupomDesconto){
    let id = CupomDesconto._id;

    const dialogRef = this.dialog.open(EditarCupomDescontoDialogComponent, {
      width: '90%',
      data: CupomDesconto
    });

    dialogRef.afterClosed().subscribe((result :entities.CupomDesconto) => {
      if(result == undefined)
      return;

      CupomDesconto._id = id;
      this.servicoCupomDesconto.Editar(result).subscribe(x=> {
        this.AtualizarTabela();
        this._snackBar.open("Informação alterada com sucesso", "Fechar", {

        });
      });
    });
  }

  Remover(CupomDesconto:entities.CupomDesconto){
    throw "not implemented";
  }

}

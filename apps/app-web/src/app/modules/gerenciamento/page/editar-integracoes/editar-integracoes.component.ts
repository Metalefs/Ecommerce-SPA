import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { entities } from '@personalizados-lopes/data';
import { IntegracoesService } from 'apps/app-web/src/app/shared/services';
import { Integracoes } from 'libs/data/src/lib/classes';
import { MaterialTable } from 'libs/data/src/lib/structures/MaterialTable';
import { EditarIntegracaoDialogComponent } from './dialogs/editar-integracao-dialog/editar-integracao-dialog.component';

@Component({
  selector: 'personalizados-lopes-editar-integracoes',
  templateUrl: './editar-integracoes.component.html',
  styleUrls: ['./editar-integracoes.component.scss']
})
export class EditarIntegracoesComponent implements OnInit {

  IntegracoesTable:MaterialTable;

  constructor(
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private servicoIntegracoes: IntegracoesService) {
      this.IntegracoesTable = new MaterialTable();

  }
  AtualizarTabela(){
    this.servicoIntegracoes.Ler().subscribe(x=>{
      console.log(x);
      this.IntegracoesTable.dataSource = [x];
    });
  }

  Editar(Integracoes:entities.Integracoes){
    let id = Integracoes._id;

    const dialogRef = this.dialog.open(EditarIntegracaoDialogComponent, {
      width: '90%',
      data: Integracoes
    });

    dialogRef.afterClosed().subscribe((result :Integracoes) => {
      if(result == undefined)
      return;

      Integracoes._id = id;
      this.servicoIntegracoes.Editar(result).subscribe(x=> {
        this.AtualizarTabela();
        this._snackBar.open("Informação alterada com sucesso", "Fechar", {

        });
      });
    });
  }

  Remover(Integracoes:entities.Integracoes){
    throw "not implemented";
  }

  ngOnInit(): void {

    this.IntegracoesTable = new MaterialTable();
    this.AtualizarTabela();
    this.IntegracoesTable.displayedColumns = [
      "MP_access_token",
      "MP_public_key",
      "ParcelasPadrao",
      "ResumoCartao",
      "auto_return",
      "collector_id",
      "client_id",
      "marketplace",
      "marketplace_fee",
      "binary_mode",
      "Acoes"
    ];
  }

}

import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { entities } from '@personalizados-lopes/data';
import { EmailNotificacaoService } from 'apps/app-web/src/app/data/service';
import { EmailNotificacao, Produto, Sobre } from 'libs/data/src/lib/classes';

@Component({
  selector: 'personalizados-lopes-caixa-obter-email',
  templateUrl: './caixa-obter-email.component.html',
  styleUrls: ['./caixa-obter-email.component.scss']
})
export class CaixaObterEmailComponent implements OnInit {

  Email:string = "";
  constructor(
    private EmailNotificacaoService:EmailNotificacaoService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<CaixaObterEmailComponent>,
    @Inject(MAT_DIALOG_DATA) public data:  Produto) {

  }
  NomeSite = "Personalizados Lopes";
  Sobre:Sobre;
  EnviarEmail(){
    if(this.Email != ""){
      let emailnotificacao = new EmailNotificacao(this.Email, this.data.Nome, this.data);
      this.EmailNotificacaoService.Incluir(emailnotificacao).subscribe(x=> {
        this._snackBar.open("Você será avisado por e-mail quando o produto voltar ao estoque", "Fechar", {

        });
      });
    }
  }

  ngOnInit(){

  }

}

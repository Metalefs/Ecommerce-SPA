import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faInbox } from '@fortawesome/free-solid-svg-icons';
import { Select } from '@ngxs/store';
import { entities } from '@personalizados-lopes/data';
import { EmailNotificacao, Sobre } from 'libs/data/src/lib/classes';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { EmailNotificacaoService, SobreService } from '../../../data/service';
import { SobreState } from '../../../data/store/state';

@Component({
  selector: 'personalizados-lopes-under-construction',
  templateUrl: './under-construction.component.html',
  styleUrls: ['./under-construction.component.scss']
})
export class UnderConstructionComponent implements OnInit {

  FIcon = faFacebook;
  InstaIcon = faInstagram;
  InboxIcon = faInbox;
  Email:string = "";
  constructor(
    private EmailNotificacaoService:EmailNotificacaoService,
    private _snackBar: MatSnackBar,
    private SobreService:SobreService) {

     }
  NomeSite = "Personalizados Lopes";
  LaunchDate:string = "26 de Outubro";
  Sobre:entities.Sobre;
  EnviarEmail(){
    if(this.Email != ""){
      let emailnotificacao = new EmailNotificacao(this.Email, "");
      this.EmailNotificacaoService.Incluir(emailnotificacao).subscribe(x=> {
        this._snackBar.open("Você será avisado por e-mail quando o site inaugurar", "Fechar", {
          duration:3000
        });
      });
    }
  }

  ngOnInit(){

  }
}

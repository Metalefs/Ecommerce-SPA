import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Select, Store } from '@ngxs/store';
import { Feedback, Orcamento, Usuario } from 'libs/data/src/lib/classes';
import { Observable } from 'rxjs';
import { fade } from '../../../animations';
import { FeedbackService } from '../../../data/service';
import { AdicionarOrcamento } from '../../../data/store/actions/orcamento.actions';
import { OrcamentoState } from '../../../data/store/state';

@Component({
  selector: 'personalizados-lopes-orcamento',
  templateUrl: './orcamento.component.html',
  styleUrls: ['./orcamento.component.scss'],
  animations: [fade]
})
export class OrcamentoComponent implements OnInit {

  @Select(OrcamentoState.ObterOrcamentos) Orcamento$: Observable<Orcamento>;
  Usuario:Usuario;
  constructor(private store:Store, private snack:MatSnackBar, private feedbackService:FeedbackService) {

  }

  ngOnInit(): void {
    this.EnviarOrcamento = this.EnviarOrcamento.bind(this);

  }

  EnviarOrcamento(){
    this.Orcamento$.subscribe(x=>{
      if(x.Produto[0] != undefined)
        this.EnviarMensagemOrcamento(x);
      else
        this.EnviarFeedback(x);
    })
  }

  EnviarMensagemOrcamento(orcamento:Orcamento){
    if(orcamento.Usuario?.Nome != ""  && orcamento.Usuario?.Email  != "" && orcamento.Mensagem != "" ){
      this.store.dispatch(new AdicionarOrcamento()).subscribe(x=>{
        this.snack.open("Orçamento enviado com sucesso. Responderemos dentro de 24 horas", "Fechar",{duration:3000});
      });
    }else{
      alert("Preencha os dados para entrar em contato.")
    }
  }

  EnviarFeedback(orcamento:Orcamento){
    let feedback = new Feedback(orcamento.Usuario.Nome,orcamento.Usuario,"Feedback",orcamento.Mensagem);
    this.feedbackService.Incluir(feedback).subscribe(c=>{
      this.snack.open("Feedback enviado com sucesso. Responderemos dentro de 24 horas", "Fechar",{duration:3000});
    });
  }
}

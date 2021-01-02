import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { EditarOrcamento, RemoverOrcamento } from 'apps/app-web/src/app/data/store/actions/orcamento.actions';
import { OrcamentoState } from 'apps/app-web/src/app/data/store/state';
import { Orcamento } from 'libs/data/src/lib/classes';
import { StatusOrcamento } from 'libs/data/src/lib/enums';
import { Observable } from 'rxjs';

@Component({
  selector: 'personalizados-lopes-orcamento-detail',
  templateUrl: './orcamento-detail.component.html',
  styleUrls: ['./orcamento-detail.component.scss']
})
export class OrcamentoDetailComponent implements OnInit {
  @Select(OrcamentoState.ObterListaOrcamentos) Orcamentos$: Observable<Orcamento[]>;
  constructor(private store:Store, private snack:MatSnackBar,
    private activeRoute: ActivatedRoute) { }

  Orcamento:Orcamento;

  ngOnInit(): void {
    let id = this.activeRoute.snapshot.params['id'];
    this.Orcamentos$.subscribe(x=>{
      this.Orcamento = x.find(x=>x._id == id);
    })
  }
  Responder(orcamento:Orcamento){
    if(orcamento.Status ==  StatusOrcamento.respondido)
      orcamento.Status = StatusOrcamento.aberto;
    else
      orcamento.Status =  StatusOrcamento.respondido;

    this.store.dispatch(new EditarOrcamento(orcamento,orcamento._id)).subscribe(x=>{
      this.snack.open("Pedido alterado","Fechar");
    });
  }

  Remover(orcamento:Orcamento){
    let confirmation = confirm("Deletar?");
    if(confirmation){
      this.store.dispatch(new RemoverOrcamento(orcamento._id)).subscribe(x=>{
        this.snack.open("Pedido removido","Fechar");
      });
    }
  }
}

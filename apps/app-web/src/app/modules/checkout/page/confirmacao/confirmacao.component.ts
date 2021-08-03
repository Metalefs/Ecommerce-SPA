import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Select, Store } from '@ngxs/store';
import { fade, slideInOut } from 'apps/app-web/src/app/animations';
import { EditarProdutoOrcamentoLocal, RemoverProdutoOrcamento, ResetarOrcamento } from 'apps/app-web/src/app/data/store/actions/orcamento.actions';
import { OrcamentoState } from 'apps/app-web/src/app/data/store/state';
import { getPreviewURL } from 'apps/app-web/src/app/helper/FileHelper';
import { CorProduto, Orcamento } from 'libs/data/src/lib/classes';
import { CodProduto } from 'libs/data/src/lib/classes/orcamento';
import { StatusProduto } from 'libs/data/src/lib/classes/produto';
import { StatusOrcamento } from 'libs/data/src/lib/enums';
import { MaterialTable } from 'libs/data/src/lib/structures/MaterialTable';
import { Observable, pipe } from 'rxjs';
import { CheckoutService } from '../../checkout.service';
@Component({
  selector: 'personalizados-lopes-confirmacao',
  templateUrl: './confirmacao.component.html',
  styleUrls: ['./confirmacao.component.scss'],
  animations:[fade,slideInOut]
})
export class ConfirmacaoComponent implements OnInit {
  @Input() edit = true;
  @Input() exibirTabela = true;
  @Select(OrcamentoState.ObterOrcamentos) Orcamento$: Observable<Orcamento>;
  ErroCadastro:boolean = false;
  Total:number = 0;
  Orcamento:Orcamento;
  constructor(public checkoutService: CheckoutService, private store:Store,private snack: MatSnackBar) { }

  ngOnInit(): void {
    this.Orcamento$.subscribe(x=>{
      this.Orcamento = x;
      if(x.Status == StatusOrcamento.enviado){
        this.snack.open("Pedido já foi enviado! Responderemos em até 48 horas.", "Fechar",{duration:5000}).afterOpened().subscribe(x=>{
          this.store.dispatch(new ResetarOrcamento());
        });
      }
    })
  }

}

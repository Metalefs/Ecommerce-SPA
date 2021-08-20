import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Select, Store } from '@ngxs/store';
import { EditarOrcamentoLocal } from 'apps/app-web/src/app/data/store/actions/orcamento.actions';
import { OrcamentoState } from 'apps/app-web/src/app/data/store/state';
import { findInvalidControlsRecursiveform } from 'apps/app-web/src/app/helper/FormHelper';
import { Orcamento, Produto } from 'libs/data/src/lib/classes';
import { Observable } from 'rxjs';
import { ExibicaoPrecoPrazoCepComponent } from '../../../dialogs/exibicao-preco-prazo-cep/exibicao-preco-prazo-cep.component';

@Component({
  selector: 'personalizados-lopes-bloco-pagamento-produto',
  templateUrl: './bloco-pagamento-produto.component.html',
  styleUrls: ['./bloco-pagamento-produto.component.scss']
})
export class BlocoPagamentoProdutoComponent implements OnInit {
  @Input() Produto:Produto;
  @Input() isOrcamento:boolean = false;
  @Input() Form:FormGroup;
  @Input() textoAdicionar:string;
  @Output() onAdicionarAoOrcamento:EventEmitter<any> = new EventEmitter<any>()
  @Output() onDuplicarOrcamento:EventEmitter<any> = new EventEmitter<any>()

  @Input() ErroQuantidade : Function;
  @Input() Erros: any;
  @Output() onQuantidadeChange:EventEmitter<any> = new EventEmitter<any>();
  cepForm:FormGroup;
  @Select(OrcamentoState.ObterOrcamentos) Orcamento$: Observable<Orcamento>;
  Orcamento:Orcamento;
  constructor(
    private store:Store,
    private fb:FormBuilder,
    private dialog:MatDialog) { }

  ngOnInit(): void {
    this.Orcamento$.subscribe(orcamento=>{
      this.Orcamento = orcamento;
    })
    this.cepForm = this.fb.group({
        cep:[this.Orcamento?.Entrega?.cep||'',[Validators.required, Validators.maxLength(9)]]
      }
    )
  }
  CalcularFreteProduto(){
    this.dialog.open(ExibicaoPrecoPrazoCepComponent, {
      restoreFocus: false,
      width:'512px',
      height:'100vh',
      position:{
        left:'0'
      },
      panelClass:['no-padding'],
      data:{
        cep: this.cepForm.get("cep").value,
        produto: this.Produto
      }
    });
  }
  findInvalidControlsRecursive():boolean {
    return findInvalidControlsRecursiveform(this.Form)
  }
  AtualizarOrcamento(){
    if(!this.Orcamento.Entrega){
      this.Orcamento.Entrega = {dados:{cep:this.cepForm.get('cep').value}};
    }
    this.Orcamento.Entrega.cep = this.cepForm.get('cep').value;
    this.store.dispatch(new EditarOrcamentoLocal(this.Orcamento));
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Select, Store } from '@ngxs/store';
import { Orcamento, CorProduto } from 'libs/data/src/lib/classes';
import { CodProduto } from 'libs/data/src/lib/classes/orcamento';
import { StatusProduto } from 'libs/data/src/lib/classes/produto';
import { StatusOrcamento } from 'libs/data/src/lib/enums';
import { MaterialTable } from 'libs/data/src/lib/structures/MaterialTable';
import { NgDialogAnimationService } from 'ng-dialog-animation';
import { Observable } from 'rxjs';
import { slideInOut,fade } from '../../../animations';
import { ResetarOrcamento, EditarProdutoOrcamentoLocal, RemoverProdutoOrcamento } from '../../../data/store/actions/orcamento.actions';
import { OrcamentoState } from '../../../data/store/state';
import { getPreviewURL } from '../../../helper/FileHelper';
import { CheckoutService } from '../../../modules/checkout/checkout.service';
import { ExibicaoArteProdutoComponent } from '../exibicao-arte-produto/exibicao-arte-produto.component';

@Component({
  selector: 'personalizados-lopes-tabela-edicao-orcamento',
  templateUrl: './tabela-edicao-orcamento.component.html',
  styleUrls: ['./tabela-edicao-orcamento.component.scss'],
  animations:[fade,slideInOut]
})
export class TabelaEdicaoOrcamentoComponent implements OnInit {
  @Select(OrcamentoState.ObterOrcamentos) Orcamento$: Observable<Orcamento>;
  ProdutoTable:MaterialTable;
  dataSource: MatTableDataSource<CodProduto>;
  ErroCadastro:boolean = false;
  Total:number = 0;
  @Input() edit = true;
  constructor(
    public checkoutService: CheckoutService,
    private store:Store,
    private snack: MatSnackBar,
    public dialog: NgDialogAnimationService,
    ) { }

  ngOnInit(): void {
    this.Orcamento$.subscribe(x=>{

      this.ProdutoTable = new MaterialTable();
      this.dataSource = new MatTableDataSource<CodProduto>(x.Produto);

      this.ProdutoTable.displayedColumns = [
        "Produtos",
        "Quantidade",
        // "Canvas",
        "Subtotal",
      ];

      if(x.Status == StatusOrcamento.enviado){
        this.snack.open("Orçamento já foi enviado! Responderemos em até 48 horas.", "Fechar",{duration:5000}).afterOpened().subscribe(x=>{
          this.store.dispatch(new ResetarOrcamento());
        });
      }
    })
  }
  upload($event,element:CodProduto){
    // if(element){
    //   let fileNames='';
    //   getPreviewURL($event,fileNames,(res,name)=>{
    //     element.Produto.Arte = res;
    //     fileNames = name;
    //     this.EditarOrcamento(element);
    //   })
    // }
    this.AbrirModalArte(element);
  }
  AbrirModalArte(element){
    let dialogref= this.dialog.open(ExibicaoArteProdutoComponent,{
      data:{Produto: element.Produto, action:'addImg'},
      panelClass:['animate__animated','animate__bounceIn', 'border', 'bg-transp'],
      restoreFocus: false,
      width:'99vw',
      height:'100vh',
      animation: {
        to: "left",
        incomingOptions: {
          keyframeAnimationOptions: { easing: "ease", duration: 300 }
        },
        outgoingOptions: {
          keyframeAnimationOptions: { easing: "ease", duration: 300 }
        }
      },
      position: { rowStart: "0" },
    })
    dialogref.afterClosed().subscribe(x=>{
      if(x?.Canvas){
        element.Produto = x;
        this.EditarOrcamento(element)
      }
    })
  }
  IncrementarQuantidade(element){
    if(element){
      element.Produto.Quantidade++;
      this.EditarOrcamento(element);
    }
  }
  DecrescerQuantidade(element){
    if(element){
      if(element.Produto.Quantidade > element.Produto.QuantidadeMinima || element.Quantidade > 1)
      element.Produto.Quantidade--;
      this.EditarOrcamento(element);
    }
  }
  SetarTamanho(element,tamanho){
    if(element){
      element.Produto.Tamanho = tamanho;
      this.EditarOrcamento(element);
    }
  }
  SetFaixaTamanho(element:CodProduto,tamanho){
    if(element){
      element.Produto.FaixaTamanho = tamanho;
      this.EditarOrcamento(element);
    }
  }

  EditarOrcamento(element:CodProduto){
    this.store.dispatch(new EditarProdutoOrcamentoLocal(element.Produto,element.Produto._id,element.codOrcamento)).subscribe(store =>{
      this.Orcamento$.subscribe(orc=>{
        this.checkoutService.Validate(orc);
      })
    });
  }

  VerificarQuantidade($event,element){
    if(element){
      element.QuantidadeMinima  = element.QuantidadeMinima== 0 ?1:element.QuantidadeMinima;
      if($event.target.value < element.QuantidadeMinima)
        element.Quantidade = element.QuantidadeMinima;
      this.EditarOrcamento(element)
    }
  }

  removerProduto(Produto:CodProduto){
    this.store.dispatch(new RemoverProdutoOrcamento(Produto.Produto._id,Produto.codOrcamento)).subscribe(x=>{
      this.Orcamento$.subscribe(x=>{
        let Produtos =  x.Produto;
        //let DistinctProdutos = removeDuplicates(Produtos,"_id");
        this.checkoutService.Validate(x);
        this.dataSource = Produtos as any;
      })
    });
  }

  setColor(cor:CorProduto, element){
    element.Produto.Cor = cor;
    this.EditarOrcamento(element);
  }
  selectedTamanho(event: any,element): void {
    element.Produto.Tamanho = event;
    this.EditarOrcamento(element);
  }
  CalcularPreco(produto:CodProduto){
    this.Orcamento$.subscribe(x=>{
      if(produto.Produto){
        let preco;
        let Produto;
        if(produto.Produto.PrecoPromocional){
          preco =  produto.Produto.Status == StatusProduto.promocao? produto.Produto.PrecoPromocional : produto.Produto.Preco;
        }
        let Produtos =  x.Produto;
        let index = x.Produto.findIndex(item => item.codOrcamento === produto.codOrcamento);
        if(Produtos[index])
        Produto = Produtos[index].Produto;
        if(Produto)
        this.Total = preco * Produto.Quantidade;
      }
    })
    if(produto.Produto.Preco){
      let preco = produto.Produto.Status == StatusProduto.promocao? produto.Produto.PrecoPromocional : produto.Produto.Preco;

      return (preco * produto.Produto.Quantidade).toFixed(2);
    }
    this.dataSource.data = this.dataSource.data;
    return 0;
  }
}

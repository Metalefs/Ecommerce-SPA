import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TamanhoProdutoService } from 'apps/app-web/src/app/data/service';
import { TamanhoProduto } from 'libs/data/src/lib/classes/tamanhoProduto';
import { EditarTamanhoProdutoDialogComponent } from './dialogs/editar-tamanho-produto-dialog/editar-tamanho-produto-dialog.component';

@Component({
  selector: 'personalizados-lopes-editar-tamanho-produto',
  templateUrl: './editar-tamanho-produto.component.html',
  styleUrls: ['./editar-tamanho-produto.component.scss']
})
export class EditarTamanhoProdutoComponent implements OnInit {
  tamanhoProdutoSelecionado:TamanhoProduto[];
  tamanhosProduto:TamanhoProduto[];

  constructor(
    protected dialog: MatDialog,
    protected snackBar: MatSnackBar,
    private tamanhoProdutoService: TamanhoProdutoService) { }

  ngOnInit(): void {
    this.CarregarTamanhosProduto();
  }

  Criar(tamanhoProduto:TamanhoProduto){
    this.tamanhoProdutoService.Incluir(tamanhoProduto).subscribe(result=>{
      this.snackBar.open(`Tamanho ${tamanhoProduto.Nome} adicionado com sucesso`, "Fechar", {verticalPosition:"top"});
      this.CarregarTamanhosProduto();
    })
  }
  SelecionarTamanho(event){
    console.log(event);
    this.tamanhoProdutoSelecionado = event;
  }
  Editar() {
    const dialogRef = this.dialog.open(EditarTamanhoProdutoDialogComponent, {
      width: "100%",
      height: "100%",
      data: this.tamanhoProdutoSelecionado[0],
    });
    dialogRef.afterClosed().subscribe(async (tamanhoProduto : TamanhoProduto) => {
      console.log(tamanhoProduto)
      if(tamanhoProduto != undefined){
        this.tamanhoProdutoService.Editar(tamanhoProduto).subscribe(result=>{
          this.snackBar.open("Tamanho editado com sucesso", "Fechar", {verticalPosition:"top"});
          this.CarregarTamanhosProduto();
        })
      }
    });
  }
  Remover() {
    if (this.tamanhoProdutoSelecionado) {
      this.tamanhoProdutoSelecionado.forEach(tamanho=>{
        let confirmar = confirm(`Excluir tamanho ${tamanho.Nome}?`);
        if (confirmar)
          this.tamanhoProdutoService.Remover(tamanho._id).subscribe(result => {
            this.snackBar.open(`Tamanho ${tamanho.Nome} removida com sucesso`, "Fechar");
            this.CarregarTamanhosProduto();
          })
      })
    }
  }
  CarregarTamanhosProduto(){
    this.tamanhoProdutoService.Ler().subscribe((tamanhoes)=>{
      this.tamanhosProduto = tamanhoes as TamanhoProduto[];
    })
  }
}

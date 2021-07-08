import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FornecedorProdutoService } from 'apps/app-web/src/app/data/service';
import { DynamicFormComponent } from 'apps/app-web/src/app/shared/components/dynamic-form/dynamic-form.component';
import { DynFormQuestions, QuestionBase } from 'apps/app-web/src/app/shared/components/dynamic-form/question-base';
import { TextboxQuestion } from 'apps/app-web/src/app/shared/components/dynamic-form/question-textbox';
import { FornecedorProduto } from 'libs/data/src/lib/classes';

@Component({
  selector: 'personalizados-lopes-editar-fornecedor-produto',
  templateUrl: './editar-fornecedor-produto.component.html',
  styleUrls: ['./editar-fornecedor-produto.component.scss']
})
export class EditarFornecedorProdutoComponent implements OnInit {
  FornecedorProduto:FornecedorProduto[];

  FornecedoresProduto:FornecedorProduto[];
  constructor(
    protected snackBar: MatSnackBar,
    private fornecedorProdutoService: FornecedorProdutoService,
    protected dialog: MatDialog) { }

  ngOnInit(): void {
    this.CarregarFornecedoresProduto();
  }

  CarregarFornecedoresProduto(){
    this.fornecedorProdutoService.Ler().subscribe((fornecedores)=>{
      this.FornecedoresProduto = fornecedores as FornecedorProduto[];
    })
  }

  Criar(fornecedor:FornecedorProduto){
    this.fornecedorProdutoService.Incluir(fornecedor).subscribe((result:FornecedorProduto)=>{
      this.snackBar.open(`Fornecedor ${fornecedor} criado com sucesso.`, "Fechar", {verticalPosition:"top"});
      this.CarregarFornecedoresProduto();
    })
  }

  Remover(fornecedor:FornecedorProduto){
    this.fornecedorProdutoService.Remover(fornecedor._id).subscribe((result:FornecedorProduto)=>{
      this.snackBar.open(`Fornecedor ${fornecedor.Nome} removido com sucesso.`, "Fechar", {verticalPosition:"top"});
      this.CarregarFornecedoresProduto();
    })
  }

  Editar(fornecedor) {
    if (fornecedor) {

      let questions: QuestionBase<string>[] = [];
      let method = "Editar";
      let name = "Cor Produto";
      let id = fornecedor._id;
      Object.entries(fornecedor).forEach(([key, value]) => {
        if (key != "_id")
          questions.push(
            new TextboxQuestion({
              key: key,
              label: key,
              value: value as string,
              required: true,
              type: "textbox",
              order: 1
            })
          )
      })
      console.log(questions)
      let Data = new DynFormQuestions(questions, method, name);
      const dialogRef = this.dialog.open(DynamicFormComponent, {
        width: '90%',
        height: "100%",
        data: Data,
      });

      dialogRef.afterClosed().subscribe((result: TextboxQuestion[]) => {
        if (result == undefined)
          return;
        let fornecedor = new FornecedorProduto(
          result[0].value,
          result[1].value,
        )
        fornecedor._id = id;
        this.fornecedorProdutoService.Editar(fornecedor).subscribe(result => {
          this.snackBar.open("Fornecedor editado com sucesso", "Fechar", { verticalPosition: "top" });
          this.CarregarFornecedoresProduto();
        })
      });
    }
  }


}

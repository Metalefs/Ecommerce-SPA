import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CorProdutoService } from 'apps/app-web/src/app/data/service';
import { DynamicFormComponent } from 'apps/app-web/src/app/shared/components/dynamic-form/dynamic-form.component';
import { DynFormQuestions, QuestionBase } from 'apps/app-web/src/app/shared/components/dynamic-form/question-base';
import { ColorQuestion } from 'apps/app-web/src/app/shared/components/dynamic-form/question-color';
import { TextboxQuestion } from 'apps/app-web/src/app/shared/components/dynamic-form/question-textbox';
import { CorProduto } from 'libs/data/src/lib/classes';

@Component({
  selector: 'personalizados-lopes-editar-cor-produto',
  templateUrl: './editar-cor-produto.component.html',
  styleUrls: ['./editar-cor-produto.component.scss']
})
export class EditarCorProdutoComponent implements OnInit {
  CoresProduto: CorProduto[] = [];
  CorSelecionada: CorProduto[];
  constructor(
    protected snackBar: MatSnackBar,
    private corProdutoService: CorProdutoService,
    protected dialog: MatDialog) { }

  ngOnInit(): void {
    this.CarregarCoresProduto();
  }

  CarregarCoresProduto() {
    this.corProdutoService.Ler().subscribe((cores) => {
      this.CoresProduto = cores as CorProduto[];
    })
  }

  Criar(corProduto: CorProduto) {
    this.corProdutoService.Incluir(corProduto).subscribe(result => {
      this.snackBar.open(`Cor ${corProduto.Nome} criada com sucesso`, "Fechar");
      this.CarregarCoresProduto();
    })
  }

  Editar() {
    if (this.CorSelecionada) {

      let questions: QuestionBase<string>[] = [];
      let method = "Editar";
      let name = "Cor Produto";
      let id = this.CorSelecionada[0]._id;
      Object.entries(this.CorSelecionada[0]).forEach(([key, value]) => {
        if (key != "_id" && key != "Cor")
          questions.push(
            new TextboxQuestion({
              key: key,
              label: key,
              value: value,
              required: true,
              type: "textbox",
              order: 1
            })
          )
        else if (key == "Cor")
          questions.push(
            new ColorQuestion({
              key: key,
              label: key,
              value: value,
              required: true,
              type: "color",
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
        let corProduto = new CorProduto(
          result[0].value,
          result[1].value,
        )
        corProduto._id = id;
        this.corProdutoService.Editar(corProduto).subscribe(result => {
          this.snackBar.open("Cor editada com sucesso", "Fechar", { verticalPosition: "top" });
          this.CarregarCoresProduto();
        })
      });
    }
  }

  Remover() {
    if (this.CorSelecionada) {
      this.CorSelecionada.forEach(cor=>{
        let confirmar = confirm(`Excluir cor ${cor.Nome}?`);
        if (confirmar)
          this.corProdutoService.Remover(cor._id).subscribe(result => {
            this.snackBar.open(`Cor ${cor.Nome} removida com sucesso`, "Fechar");
            this.CarregarCoresProduto();
          })
      })
    }
  }
}

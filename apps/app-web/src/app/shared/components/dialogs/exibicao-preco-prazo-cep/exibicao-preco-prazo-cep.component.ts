import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CorreiosService } from 'apps/app-web/src/app/data/service/correios/correios.service';
import { PrecoPrazoEvent } from 'correios-brasil/dist';
import { Produto } from 'libs/data/src/lib/classes';
@Component({
  selector: 'personalizados-lopes-exibicao-preco-prazo-cep',
  templateUrl: './exibicao-preco-prazo-cep.component.html',
  styleUrls: ['./exibicao-preco-prazo-cep.component.scss']
})
export class ExibicaoPrecoPrazoCepComponent implements OnInit {
  Fretes:PrecoPrazoEvent[];
  CEP:string;
  cepForm:FormGroup;
  constructor(public dialogRef: MatDialogRef<ExibicaoPrecoPrazoCepComponent>,
    private servicoCorreios:CorreiosService,

    private fb:FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data:  {cep:string, produto:Produto}) {
      this.CEP = data.cep;
    }

  ngOnInit(): void {
    this.CalcularFreteProduto();
    this.cepForm = this.fb.group({
      cep:[this.CEP||'']
    })
  }

  CalcularFreteProduto(){
    if(!this.data.produto)
      if(this.CEP)
        this.servicoCorreios.CalcularPrecoPrazoPorCep(this.CEP).subscribe(fretes=>{
          this.Fretes = fretes;
        });
    if(this.data.produto)
      this.servicoCorreios.CalcularPrecoPrazoPorProduto(this.CEP, this.data.produto).subscribe(fretes=>{
        this.Fretes = fretes;
      });
  }

  NomeTransportadora(codigo){
    return codigo == "04014" ? 'SEDEX' : "PAC"
  }

  close(){
    this.dialogRef.close();
  }

  delayClose(off:number = 0){
    setTimeout(()=>{
      this.close()
    },off);
  }
}

import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CorreiosService } from 'apps/app-web/src/app/data/service/correios/correios.service';
@Component({
  selector: 'personalizados-lopes-exibicao-preco-prazo-cep',
  templateUrl: './exibicao-preco-prazo-cep.component.html',
  styleUrls: ['./exibicao-preco-prazo-cep.component.scss']
})
export class ExibicaoPrecoPrazoCepComponent implements OnInit {

  CEP:string;
  constructor(public dialogRef: MatDialogRef<ExibicaoPrecoPrazoCepComponent>,
    private servicoCorreios:CorreiosService,
    @Inject(MAT_DIALOG_DATA) public data:  string) {
      this.CEP = data;
    }

  ngOnInit(): void {
    this.servicoCorreios.CalcularPrecoPrazoPorCep(this.CEP).subscribe(prazos=>{
      console.log(prazos);
    });
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

import { Component, OnInit } from '@angular/core';
import { EstampaService } from 'apps/app-web/src/app/data/service';

@Component({
  selector: 'personalizados-lopes-criar-estampa',
  templateUrl: './criar-estampa.component.html',
  styleUrls: ['./criar-estampa.component.scss']
})
export class CriarEstampaComponent implements OnInit {

  constructor(estampaService:EstampaService) { }

  ngOnInit(): void {
  }

  Criar(): void {
    this.store.dispatch(new AdicionarProduto(Produto)).subscribe(x=>{
      this._snackBar.open("Adicionando produto", "Fechar", {

      });
    });
  }
}

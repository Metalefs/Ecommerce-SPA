import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Categoria, Estampa } from 'libs/data/src/lib/classes';

@Component({
  selector: 'personalizados-lopes-categoria-estampa',
  templateUrl: './categoria-estampa.component.html',
  styleUrls: ['./categoria-estampa.component.scss']
})
export class CategoriaEstampaComponent implements OnInit {
  @Input() Categorias:Categoria[];
  @Input() Estampa:Estampa;
  @Output() onSelecionarCategoria:EventEmitter<any> = new EventEmitter<any>();
  @Output() onCriarCategoria:EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  SelecionarCategoria(categoria){
    this.onSelecionarCategoria.emit(categoria.value);
  }
  CriarCategoria(){
    this.onCriarCategoria.emit();
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { Imagem } from 'libs/data/src/lib/classes';
import { MaterialTable } from 'libs/data/src/lib/structures/MaterialTable';
import { MatTableFilter } from 'mat-table-filter';

@Component({
  selector: 'personalizados-lopes-list-imagens',
  templateUrl: './list-imagens.component.html',
  styleUrls: ['./list-imagens.component.scss']
})
export class ListImagensComponent implements OnInit {
  @Input()
  Table:MaterialTable;

  filterEntity: Imagem;
  filterType: MatTableFilter;

  displayedColumns:string[] = [
    "Src",
    "Nome",
    "Tipo",
    "Acoes",
  ];
  constructor() { }

  ngOnInit(): void {

    this.filterEntity = new Imagem('','','');
    this.filterType = MatTableFilter.ANYWHERE;
  }
}

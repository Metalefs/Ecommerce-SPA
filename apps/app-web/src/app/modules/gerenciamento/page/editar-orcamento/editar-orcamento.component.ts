import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Select } from '@ngxs/store';
import { OrcamentoState } from 'apps/app-web/src/app/data/store/state';
import { Orcamento } from 'libs/data/src/lib/classes';
import { Observable } from 'rxjs';
import { MatTableFilter } from 'mat-table-filter';
import { DEFAULT_ORCAMENTO } from 'apps/app-web/src/app/data/store/state/orcamento.state';
@Component({
  selector: 'personalizados-lopes-editar-orcamento',
  templateUrl: './editar-orcamento.component.html',
  styleUrls: ['./editar-orcamento.component.scss']
})
export class EditarOrcamentoComponent implements OnInit {
  @Select(OrcamentoState.ObterListaOrcamentos) Orcamentos$: Observable<Orcamento[]>;
  dataSource: MatTableDataSource<Orcamento>;
  displayedColumns: string[] = [
    "Nome",
    "Email",
    "CPF",
    // "IDPagamento",
    "Data",
    "Preco",
    "Status",
    // "StatusMP",
    "Actions",
  ];
  filterEntity: Orcamento;
  filterType: MatTableFilter;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor() { }
  ngOnInit(): void {
    this.filterEntity = DEFAULT_ORCAMENTO;
    this.filterType = MatTableFilter.ANYWHERE;
    this.Orcamentos$.subscribe(x=>{
      x = x.sort((i,f)=>new Date(f.DataHoraCriacao).getTime() - new Date(i.DataHoraCriacao).getTime());
      this.dataSource = new MatTableDataSource(x);
    })
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  toLocaleDateString(date){
    return new Date(date).toLocaleDateString()+" -<br>"+ new Date(date).toLocaleTimeString();
  }
}

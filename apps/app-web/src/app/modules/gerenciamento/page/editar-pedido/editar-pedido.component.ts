import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Orcamento } from 'libs/data/src/lib/classes';
import { MatTableFilter } from 'mat-table-filter';
import { DEFAULT_ORCAMENTO } from 'apps/app-web/src/app/data/store/state/orcamento.state';
import { OrcamentoService, PedidoService } from 'apps/app-web/src/app/data/service';
@Component({
  selector: 'personalizados-lopes-editar-pedido',
  templateUrl: './editar-pedido.component.html',
  styleUrls: ['./editar-pedido.component.scss']
})
export class EditarPedidoComponent implements OnInit {
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
  constructor(private pedidoService:PedidoService) { }
  ngOnInit(): void {
    this.filterEntity = DEFAULT_ORCAMENTO;
    this.filterType = MatTableFilter.ANYWHERE;
    this.Atualizar();
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
  Atualizar(){
    this.pedidoService.Ler().subscribe((f:Array<Orcamento>) =>{
      f = f.sort((i,f)=>new Date(f.DataHoraCriacao).getTime() - new Date(i.DataHoraCriacao).getTime());
      this.dataSource = new MatTableDataSource(f);
    })
  }
  Excluir(elemento){
    this.pedidoService.Remover(elemento._id).subscribe(x=>{
      this.Atualizar()
    });
  }
  toLocaleDateString(date){
    return new Date(date).toLocaleDateString()+" -<br>"+ new Date(date).toLocaleTimeString();
  }
}

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { entities } from '@personalizados-lopes/data';
import { LerCliente, AdicionarCliente } from 'apps/app-web/src/app/data/store/actions/cliente.actions';
import { ClienteState } from 'apps/app-web/src/app/data/store/state';
import { Cliente } from 'libs/data/src/lib/classes';
import { CriarClienteDialogComponent } from './DialogComponents/criar-cliente-dialog/criar-cliente-dialog.component';

import { PathDictionary } from 'libs/data/src/lib/routes/image-folders';
import { ImagemService } from 'apps/app-web/src/app/data/service';

@Component({
  selector: 'personalizados-lopes-editar-clientes',
  templateUrl: './editar-clientes.component.html',
  styleUrls: ['./editar-clientes.component.scss']
})
export class EditarClientesComponent implements OnInit {

  @Select(ClienteState.ObterListaClientes) Clientes$: Observable<Cliente[]>;

  @Select(ClienteState.areClientesLoaded) areClientesLoaded$;

  constructor(
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private store: Store,
    private servicoImagens : ImagemService
    ) { }
  areClientesLoadedSub: Subscription;
  Atualizar(){
    this.areClientesLoadedSub = this.areClientesLoaded$.pipe(
      tap((areClientesLoaded) => {
          this.store.dispatch(new LerCliente());
          this.Clientes$
      })
    ).subscribe(value => {
      console.log(value);
    });
  }

  Criar(): void {
    const dialogRef = this.dialog.open(CriarClienteDialogComponent, {
      width: '90%',
      data: ""
    });

    dialogRef.afterClosed().subscribe((Cliente : entities.Cliente) => {
      if(Cliente != undefined){
        this.SalvarCliente(Cliente);
      }
    });
  }

  async SalvarCliente(cliente:Cliente){
    this.servicoImagens.storeImage(PathDictionary.clientes,cliente.Foto).then(async x=>{
      cliente.Foto = await this.servicoImagens.getRef((await x).metadata.fullPath,cliente.Nome,"Cliente");
      console.log(cliente.Foto);
      this.store.dispatch(new AdicionarCliente(cliente)).subscribe();
    })
  }

  ngOnInit(): void {
   this.Atualizar();
  }



}

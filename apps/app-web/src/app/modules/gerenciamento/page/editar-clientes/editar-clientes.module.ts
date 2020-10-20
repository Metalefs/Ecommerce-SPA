import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditarClientesComponent } from './editar-clientes.component';
import { EdicaoCardClienteComponent } from './components/edicao-card-cliente/edicao-card-cliente.component';
import { SharedModule } from '../../../../shared/shared.module';
import { CriarClienteDialogComponent } from './DialogComponents/criar-cliente-dialog/criar-cliente-dialog.component';



@NgModule({
  declarations: [EditarClientesComponent, EdicaoCardClienteComponent, CriarClienteDialogComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class EditarClientesModule { }

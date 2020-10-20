import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardClienteComponent } from './card-cliente.component';



@NgModule({
  declarations: [CardClienteComponent],
  imports: [
    CommonModule
  ],
  exports:[
    CardClienteComponent
  ]
})
export class CardClienteModule { }

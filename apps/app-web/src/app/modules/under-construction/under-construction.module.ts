import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

import { UnderConstructionComponent } from './page/under-construction.component';
import { UnderConstructionPageRoutes } from './under-construction.routing';
import { CountDownComponent } from './page/count-down/count-down.component';

@NgModule({
  declarations: [UnderConstructionComponent,CountDownComponent],
  imports: [
    CommonModule,
    SharedModule,
    UnderConstructionPageRoutes,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    UnderConstructionComponent
  ]
})
export class UnderConstructionModule { }

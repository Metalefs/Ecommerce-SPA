import { NgModule } from '@angular/core';
import { NavbariconComponent } from './component/navbaricon/navbaricon.component';
import { FactoryStepsComponent } from './component/factory-steps.component';

import { CommonModule } from '@angular/common';
import { SharedModule } from 'apps/app-web/src/app/shared/shared.module';

@NgModule({
  declarations: [
    NavbariconComponent,
    FactoryStepsComponent
  ],
  imports: [CommonModule,SharedModule],
  exports: [FactoryStepsComponent,NavbariconComponent],
  providers: []
})
export class FactoryStepsModule {}

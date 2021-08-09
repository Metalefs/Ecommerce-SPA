import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer.component';
import { SharedModule } from '../../../shared/shared.module';


import { NgxPageScrollModule } from 'ngx-page-scroll';
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';

import { FactoryStepsModule } from './components/factory-steps/factory-steps.module';

@NgModule({
  declarations: [FooterComponent],
  imports: [
    CommonModule,
    SharedModule,
    NgxPageScrollModule,
    NgxPageScrollCoreModule,
    FactoryStepsModule
  ],
  exports:[
    FooterComponent,
    NgxPageScrollModule,
    NgxPageScrollCoreModule,
    FactoryStepsModule
  ]
})
export class FooterModule { }

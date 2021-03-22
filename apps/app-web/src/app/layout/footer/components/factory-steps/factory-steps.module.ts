import { NgModule } from '@angular/core';
import { NavbariconComponent } from './component/navbaricon/navbaricon.component';
import { FactoryStepsComponent } from './component/factory-steps.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgxPageScrollModule } from 'ngx-page-scroll';
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';

@NgModule({
  declarations: [
    NavbariconComponent,
    FactoryStepsComponent
  ],
  imports: [CommonModule,RouterModule,NgxPageScrollModule,
    NgxPageScrollCoreModule],
  exports: [FactoryStepsComponent,NavbariconComponent],
  providers: []
})
export class FactoryStepsModule {}

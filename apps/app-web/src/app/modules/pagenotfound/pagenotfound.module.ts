import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagenotfoundComponent } from './page/pagenotfound/pagenotfound.component';
import { PagenotfoundPageRoutes } from './pagenotfound.routing';

import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [PagenotfoundComponent],
  imports: [
    PagenotfoundPageRoutes,
    CommonModule,
    SharedModule
  ],
  exports:[
    SharedModule
  ]
})
export class PagenotfoundModule { }

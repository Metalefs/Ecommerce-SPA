import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowcaseComponent } from './page/showcase.component';
import { ShowcasePageRoutes } from './showcase.routing';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [ShowcaseComponent],
  imports: [
    CommonModule,
    SharedModule,
    ShowcasePageRoutes
  ],
  exports: [
    SharedModule
  ]
})
export class ShowcaseModule { }

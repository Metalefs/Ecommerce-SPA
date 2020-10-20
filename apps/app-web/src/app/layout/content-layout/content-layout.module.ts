import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentLayoutComponent } from './page/content-layout.component';
import { FooterModule } from '../footer/footer.module';
import { HeaderModule } from '../header/header.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [ContentLayoutComponent],
  imports: [
    CommonModule,
    HeaderModule,
    FooterModule,
    SharedModule,
  ]
})
export class ContentLayoutModule { }

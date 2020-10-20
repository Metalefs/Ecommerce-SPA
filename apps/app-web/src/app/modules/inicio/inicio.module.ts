import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxPageScrollModule } from 'ngx-page-scroll';
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';

import { InicioComponent } from './page/inicio.component';
import { InicioPageRoutes } from './inicio.routing';
import { CarrouselComponent } from './page/carrousel/carrousel.component';

import { SlideshowModule } from 'ng-simple-slideshow';
import { SharedModule } from '../../shared/shared.module';
import { HeaderFooterComponent } from './page/header-footer/header-footer.component';

@NgModule({
  declarations: [InicioComponent, CarrouselComponent, HeaderFooterComponent],
  imports: [
    CommonModule,
    InicioPageRoutes,
    SlideshowModule,
    SharedModule,
    NgxPageScrollModule,
    NgxPageScrollCoreModule
  ],
  exports:[
    SlideshowModule
  ]
})
export class InicioModule { }

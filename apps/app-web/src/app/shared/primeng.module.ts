import { NgModule } from '@angular/core';

import { AutoCompleteModule } from 'primeng/autocomplete';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';
import { DropdownModule } from 'primeng/dropdown';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { DataViewModule } from 'primeng/dataview';

@NgModule({
  declarations: [],
  exports: [
    AutoCompleteModule,
    InputTextModule,
    ButtonModule,
    SkeletonModule,
    DropdownModule,
    BreadcrumbModule,
    DataViewModule
  ]
})
export class PrimeNgModule {}

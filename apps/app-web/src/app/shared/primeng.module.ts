import { NgModule } from '@angular/core';

import { AutoCompleteModule } from 'primeng/autocomplete';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import {SkeletonModule} from 'primeng/skeleton';
import {DropdownModule} from 'primeng/dropdown';
@NgModule({
  declarations: [],
  exports: [
    AutoCompleteModule,
    InputTextModule,
    ButtonModule,
    SkeletonModule,
    DropdownModule
  ]
})
export class PrimeNgModule {}

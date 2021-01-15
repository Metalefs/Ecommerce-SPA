import { NgModule } from '@angular/core';

import { AutoCompleteModule } from 'primeng/autocomplete';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  declarations: [],
  exports: [
    AutoCompleteModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    DialogModule,
  ]
})
export class PrimeNgModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocompleteDropdownComponent } from './autocomplete-dropdown.component';
import { FormsModule } from '@angular/forms';
import { PrimeNgModule } from '../../primeng.module';

@NgModule({
  declarations: [AutocompleteDropdownComponent],
  imports: [
    CommonModule,
    PrimeNgModule,
    FormsModule
  ],
  exports:[
    PrimeNgModule,
    FormsModule,
    AutocompleteDropdownComponent
  ]
})
export class AutocompleteDropdownModule { }

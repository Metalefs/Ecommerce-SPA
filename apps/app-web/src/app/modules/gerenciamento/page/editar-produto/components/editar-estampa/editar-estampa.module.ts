import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from 'apps/app-web/src/app/shared/shared.module';

import { EditarEstampaComponent } from './editar-estampa.component';
import { EditarEstampaFormModule } from './components/editar-estampa-form/editar-estampa-form.module';
import { EditarEstampaDialogComponent } from './dialogs/editar-estampa-dialog/editar-estampa-dialog.component';

@NgModule({
  declarations: [
    EditarEstampaComponent,
    EditarEstampaDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    EditarEstampaFormModule
  ],
  exports:[
    EditarEstampaDialogComponent,
    EditarEstampaFormModule
  ]
})
export class EditarEstampaModule { }

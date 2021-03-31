import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { EditorComponent } from '../editor.component';


@NgModule({
  declarations: [EditorComponent],
  imports: [
    CommonModule,
    CKEditorModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    EditorComponent,
    CKEditorModule
  ]
})
export class EditorModule { }

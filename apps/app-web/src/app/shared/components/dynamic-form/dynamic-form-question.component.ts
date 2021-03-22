import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, PLATFORM_ID } from '@angular/core';
import { FormGroup } from '@angular/forms';
declare var require: any;
import { QuestionBase } from './question-base';
@Component({
  selector: 'app-question',
  templateUrl: './dynamic-form-question.component.html'
})
export class DynamicFormQuestionComponent {
  @Input() question: QuestionBase<string>;
  @Input() form: FormGroup;
  get isValid() { return this.form.controls[this.question.key].valid; }
  images;
  public Editor;
  constructor(@Inject(PLATFORM_ID) private platformId: any,) {
    if(isPlatformBrowser(this.platformId)){
      const ClassicEditor = require('@ckeditor/ckeditor5-build-balloon');
      this.Editor = ClassicEditor;
    }
  }
  ngOnInit(){
  }
  fileChangeEvent($event: any) {
    this.question.value = $event.target.files[0];
  }
  updateProp(){
    console.log(this.question.value);
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/

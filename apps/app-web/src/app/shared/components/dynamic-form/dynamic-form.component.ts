import { Component, Input, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { QuestionBase, DynFormQuestions } from './question-base';
import { QuestionControlService } from './question-control.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  providers: [ QuestionControlService ]
})
export class DynamicFormComponent implements OnInit {

  @Input() questions: QuestionBase<string>[] = [];
  Method:string = "";
  Name:string = "";
  MethodButtonName:string;
  form: FormGroup;
  payLoad = '';

  constructor(private qcs: QuestionControlService,
      public dialogRef: MatDialogRef<DynamicFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data:  DynFormQuestions) {
      this.Method = data.Method;
      this.Name = data.Name;
      this.MethodButtonName = data.Method == "Editar" ? "Atualizar" : data.Method;
      this.questions = data.questions;
    }

  ngOnInit() {
    this.form = this.qcs.toFormGroup(this.questions);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

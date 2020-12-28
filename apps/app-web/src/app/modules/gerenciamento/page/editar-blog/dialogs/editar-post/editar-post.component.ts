import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BlogPost } from 'libs/data/src/lib/classes';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StatusPostagem } from 'libs/data/src/lib/classes/blogPost';
import { getPreviewURL } from 'apps/app-web/src/app/helper/FileHelper';
import { MatChipInputEvent } from '@angular/material/chips';
@Component({
  selector: 'personalizados-lopes-editar-post',
  templateUrl: './editar-post.component.html',
  styleUrls: ['./editar-post.component.scss']
})
export class EditarPostComponent implements OnInit {

  fileNames:string="nenhum arquivo selecionado.";
  BlogPost:BlogPost;
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  public Editor = ClassicEditor;
  colorCtrl = new FormControl();


  tagCtrl = new FormControl();
  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;

  status:string[] = [];
  constructor(public dialogRef: MatDialogRef<EditarPostComponent>,
    @Inject(MAT_DIALOG_DATA) public data:  BlogPost,
    ) {
      this.BlogPost = data;
    }

  ngOnInit() {
    for (var enumMember in StatusPostagem){
      if(isNaN(parseInt(StatusPostagem[enumMember])))
      this.status.push(StatusPostagem[enumMember])
    }
  }


  upload($event){
    this.fileNames = '';
    for(let i =0; i < $event.target.files.length; i++){
      this.fileNames+=$event.target.files[i].name+',';
      console.log($event.target.files[i].name)
    }
    getPreviewURL($event,this.fileNames,(res)=>{this.BlogPost.FotoCapa = res});
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  addTag(event: MatChipInputEvent): void{
    const input = event.input;
    const value = event.value;
    if ((value || '').trim())
      this.BlogPost.Tags.push(value.trim());
    if (input)
      input.value = '';

    this.tagCtrl.setValue(null);
  }
  removeTag(tag: string){
    const index = this.BlogPost.Tags.indexOf(tag);
    if (index >= 0) {
      this.BlogPost.Tags.splice(index, 1);
    }
  }
}

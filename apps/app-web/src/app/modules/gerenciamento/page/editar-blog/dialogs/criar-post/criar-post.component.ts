import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BlogPost } from 'libs/data/src/lib/classes';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StatusPostagem } from 'libs/data/src/lib/classes/blogPost';
import { getPreviewURL } from 'apps/app-web/src/app/helper/FileHelper';
import { MatChipInputEvent } from '@angular/material/chips';
import { categoriasBlogPost } from'../../../../../../data/models/categoriasBlogPost';
@Component({
  selector: 'personalizados-lopes-criar-post',
  templateUrl: './criar-post.component.html',
  styleUrls: ['./criar-post.component.scss']
})
export class CriarPostComponent implements OnInit {

  fileNames:string="nenhum arquivo selecionado.";
  BlogPost:BlogPost;
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  public Editor = ClassicEditor;
  categorias = categoriasBlogPost;
  tagCtrl = new FormControl();
  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;

  status:string[] = [];
  constructor(public dialogRef: MatDialogRef<CriarPostComponent>,
    @Inject(MAT_DIALOG_DATA) public data:  BlogPost,
    ) {
      this.BlogPost = new BlogPost (
        "",
        null,
        {
          Nome:'',
          Email:'',
          RedeSocial: [
            {Nome:'Facebook',Link:''},
            {Nome:'Instagram',Link:''},
            {Nome:'Twitter',Link:''}
          ]
        },
        "",
        [""],
        "",
        [{Nome:'',Email:'',Texto:'',Respostas:[]}],
        [0],
        0,
        StatusPostagem.privado,
      );
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
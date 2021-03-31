import { isPlatformBrowser } from '@angular/common';
import { Component, EventEmitter, Inject, Input, OnInit, Output, PLATFORM_ID } from '@angular/core';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular';

import { CloudinaryUnsigned } from 'puff-puff/CKEditor';
declare var require: any;
@Component({
  selector: 'personalizados-lopes-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  @Input() Conteudo:string;
  @Input() Disabled:boolean = false;

  @Output() Changed = new EventEmitter();

  Editor;
  editorConfig = {
    placeholder: 'Escreva o conteúdo aqui!',
    extraPlugins: [ this.imagePluginFactory ],
  };

  constructor(@Inject(PLATFORM_ID) private platformId: any,) {
    if(isPlatformBrowser(this.platformId)){
      const ClassicEditor = require('@ckeditor/ckeditor5-build-balloon');
      this.Editor = ClassicEditor;
    }
   }
  public onChange( { editor }: ChangeEvent ) {
    const data = editor.getData();
    this.Changed.emit(data);
  }
  ngOnInit(): void {
  }
  imagePluginFactory(editor) {
    editor.plugins.get( 'FileRepository' ).createUploadAdapter = ( loader ) => {
      return new CloudinaryUnsigned(
        loader,
        'dl2xjgikt',
        'onntywmg',
        [ 160, 500, 1000, 1052 ]
       );
    };
  }
}

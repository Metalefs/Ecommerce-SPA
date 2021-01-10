import { Component, Input, OnInit } from '@angular/core';

import * as ClassicEditor from '@ckeditor/ckeditor5-build-balloon';
import { CloudinaryUnsigned } from 'puff-puff/CKEditor';

@Component({
  selector: 'personalizados-lopes-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  @Input() Conteudo:string;
  @Input() Disabled:boolean = false;

  Editor = ClassicEditor;

  editorConfig = {
    placeholder: 'Escreva o conteúdo aqui!',
    extraPlugins: [ this.imagePluginFactory ],
  };

  constructor() { }

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

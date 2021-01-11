import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular';

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

  @Output() Changed = new EventEmitter();

  Editor = ClassicEditor;
  editorConfig = {
    placeholder: 'Escreva o conteúdo aqui!',
    extraPlugins: [ this.imagePluginFactory ],
  };

  constructor() { }
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

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Produto } from 'libs/data/src/lib/classes';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'personalizados-lopes-criacao-tags',
  templateUrl: './criacao-tags.component.html',
  styleUrls: ['./criacao-tags.component.scss']
})
export class CriacaoTagsComponent implements OnInit {
  @Input() Produto:Produto;
  @Input() tagCtrl:FormControl;

  @Output() onAddTag: EventEmitter<any> = new EventEmitter<any>();
  @Output() onRemoveTag: EventEmitter<any> = new EventEmitter<any>();

  separatorKeysCodes: number[] = [ENTER, COMMA];
  constructor() { }

  ngOnInit(): void {
  }

  addTag($event){
    this.onAddTag.emit($event);
  }

  removeTag(tag){
    this.onRemoveTag.emit(tag);
  }
}

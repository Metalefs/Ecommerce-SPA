import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Estampa } from 'libs/data/src/lib/classes';

@Component({
  selector: 'personalizados-lopes-imagem-estampa',
  templateUrl: './imagem-estampa.component.html',
  styleUrls: ['./imagem-estampa.component.scss']
})
export class ImagemEstampaComponent implements OnInit {
  @Input()filenames:string;
  @Input() Estampa:Estampa;
  @Output()onUpload:EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

  upload($event){
    this.onUpload.emit($event);
  }
}

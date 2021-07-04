import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'personalizados-lopes-imagem-estampa',
  templateUrl: './imagem-estampa.component.html',
  styleUrls: ['./imagem-estampa.component.scss']
})
export class ImagemEstampaComponent implements OnInit {
  @Input()filenames:string;
  @Output()onUpload:EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

  upload($event){
    this.onUpload.emit($event);
  }
}

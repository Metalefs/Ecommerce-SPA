import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'personalizados-lopes-loading-cube',
  templateUrl: './loading-cube.component.html',
  styleUrls: ['./loading-cube.component.scss']
})
export class LoadingCubeComponent implements OnInit {

  @Input() Mensagem;
  constructor() { }

  ngOnInit(): void {
  }

}

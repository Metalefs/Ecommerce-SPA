import { Component, OnInit, Input, ViewChild, Renderer2, OnDestroy } from '@angular/core';
import { entities } from '@personalizados-lopes/data';
import { sliderAnimations } from "./animations";
@Component({
  selector: 'personalizados-lopes-card-cliente',
  templateUrl: './card-cliente.component.html',
  styleUrls:  ['./card-cliente.component.scss'],
  animations: [sliderAnimations]
})
export class CardClienteComponent implements OnInit {
  @Input() Cliente: entities.Cliente;
  @Input() animationsStates: any;
  @Input() position: any;
  @Input() length: any;

  constructor(private renderer: Renderer2) {
  }

  ngOnInit(){}
}

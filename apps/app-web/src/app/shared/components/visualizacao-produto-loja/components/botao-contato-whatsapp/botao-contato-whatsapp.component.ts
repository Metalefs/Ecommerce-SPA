import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'personalizados-lopes-botao-contato-whatsapp',
  templateUrl: './botao-contato-whatsapp.component.html',
  styleUrls: ['./botao-contato-whatsapp.component.scss']
})
export class BotaoContatoWhatsappComponent implements OnInit {
  @Output() onEntrarEmContato:EventEmitter<any> = new EventEmitter<any>()

  iconeWhatsapp = faWhatsapp;
  constructor() { }

  ngOnInit(): void {
  }

}

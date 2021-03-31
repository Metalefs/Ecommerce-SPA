import { Component, Input, OnInit } from '@angular/core';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { entities } from '@personalizados-lopes/data';

import { PartialObserver } from 'rxjs';

@Component({
  selector: 'personalizados-lopes-icone-whatsapp',
  templateUrl: './icone-whatsapp.component.html',
  styleUrls: ['./icone-whatsapp.component.scss']
})

export class IconeWhatsappComponent implements OnInit {

  @Input () Whatsapp:string = null;
  @Input () Mensagem:string = null;
  iconeWhatsapp = faWhatsapp;
  constructor() {  }

  ngOnInit() {
  }

}

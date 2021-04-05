import { Component, Input, OnInit } from '@angular/core';
import { Usuario } from 'libs/data/src/lib/classes';

@Component({
  selector: 'personalizados-lopes-exibicao-perfil',
  templateUrl: './exibicao-perfil.component.html',
  styleUrls: ['./exibicao-perfil.component.scss']
})
export class ExibicaoPerfilComponent implements OnInit {
  @Input() user:Usuario;
  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { EstadoNav } from '../factory-steps.component';

@Component({
  selector: 'navbaricon',
  templateUrl: './navbaricon.component.html',
  styleUrls: ['./navbaricon.component.css']
})
export class NavbariconComponent implements OnInit {
  @Input()
  Titulo: string;
  @Input()
  Link: string;
  @Input()
  Icon: string;
  @Input()
  EstadoNav: EstadoNav;

  constructor() { }

  ChangeToThis(){
    this.EstadoNav.pagina = this.Link;
  }

  ngOnInit(): void {
    console.log(this.Titulo,
      this.Link,
      this.Icon)
  }

}

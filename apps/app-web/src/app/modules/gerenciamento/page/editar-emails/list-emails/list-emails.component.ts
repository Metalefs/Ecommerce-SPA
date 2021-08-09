import { Component, OnInit, Input } from '@angular/core';
import { MaterialTable } from 'libs/data/src/lib/structures/MaterialTable';

@Component({
  selector: 'personalizados-lopes-list-emails',
  templateUrl: './list-emails.component.html',
  styleUrls: ['./list-emails.component.scss']
})
export class ListEmailsComponent implements OnInit {
  @Input()
  Table:MaterialTable;

  constructor() { }

  ngOnInit(): void {
  }
}

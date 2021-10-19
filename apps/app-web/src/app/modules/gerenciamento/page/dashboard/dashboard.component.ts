import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { entities } from '@personalizados-lopes/data';
import { fade } from '../../../../animations';
import { DocumentRef } from '../../../../shared/services/document.service';

@Component({
  selector: 'personalizados-lopes-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  Produtos: entities.Produto[];
  @Input() init_point;
  @Input() disabled: boolean;

  constructor(private document: DocumentRef, @Inject(PLATFORM_ID) private platform: Object) { }


}



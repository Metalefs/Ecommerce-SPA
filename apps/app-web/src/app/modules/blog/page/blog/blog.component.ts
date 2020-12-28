import { Component, OnInit } from '@angular/core';
import { fade } from 'apps/app-web/src/app/animations';

@Component({
  selector: 'personalizados-lopes-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  animations:[fade]
})
export class BlogComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

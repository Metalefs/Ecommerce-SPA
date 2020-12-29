import { Component, Input, OnInit } from '@angular/core';
import { BlogPost } from 'libs/data/src/lib/classes';

@Component({
  selector: 'personalizados-lopes-card-blog',
  templateUrl: './card-blog.component.html',
  styleUrls: ['./card-blog.component.scss']
})
export class CardBlogComponent implements OnInit {
  @Input() Post:BlogPost;
  constructor() { }

  ngOnInit(): void {
  }

}

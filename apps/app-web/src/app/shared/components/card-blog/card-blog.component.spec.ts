import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardBlogComponent } from './card-blog.component';

describe('CardBlogComponent', () => {
  let component: CardBlogComponent;
  let fixture: ComponentFixture<CardBlogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardBlogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

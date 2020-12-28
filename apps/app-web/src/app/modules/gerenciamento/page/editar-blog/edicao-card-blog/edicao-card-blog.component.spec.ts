import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdicaoCardBlogComponent } from './edicao-card-blog.component';

describe('EdicaoCardBlogComponent', () => {
  let component: EdicaoCardBlogComponent;
  let fixture: ComponentFixture<EdicaoCardBlogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdicaoCardBlogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdicaoCardBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

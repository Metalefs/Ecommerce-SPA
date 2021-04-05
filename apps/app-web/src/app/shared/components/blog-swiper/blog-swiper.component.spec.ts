import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogSwiperComponent } from './blog-swiper.component';

describe('BlogSwiperComponent', () => {
  let component: BlogSwiperComponent;
  let fixture: ComponentFixture<BlogSwiperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogSwiperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogSwiperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

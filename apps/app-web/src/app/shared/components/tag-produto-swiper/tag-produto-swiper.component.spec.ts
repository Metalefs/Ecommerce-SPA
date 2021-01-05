import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagProdutoSwiperComponent } from './tag-produto-swiper.component';

describe('TagProdutoSwiperComponent', () => {
  let component: TagProdutoSwiperComponent;
  let fixture: ComponentFixture<TagProdutoSwiperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagProdutoSwiperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagProdutoSwiperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

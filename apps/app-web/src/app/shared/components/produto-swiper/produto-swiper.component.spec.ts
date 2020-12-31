import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutoSwiperComponent } from './produto-swiper.component';

describe('ProdutoSwiperComponent', () => {
  let component: ProdutoSwiperComponent;
  let fixture: ComponentFixture<ProdutoSwiperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdutoSwiperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdutoSwiperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

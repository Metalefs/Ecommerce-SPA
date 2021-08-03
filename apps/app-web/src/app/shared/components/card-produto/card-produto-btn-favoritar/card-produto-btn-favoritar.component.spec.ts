import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardProdutoBtnFavoritarComponent } from './card-produto-btn-favoritar.component';

describe('CardProdutoBtnFavoritarComponent', () => {
  let component: CardProdutoBtnFavoritarComponent;
  let fixture: ComponentFixture<CardProdutoBtnFavoritarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardProdutoBtnFavoritarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardProdutoBtnFavoritarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

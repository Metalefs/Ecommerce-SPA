import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardProdutoBtnComprarComponent } from './card-produto-btn-comprar.component';

describe('CardProdutoBtnComprarComponent', () => {
  let component: CardProdutoBtnComprarComponent;
  let fixture: ComponentFixture<CardProdutoBtnComprarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardProdutoBtnComprarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardProdutoBtnComprarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardProdutoBtnAdicionarCarrinhoComponent } from './card-produto-btn-adicionar-carrinho.component';

describe('CardProdutoBtnAdicionarCarrinhoComponent', () => {
  let component: CardProdutoBtnAdicionarCarrinhoComponent;
  let fixture: ComponentFixture<CardProdutoBtnAdicionarCarrinhoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardProdutoBtnAdicionarCarrinhoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardProdutoBtnAdicionarCarrinhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

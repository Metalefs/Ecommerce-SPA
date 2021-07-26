import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardProdutoStatusProdutoComponent } from './card-produto-status-produto.component';

describe('CardProdutoStatusProdutoComponent', () => {
  let component: CardProdutoStatusProdutoComponent;
  let fixture: ComponentFixture<CardProdutoStatusProdutoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardProdutoStatusProdutoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardProdutoStatusProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

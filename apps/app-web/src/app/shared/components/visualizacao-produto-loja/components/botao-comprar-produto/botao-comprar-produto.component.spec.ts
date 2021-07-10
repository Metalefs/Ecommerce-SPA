import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BotaoComprarProdutoComponent } from './botao-comprar-produto.component';

describe('BotaoComprarProdutoComponent', () => {
  let component: BotaoComprarProdutoComponent;
  let fixture: ComponentFixture<BotaoComprarProdutoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BotaoComprarProdutoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BotaoComprarProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

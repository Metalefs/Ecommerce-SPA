import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelecaoFaixaPrecoProdutoComponent } from './selecao-faixa-preco-produto.component';

describe('SelecaoFaixaPrecoProdutoComponent', () => {
  let component: SelecaoFaixaPrecoProdutoComponent;
  let fixture: ComponentFixture<SelecaoFaixaPrecoProdutoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelecaoFaixaPrecoProdutoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelecaoFaixaPrecoProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

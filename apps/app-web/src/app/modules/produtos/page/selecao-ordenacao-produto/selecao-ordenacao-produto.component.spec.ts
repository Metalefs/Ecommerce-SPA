import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelecaoOrdenacaoProdutoComponent } from './selecao-ordenacao-produto.component';

describe('SelecaoOrdenacaoProdutoComponent', () => {
  let component: SelecaoOrdenacaoProdutoComponent;
  let fixture: ComponentFixture<SelecaoOrdenacaoProdutoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelecaoOrdenacaoProdutoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelecaoOrdenacaoProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroFornecedorProdutoComponent } from './filtro-fornecedor-produto.component';

describe('FiltroFornecedorProdutoComponent', () => {
  let component: FiltroFornecedorProdutoComponent;
  let fixture: ComponentFixture<FiltroFornecedorProdutoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltroFornecedorProdutoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroFornecedorProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

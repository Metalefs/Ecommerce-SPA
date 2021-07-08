import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FornecedorProdutoSelectorComponent } from './fornecedor-produto-selector.component';

describe('FornecedorProdutoSelectorComponent', () => {
  let component: FornecedorProdutoSelectorComponent;
  let fixture: ComponentFixture<FornecedorProdutoSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FornecedorProdutoSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FornecedorProdutoSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

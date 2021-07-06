import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarFornecedorProdutoComponent } from './editar-fornecedor-produto.component';

describe('EditarFornecedorProdutoComponent', () => {
  let component: EditarFornecedorProdutoComponent;
  let fixture: ComponentFixture<EditarFornecedorProdutoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarFornecedorProdutoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarFornecedorProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

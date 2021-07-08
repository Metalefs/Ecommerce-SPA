import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarFornecedorProdutoFormComponent } from './editar-fornecedor-produto-form.component';

describe('EditarFornecedorProdutoFormComponent', () => {
  let component: EditarFornecedorProdutoFormComponent;
  let fixture: ComponentFixture<EditarFornecedorProdutoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarFornecedorProdutoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarFornecedorProdutoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

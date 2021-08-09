import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioProdutosOrcamentoComponent } from './formulario-produtos-orcamento.component';

describe('FormularioProdutosOrcamentoComponent', () => {
  let component: FormularioProdutosOrcamentoComponent;
  let fixture: ComponentFixture<FormularioProdutosOrcamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormularioProdutosOrcamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioProdutosOrcamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioContatoOrcamentoComponent } from './formulario-contato-orcamento.component';

describe('FormularioContatoOrcamentoComponent', () => {
  let component: FormularioContatoOrcamentoComponent;
  let fixture: ComponentFixture<FormularioContatoOrcamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormularioContatoOrcamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioContatoOrcamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

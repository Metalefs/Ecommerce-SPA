import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaEdicaoOrcamentoComponent } from './tabela-edicao-orcamento.component';

describe('TabelaEdicaoOrcamentoComponent', () => {
  let component: TabelaEdicaoOrcamentoComponent;
  let fixture: ComponentFixture<TabelaEdicaoOrcamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabelaEdicaoOrcamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabelaEdicaoOrcamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

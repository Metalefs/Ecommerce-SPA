import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExibicaoDadosPagamentoComponent } from './exibicao-dados-pagamento.component';

describe('ExibicaoDadosPagamentoComponent', () => {
  let component: ExibicaoDadosPagamentoComponent;
  let fixture: ComponentFixture<ExibicaoDadosPagamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExibicaoDadosPagamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExibicaoDadosPagamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

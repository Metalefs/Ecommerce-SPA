import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadoPagamentoComponent } from './resultado-pagamento.component';

describe('ResultadoPagamentoComponent', () => {
  let component: ResultadoPagamentoComponent;
  let fixture: ComponentFixture<ResultadoPagamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultadoPagamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultadoPagamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

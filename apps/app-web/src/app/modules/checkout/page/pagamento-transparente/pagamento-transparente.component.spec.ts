import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagamentoTransparenteComponent } from './pagamento-transparente.component';

describe('PagamentoTransparenteComponent', () => {
  let component: PagamentoTransparenteComponent;
  let fixture: ComponentFixture<PagamentoTransparenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagamentoTransparenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagamentoTransparenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

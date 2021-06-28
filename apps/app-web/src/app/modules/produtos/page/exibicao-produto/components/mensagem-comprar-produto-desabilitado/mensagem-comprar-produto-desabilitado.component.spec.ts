import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MensagemComprarProdutoDesabilitadoComponent } from './mensagem-comprar-produto-desabilitado.component';

describe('MensagemComprarProdutoDesabilitadoComponent', () => {
  let component: MensagemComprarProdutoDesabilitadoComponent;
  let fixture: ComponentFixture<MensagemComprarProdutoDesabilitadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MensagemComprarProdutoDesabilitadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MensagemComprarProdutoDesabilitadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

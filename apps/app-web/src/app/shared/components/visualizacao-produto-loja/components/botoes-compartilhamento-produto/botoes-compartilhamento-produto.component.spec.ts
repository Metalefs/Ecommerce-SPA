import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BotoesCompartilhamentoProdutoComponent } from './botoes-compartilhamento-produto.component';

describe('BotoesCompartilhamentoProdutoComponent', () => {
  let component: BotoesCompartilhamentoProdutoComponent;
  let fixture: ComponentFixture<BotoesCompartilhamentoProdutoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BotoesCompartilhamentoProdutoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BotoesCompartilhamentoProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

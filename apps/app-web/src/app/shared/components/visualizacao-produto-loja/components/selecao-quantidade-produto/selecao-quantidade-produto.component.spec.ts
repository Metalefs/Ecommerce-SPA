import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelecaoQuantidadeProdutoComponent } from './selecao-quantidade-produto.component';

describe('SelecaoQuantidadeProdutoComponent', () => {
  let component: SelecaoQuantidadeProdutoComponent;
  let fixture: ComponentFixture<SelecaoQuantidadeProdutoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelecaoQuantidadeProdutoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelecaoQuantidadeProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

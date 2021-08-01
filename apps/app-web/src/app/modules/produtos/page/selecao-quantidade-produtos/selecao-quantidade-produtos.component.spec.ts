import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelecaoQuantidadeProdutosComponent } from './selecao-quantidade-produtos.component';

describe('SelecaoQuantidadeProdutosComponent', () => {
  let component: SelecaoQuantidadeProdutosComponent;
  let fixture: ComponentFixture<SelecaoQuantidadeProdutosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelecaoQuantidadeProdutosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelecaoQuantidadeProdutosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

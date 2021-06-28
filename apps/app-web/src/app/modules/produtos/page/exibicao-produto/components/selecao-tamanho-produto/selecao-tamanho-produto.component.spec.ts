import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelecaoTamanhoProdutoComponent } from './selecao-tamanho-produto.component';

describe('SelecaoTamanhoProdutoComponent', () => {
  let component: SelecaoTamanhoProdutoComponent;
  let fixture: ComponentFixture<SelecaoTamanhoProdutoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelecaoTamanhoProdutoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelecaoTamanhoProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

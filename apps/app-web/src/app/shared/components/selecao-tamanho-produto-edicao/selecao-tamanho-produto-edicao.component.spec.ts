import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelecaoTamanhoProdutoEdicaoComponent } from './selecao-tamanho-produto-edicao.component';

describe('SelecaoTamanhoProdutoEdicaoComponent', () => {
  let component: SelecaoTamanhoProdutoEdicaoComponent;
  let fixture: ComponentFixture<SelecaoTamanhoProdutoEdicaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelecaoTamanhoProdutoEdicaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelecaoTamanhoProdutoEdicaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

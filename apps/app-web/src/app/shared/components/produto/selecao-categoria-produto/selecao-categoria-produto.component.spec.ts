import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelecaoCategoriaProdutoComponent } from './selecao-categoria-produto.component';

describe('SelecaoCategoriaProdutoComponent', () => {
  let component: SelecaoCategoriaProdutoComponent;
  let fixture: ComponentFixture<SelecaoCategoriaProdutoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelecaoCategoriaProdutoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelecaoCategoriaProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

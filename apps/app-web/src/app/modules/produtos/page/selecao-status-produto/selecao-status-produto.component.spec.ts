import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelecaoStatusProdutoComponent } from './selecao-status-produto.component';

describe('SelecaoStatusProdutoComponent', () => {
  let component: SelecaoStatusProdutoComponent;
  let fixture: ComponentFixture<SelecaoStatusProdutoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelecaoStatusProdutoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelecaoStatusProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

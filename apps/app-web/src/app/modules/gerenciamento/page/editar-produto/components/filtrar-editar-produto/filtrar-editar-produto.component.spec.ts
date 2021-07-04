import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrarEditarProdutoComponent } from './filtrar-editar-produto.component';

describe('FiltrarEditarProdutoComponent', () => {
  let component: FiltrarEditarProdutoComponent;
  let fixture: ComponentFixture<FiltrarEditarProdutoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltrarEditarProdutoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltrarEditarProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

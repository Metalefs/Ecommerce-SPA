import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarTamanhoProdutoComponent } from './editar-tamanho-produto.component';

describe('EditarTamanhoProdutoComponent', () => {
  let component: EditarTamanhoProdutoComponent;
  let fixture: ComponentFixture<EditarTamanhoProdutoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarTamanhoProdutoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarTamanhoProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

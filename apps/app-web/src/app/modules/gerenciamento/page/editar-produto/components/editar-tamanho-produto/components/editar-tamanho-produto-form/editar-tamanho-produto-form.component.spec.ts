import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarTamanhoProdutoFormComponent } from './editar-tamanho-produto-form.component';

describe('EditarTamanhoProdutoFormComponent', () => {
  let component: EditarTamanhoProdutoFormComponent;
  let fixture: ComponentFixture<EditarTamanhoProdutoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarTamanhoProdutoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarTamanhoProdutoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

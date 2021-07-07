import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarTamanhoProdutoDialogComponent } from './editar-tamanho-produto-dialog.component';

describe('EditarTamanhoProdutoDialogComponent', () => {
  let component: EditarTamanhoProdutoDialogComponent;
  let fixture: ComponentFixture<EditarTamanhoProdutoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarTamanhoProdutoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarTamanhoProdutoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

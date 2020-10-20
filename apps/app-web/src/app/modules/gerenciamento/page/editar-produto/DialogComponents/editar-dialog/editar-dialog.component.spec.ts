import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarProdutoDialogComponent } from './editar-dialog.component';

describe('EditarProdutoDialogComponent', () => {
  let component: EditarProdutoDialogComponent;
  let fixture: ComponentFixture<EditarProdutoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarProdutoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarProdutoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

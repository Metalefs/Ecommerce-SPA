import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarCupomDescontoDialogComponent } from './editar-cupom-desconto-dialog.component';

describe('EditarCupomDescontoDialogComponent', () => {
  let component: EditarCupomDescontoDialogComponent;
  let fixture: ComponentFixture<EditarCupomDescontoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarCupomDescontoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarCupomDescontoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

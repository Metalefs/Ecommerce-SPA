import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarIntegracaoDialogComponent } from './editar-integracao-dialog.component';

describe('EditarIntegracaoDialogComponent', () => {
  let component: EditarIntegracaoDialogComponent;
  let fixture: ComponentFixture<EditarIntegracaoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarIntegracaoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarIntegracaoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroOrdenacaoDialogComponent } from './filtro-ordenacao-dialog.component';

describe('FiltroOrdenacaoDialogComponent', () => {
  let component: FiltroOrdenacaoDialogComponent;
  let fixture: ComponentFixture<FiltroOrdenacaoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltroOrdenacaoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroOrdenacaoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

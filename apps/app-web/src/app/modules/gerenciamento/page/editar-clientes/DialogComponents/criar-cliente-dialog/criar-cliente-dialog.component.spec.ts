import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarClienteDialogComponent } from './criar-cliente-dialog.component';

describe('CriarClienteDialogComponent', () => {
  let component: CriarClienteDialogComponent;
  let fixture: ComponentFixture<CriarClienteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CriarClienteDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriarClienteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

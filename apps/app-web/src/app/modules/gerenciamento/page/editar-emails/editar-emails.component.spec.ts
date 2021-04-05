import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarEmailsComponent } from './editar-emails.component';

describe('EditarEmailsComponent', () => {
  let component: EditarEmailsComponent;
  let fixture: ComponentFixture<EditarEmailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarEmailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarEmailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

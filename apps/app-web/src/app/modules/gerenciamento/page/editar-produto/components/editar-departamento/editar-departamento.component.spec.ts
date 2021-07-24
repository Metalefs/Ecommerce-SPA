import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarDepartamentoComponent } from './editar-departamento.component';

describe('EditarDepartamentoComponent', () => {
  let component: EditarDepartamentoComponent;
  let fixture: ComponentFixture<EditarDepartamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarDepartamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarDepartamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

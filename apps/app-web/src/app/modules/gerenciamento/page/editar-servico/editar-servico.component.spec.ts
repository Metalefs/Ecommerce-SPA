import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarServicoComponent } from './editar-servico.component';

describe('EditarServicoComponent', () => {
  let component: EditarServicoComponent;
  let fixture: ComponentFixture<EditarServicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarServicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarServicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

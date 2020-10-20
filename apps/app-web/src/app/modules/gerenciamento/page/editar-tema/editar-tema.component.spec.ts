import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarTemaComponent } from './editar-tema.component';

describe('EditarTemaComponent', () => {
  let component: EditarTemaComponent;
  let fixture: ComponentFixture<EditarTemaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarTemaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarTemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

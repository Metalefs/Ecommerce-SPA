import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarCategoriaComponent } from './editar-categoria.component';

describe('EditarCategoriaComponent', () => {
  let component: EditarCategoriaComponent;
  let fixture: ComponentFixture<EditarCategoriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarCategoriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

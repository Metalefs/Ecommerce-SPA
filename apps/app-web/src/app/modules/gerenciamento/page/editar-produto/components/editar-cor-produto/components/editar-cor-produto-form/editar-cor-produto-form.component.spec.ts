import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarCorProdutoFormComponent } from './editar-cor-produto-form.component';

describe('EditarCorProdutoFormComponent', () => {
  let component: EditarCorProdutoFormComponent;
  let fixture: ComponentFixture<EditarCorProdutoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarCorProdutoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarCorProdutoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

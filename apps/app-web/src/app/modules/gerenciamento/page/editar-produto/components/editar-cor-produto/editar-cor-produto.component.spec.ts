import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarCorProdutoComponent } from './editar-cor-produto.component';

describe('EditarCorProdutoComponent', () => {
  let component: EditarCorProdutoComponent;
  let fixture: ComponentFixture<EditarCorProdutoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarCorProdutoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarCorProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

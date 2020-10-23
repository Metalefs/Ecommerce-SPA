import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarOrcamentoComponent } from './editar-orcamento.component';

describe('EditarOrcamentoComponent', () => {
  let component: EditarOrcamentoComponent;
  let fixture: ComponentFixture<EditarOrcamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarOrcamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarOrcamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

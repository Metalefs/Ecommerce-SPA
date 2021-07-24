import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarCupomDescontoComponent } from './editar-cupom-desconto.component';

describe('EditarCupomDescontoComponent', () => {
  let component: EditarCupomDescontoComponent;
  let fixture: ComponentFixture<EditarCupomDescontoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarCupomDescontoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarCupomDescontoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

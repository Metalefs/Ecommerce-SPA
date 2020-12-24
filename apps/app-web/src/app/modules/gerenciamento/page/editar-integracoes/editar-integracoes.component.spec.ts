import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarIntegracoesComponent } from './editar-integracoes.component';

describe('EditarIntegracoesComponent', () => {
  let component: EditarIntegracoesComponent;
  let fixture: ComponentFixture<EditarIntegracoesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarIntegracoesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarIntegracoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

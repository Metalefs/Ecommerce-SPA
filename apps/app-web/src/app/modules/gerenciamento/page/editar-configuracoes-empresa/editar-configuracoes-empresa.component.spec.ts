import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarConfiguracoesEmpresaComponent } from './editar-configuracoes-empresa.component';

describe('EditarConfiguracoesEmpresaComponent', () => {
  let component: EditarConfiguracoesEmpresaComponent;
  let fixture: ComponentFixture<EditarConfiguracoesEmpresaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarConfiguracoesEmpresaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarConfiguracoesEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

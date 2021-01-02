import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExibicaoPerfilComponent } from './exibicao-perfil.component';

describe('ExibicaoPerfilComponent', () => {
  let component: ExibicaoPerfilComponent;
  let fixture: ComponentFixture<ExibicaoPerfilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExibicaoPerfilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExibicaoPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

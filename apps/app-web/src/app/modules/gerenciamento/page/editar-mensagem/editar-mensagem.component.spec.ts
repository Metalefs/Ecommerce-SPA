import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarMensagemComponent } from './editar-mensagem.component';

describe('EditarMensagemComponent', () => {
  let component: EditarMensagemComponent;
  let fixture: ComponentFixture<EditarMensagemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarMensagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarMensagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

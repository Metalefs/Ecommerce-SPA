import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExibirListaComentarioComponent } from './exibir-lista-comentario.component';

describe('ExibirListaComentarioComponent', () => {
  let component: ExibirListaComentarioComponent;
  let fixture: ComponentFixture<ExibirListaComentarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExibirListaComentarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExibirListaComentarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExibirListaComentarioProdutoComponent } from './exibir-lista-comentario-produto.component';

describe('ExibirListaComentarioProdutoComponent', () => {
  let component: ExibirListaComentarioProdutoComponent;
  let fixture: ComponentFixture<ExibirListaComentarioProdutoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExibirListaComentarioProdutoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExibirListaComentarioProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExibirComentarioProdutoComponent } from './exibir-comentario-produto.component';

describe('ExibirComentarioProdutoComponent', () => {
  let component: ExibirComentarioProdutoComponent;
  let fixture: ComponentFixture<ExibirComentarioProdutoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExibirComentarioProdutoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExibirComentarioProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

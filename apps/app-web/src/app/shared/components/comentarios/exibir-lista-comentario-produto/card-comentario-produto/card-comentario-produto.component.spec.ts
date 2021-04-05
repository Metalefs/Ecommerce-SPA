import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComentarioProdutoComponent } from './card-comentario-produto.component';

describe('CardComentarioProdutoComponent', () => {
  let component: CardComentarioProdutoComponent;
  let fixture: ComponentFixture<CardComentarioProdutoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardComentarioProdutoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComentarioProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

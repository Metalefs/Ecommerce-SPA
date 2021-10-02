import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardProdutoImagemComponent } from './card-produto-imagem.component';

describe('CardProdutoImagemComponent', () => {
  let component: CardProdutoImagemComponent;
  let fixture: ComponentFixture<CardProdutoImagemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardProdutoImagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardProdutoImagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

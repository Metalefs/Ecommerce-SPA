import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardProdutoBtnAbrirModalComponent } from './card-produto-btn-abrir-modal.component';

describe('CardProdutoBtnAbrirModalComponent', () => {
  let component: CardProdutoBtnAbrirModalComponent;
  let fixture: ComponentFixture<CardProdutoBtnAbrirModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardProdutoBtnAbrirModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardProdutoBtnAbrirModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

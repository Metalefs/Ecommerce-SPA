import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardProdutoBtnCompararComponent } from './card-produto-btn-comparar.component';

describe('CardProdutoBtnCompararComponent', () => {
  let component: CardProdutoBtnCompararComponent;
  let fixture: ComponentFixture<CardProdutoBtnCompararComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardProdutoBtnCompararComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardProdutoBtnCompararComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

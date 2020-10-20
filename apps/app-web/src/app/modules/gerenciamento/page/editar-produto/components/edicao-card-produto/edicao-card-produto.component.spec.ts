import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdicaoCardProdutoComponent } from './edicao-card-produto.component';

describe('EdicaoCardProdutoComponent', () => {
  let component: EdicaoCardProdutoComponent;
  let fixture: ComponentFixture<EdicaoCardProdutoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdicaoCardProdutoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdicaoCardProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

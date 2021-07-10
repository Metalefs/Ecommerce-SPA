import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlocoPagamentoProdutoComponent } from './bloco-pagamento-produto.component';

describe('BlocoPagamentoProdutoComponent', () => {
  let component: BlocoPagamentoProdutoComponent;
  let fixture: ComponentFixture<BlocoPagamentoProdutoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlocoPagamentoProdutoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlocoPagamentoProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

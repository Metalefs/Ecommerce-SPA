import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EspecificacaoProdutoComponent } from './especificacao-produto.component';

describe('EspecificacaoProdutoComponent', () => {
  let component: EspecificacaoProdutoComponent;
  let fixture: ComponentFixture<EspecificacaoProdutoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EspecificacaoProdutoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EspecificacaoProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExibicaoPrecoProdutoComponent } from './exibicao-preco-produto.component';

describe('ExibicaoPrecoProdutoComponent', () => {
  let component: ExibicaoPrecoProdutoComponent;
  let fixture: ComponentFixture<ExibicaoPrecoProdutoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExibicaoPrecoProdutoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExibicaoPrecoProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

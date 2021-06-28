import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExibicaoImagemProdutoComponent } from './exibicao-imagem-produto.component';

describe('ExibicaoImagemProdutoComponent', () => {
  let component: ExibicaoImagemProdutoComponent;
  let fixture: ComponentFixture<ExibicaoImagemProdutoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExibicaoImagemProdutoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExibicaoImagemProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

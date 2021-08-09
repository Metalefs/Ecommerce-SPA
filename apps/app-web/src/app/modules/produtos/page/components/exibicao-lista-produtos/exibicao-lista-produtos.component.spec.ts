import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExibicaoListaProdutosComponent } from './exibicao-lista-produtos.component';

describe('ExibicaoListaProdutosComponent', () => {
  let component: ExibicaoListaProdutosComponent;
  let fixture: ComponentFixture<ExibicaoListaProdutosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExibicaoListaProdutosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExibicaoListaProdutosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

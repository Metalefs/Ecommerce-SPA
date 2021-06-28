import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabInformacaoAvaliacaoProdutoComponent } from './tab-informacao-avaliacao-produto.component';

describe('TabInformacaoAvaliacaoProdutoComponent', () => {
  let component: TabInformacaoAvaliacaoProdutoComponent;
  let fixture: ComponentFixture<TabInformacaoAvaliacaoProdutoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabInformacaoAvaliacaoProdutoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabInformacaoAvaliacaoProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

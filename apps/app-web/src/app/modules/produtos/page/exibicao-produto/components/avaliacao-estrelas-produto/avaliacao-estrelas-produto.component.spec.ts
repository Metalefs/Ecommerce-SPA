import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvaliacaoEstrelasProdutoComponent } from './avaliacao-estrelas-produto.component';

describe('AvaliacaoEstrelasProdutoComponent', () => {
  let component: AvaliacaoEstrelasProdutoComponent;
  let fixture: ComponentFixture<AvaliacaoEstrelasProdutoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvaliacaoEstrelasProdutoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvaliacaoEstrelasProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

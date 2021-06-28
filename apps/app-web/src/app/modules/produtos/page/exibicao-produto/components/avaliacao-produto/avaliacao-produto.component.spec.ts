import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvaliacaoProdutoComponent } from './avaliacao-produto.component';

describe('AvaliacaoProdutoComponent', () => {
  let component: AvaliacaoProdutoComponent;
  let fixture: ComponentFixture<AvaliacaoProdutoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvaliacaoProdutoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvaliacaoProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

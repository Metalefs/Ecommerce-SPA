import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExibicaoCanvasDesignProdutoComponent } from './exibicao-canvas-design-produto.component';

describe('ExibicaoCanvasDesignProdutoComponent', () => {
  let component: ExibicaoCanvasDesignProdutoComponent;
  let fixture: ComponentFixture<ExibicaoCanvasDesignProdutoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExibicaoCanvasDesignProdutoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExibicaoCanvasDesignProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

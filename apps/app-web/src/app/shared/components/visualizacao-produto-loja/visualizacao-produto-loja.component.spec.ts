import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizacaoProdutoLojaComponent } from './visualizacao-produto-loja.component';

describe('VisualizacaoProdutoLojaComponent', () => {
  let component: VisualizacaoProdutoLojaComponent;
  let fixture: ComponentFixture<VisualizacaoProdutoLojaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizacaoProdutoLojaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizacaoProdutoLojaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

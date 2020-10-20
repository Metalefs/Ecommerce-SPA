import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExibicaoProdutoComponent } from './exibicao-produto.component';

describe('ExibicaoProdutoComponent', () => {
  let component: ExibicaoProdutoComponent;
  let fixture: ComponentFixture<ExibicaoProdutoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExibicaoProdutoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExibicaoProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

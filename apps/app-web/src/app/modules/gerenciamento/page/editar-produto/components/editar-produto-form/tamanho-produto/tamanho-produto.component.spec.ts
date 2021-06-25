import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TamanhoProdutoComponent } from './tamanho-produto.component';

describe('TamanhoProdutoComponent', () => {
  let component: TamanhoProdutoComponent;
  let fixture: ComponentFixture<TamanhoProdutoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TamanhoProdutoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TamanhoProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TamanhoProdutoSelectorComponent } from './tamanho-produto-selector.component';

describe('TamanhoProdutoSelectorComponent', () => {
  let component: TamanhoProdutoSelectorComponent;
  let fixture: ComponentFixture<TamanhoProdutoSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TamanhoProdutoSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TamanhoProdutoSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

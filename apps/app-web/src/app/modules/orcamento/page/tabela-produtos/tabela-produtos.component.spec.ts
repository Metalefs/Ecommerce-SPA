import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaProdutosComponent } from './tabela-produtos.component';

describe('TabelaProdutosComponent', () => {
  let component: TabelaProdutosComponent;
  let fixture: ComponentFixture<TabelaProdutosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabelaProdutosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabelaProdutosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

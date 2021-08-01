import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroCorProdutoComponent } from './filtro-cor-produto.component';

describe('FiltroCorProdutoComponent', () => {
  let component: FiltroCorProdutoComponent;
  let fixture: ComponentFixture<FiltroCorProdutoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltroCorProdutoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroCorProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

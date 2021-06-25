import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DimensoesProdutoComponent } from './dimensoes-produto.component';

describe('DimensoesProdutoComponent', () => {
  let component: DimensoesProdutoComponent;
  let fixture: ComponentFixture<DimensoesProdutoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DimensoesProdutoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DimensoesProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorProdutoComponent } from './cor-produto.component';

describe('CorProdutoComponent', () => {
  let component: CorProdutoComponent;
  let fixture: ComponentFixture<CorProdutoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorProdutoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

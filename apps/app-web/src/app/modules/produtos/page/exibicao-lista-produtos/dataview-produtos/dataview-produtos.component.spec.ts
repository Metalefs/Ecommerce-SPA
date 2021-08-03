import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataviewProdutosComponent } from './dataview-produtos.component';

describe('DataviewProdutosComponent', () => {
  let component: DataviewProdutosComponent;
  let fixture: ComponentFixture<DataviewProdutosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataviewProdutosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataviewProdutosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

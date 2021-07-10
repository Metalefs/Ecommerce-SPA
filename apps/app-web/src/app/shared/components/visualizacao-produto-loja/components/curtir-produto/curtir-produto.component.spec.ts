import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurtirProdutoComponent } from './curtir-produto.component';

describe('CurtirProdutoComponent', () => {
  let component: CurtirProdutoComponent;
  let fixture: ComponentFixture<CurtirProdutoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurtirProdutoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurtirProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

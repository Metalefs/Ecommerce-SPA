import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewProdutoComponent } from './preview-produto.component';

describe('PreviewProdutoComponent', () => {
  let component: PreviewProdutoComponent;
  let fixture: ComponentFixture<PreviewProdutoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewProdutoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

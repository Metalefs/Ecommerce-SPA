import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorProdutoSelectorComponent } from './cor-produto-selector.component';

describe('CorProdutoSelectorComponent', () => {
  let component: CorProdutoSelectorComponent;
  let fixture: ComponentFixture<CorProdutoSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorProdutoSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorProdutoSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

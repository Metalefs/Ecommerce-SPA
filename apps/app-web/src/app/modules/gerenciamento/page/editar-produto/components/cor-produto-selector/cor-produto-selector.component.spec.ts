import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorProdutoCheckboxSelectorComponent } from './cor-produto-selector.component';

describe('CorProdutoCheckboxSelectorComponent', () => {
  let component: CorProdutoCheckboxSelectorComponent;
  let fixture: ComponentFixture<CorProdutoCheckboxSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorProdutoCheckboxSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorProdutoCheckboxSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

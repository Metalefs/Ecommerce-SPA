import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxCoresProdutoComponent } from './checkbox-cores-produto.component';

describe('CheckboxCoresProdutoComponent', () => {
  let component: CheckboxCoresProdutoComponent;
  let fixture: ComponentFixture<CheckboxCoresProdutoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckboxCoresProdutoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxCoresProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

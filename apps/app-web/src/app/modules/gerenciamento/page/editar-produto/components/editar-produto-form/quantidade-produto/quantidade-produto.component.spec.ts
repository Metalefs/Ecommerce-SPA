import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantidadeProdutoComponent } from './quantidade-produto.component';

describe('QuantidadeProdutoComponent', () => {
  let component: QuantidadeProdutoComponent;
  let fixture: ComponentFixture<QuantidadeProdutoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuantidadeProdutoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuantidadeProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

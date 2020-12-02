import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutDisplayComponent } from './checkout-display.component';

describe('CheckoutDisplayComponent', () => {
  let component: CheckoutDisplayComponent;
  let fixture: ComponentFixture<CheckoutDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckoutDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

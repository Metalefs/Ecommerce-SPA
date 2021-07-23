import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertCoupomComponent } from './insert-coupom.component';

describe('InsertCoupomComponent', () => {
  let component: InsertCoupomComponent;
  let fixture: ComponentFixture<InsertCoupomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertCoupomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertCoupomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

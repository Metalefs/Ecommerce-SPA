import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostumizationComponent } from './costumization.component';

describe('CostumizationComponent', () => {
  let component: CostumizationComponent;
  let fixture: ComponentFixture<CostumizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostumizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostumizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockImageComponent } from './stock-image.component';

describe('StockImageComponent', () => {
  let component: StockImageComponent;
  let fixture: ComponentFixture<StockImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

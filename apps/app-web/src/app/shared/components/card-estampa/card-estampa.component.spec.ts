import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardEstampaComponent } from './card-estampa.component';

describe('CardEstampaComponent', () => {
  let component: CardEstampaComponent;
  let fixture: ComponentFixture<CardEstampaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardEstampaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardEstampaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

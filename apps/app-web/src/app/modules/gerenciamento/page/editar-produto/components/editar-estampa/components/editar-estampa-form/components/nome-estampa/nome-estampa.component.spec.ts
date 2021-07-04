import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NomeEstampaComponent } from './nome-estampa.component';

describe('NomeEstampaComponent', () => {
  let component: NomeEstampaComponent;
  let fixture: ComponentFixture<NomeEstampaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NomeEstampaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NomeEstampaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

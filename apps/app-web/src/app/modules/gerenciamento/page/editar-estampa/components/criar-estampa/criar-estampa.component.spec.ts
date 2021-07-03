import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarEstampaComponent } from './criar-estampa.component';

describe('CriarEstampaComponent', () => {
  let component: CriarEstampaComponent;
  let fixture: ComponentFixture<CriarEstampaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CriarEstampaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriarEstampaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

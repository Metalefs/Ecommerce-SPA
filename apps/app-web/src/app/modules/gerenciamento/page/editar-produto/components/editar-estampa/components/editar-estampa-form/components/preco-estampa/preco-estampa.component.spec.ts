import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrecoEstampaComponent } from './preco-estampa.component';

describe('PrecoEstampaComponent', () => {
  let component: PrecoEstampaComponent;
  let fixture: ComponentFixture<PrecoEstampaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrecoEstampaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrecoEstampaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

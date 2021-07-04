import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaEstampaComponent } from './categoria-estampa.component';

describe('CategoriaEstampaComponent', () => {
  let component: CategoriaEstampaComponent;
  let fixture: ComponentFixture<CategoriaEstampaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriaEstampaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriaEstampaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

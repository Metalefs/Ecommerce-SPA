import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DescricaoEstampaComponent } from './descricao-estampa.component';

describe('DescricaoEstampaComponent', () => {
  let component: DescricaoEstampaComponent;
  let fixture: ComponentFixture<DescricaoEstampaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DescricaoEstampaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DescricaoEstampaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

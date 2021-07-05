import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelecaoEstampaComponent } from './selecao-estampa.component';

describe('SelecaoEstampaComponent', () => {
  let component: SelecaoEstampaComponent;
  let fixture: ComponentFixture<SelecaoEstampaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelecaoEstampaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelecaoEstampaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

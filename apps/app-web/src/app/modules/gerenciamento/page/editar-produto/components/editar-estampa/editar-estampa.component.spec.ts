import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarEstampaComponent } from './editar-estampa.component';

describe('EditarEstampaComponent', () => {
  let component: EditarEstampaComponent;
  let fixture: ComponentFixture<EditarEstampaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarEstampaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarEstampaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

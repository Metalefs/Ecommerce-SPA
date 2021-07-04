import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarEstampaFormComponent } from './editar-estampa-form.component';

describe('EditarEstampaFormComponent', () => {
  let component: EditarEstampaFormComponent;
  let fixture: ComponentFixture<EditarEstampaFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarEstampaFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarEstampaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

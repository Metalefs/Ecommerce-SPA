import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarEstampaDialogComponent } from './editar-estampa-dialog.component';

describe('EditarEstampaDialogComponent', () => {
  let component: EditarEstampaDialogComponent;
  let fixture: ComponentFixture<EditarEstampaDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarEstampaDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarEstampaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

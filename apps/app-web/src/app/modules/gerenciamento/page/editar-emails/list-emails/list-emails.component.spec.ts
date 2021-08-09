import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEmailsComponent } from './list-emails.component';

describe('ListEmailsComponent', () => {
  let component: ListEmailsComponent;
  let fixture: ComponentFixture<ListEmailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListEmailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListEmailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarDialogComponent } from './criar-dialog.component';

describe('CriarDialogComponent', () => {
  let component: CriarDialogComponent;
  let fixture: ComponentFixture<CriarDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CriarDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriarDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

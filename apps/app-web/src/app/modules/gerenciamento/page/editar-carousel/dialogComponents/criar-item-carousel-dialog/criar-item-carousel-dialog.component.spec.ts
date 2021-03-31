import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarItemCarouselDialogComponent } from './criar-item-carousel-dialog.component';

describe('CriarItemCarouselDialogComponent', () => {
  let component: CriarItemCarouselDialogComponent;
  let fixture: ComponentFixture<CriarItemCarouselDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CriarItemCarouselDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriarItemCarouselDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

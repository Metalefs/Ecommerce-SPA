import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarCarouselDialogComponent } from './editar-carousel-dialog.component';

describe('EditarCarouselDialogComponent', () => {
  let component: EditarCarouselDialogComponent;
  let fixture: ComponentFixture<EditarCarouselDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarCarouselDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarCarouselDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

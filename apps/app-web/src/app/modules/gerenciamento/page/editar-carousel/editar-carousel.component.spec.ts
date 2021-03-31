import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarCarouselComponent } from './editar-carousel.component';

describe('EditarCarouselComponent', () => {
  let component: EditarCarouselComponent;
  let fixture: ComponentFixture<EditarCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarItemCarouselComponent } from './editar-item-carousel.component';

describe('EditarItemCarouselComponent', () => {
  let component: EditarItemCarouselComponent;
  let fixture: ComponentFixture<EditarItemCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarItemCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarItemCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

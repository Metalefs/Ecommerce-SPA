import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingCubeComponent } from './loading-cube.component';

describe('LoadingCubeComponent', () => {
  let component: LoadingCubeComponent;
  let fixture: ComponentFixture<LoadingCubeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadingCubeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingCubeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

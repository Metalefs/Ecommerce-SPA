import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroCategoriaMobileComponent } from './filtro-categoria-mobile.component';

describe('FiltroCategoriaMobileComponent', () => {
  let component: FiltroCategoriaMobileComponent;
  let fixture: ComponentFixture<FiltroCategoriaMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltroCategoriaMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroCategoriaMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

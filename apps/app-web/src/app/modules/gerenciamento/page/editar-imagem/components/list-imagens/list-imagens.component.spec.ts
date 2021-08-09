import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListImagensComponent } from './list-imagens.component';

describe('ListImagensComponent', () => {
  let component: ListImagensComponent;
  let fixture: ComponentFixture<ListImagensComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListImagensComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListImagensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

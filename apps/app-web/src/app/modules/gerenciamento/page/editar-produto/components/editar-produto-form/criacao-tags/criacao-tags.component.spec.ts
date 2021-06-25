import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CriacaoTagsComponent } from './criacao-tags.component';

describe('CriacaoTagsComponent', () => {
  let component: CriacaoTagsComponent;
  let fixture: ComponentFixture<CriacaoTagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CriacaoTagsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriacaoTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

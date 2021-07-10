import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExibicaoBreadcrumbComponent } from './exibicao-breadcrumb.component';

describe('ExibicaoBreadcrumbComponent', () => {
  let component: ExibicaoBreadcrumbComponent;
  let fixture: ComponentFixture<ExibicaoBreadcrumbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExibicaoBreadcrumbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExibicaoBreadcrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

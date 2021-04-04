import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrcamentoDetailComponent } from './orcamento-detail.component';

describe('OrcamentoDetailComponent', () => {
  let component: OrcamentoDetailComponent;
  let fixture: ComponentFixture<OrcamentoDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrcamentoDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrcamentoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

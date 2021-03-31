import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciamentoComponent } from './gerenciamento.component';

describe('GerenciamentoComponent', () => {
  let component: GerenciamentoComponent;
  let fixture: ComponentFixture<GerenciamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GerenciamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GerenciamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

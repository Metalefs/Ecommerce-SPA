import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparacaoComponent } from './comparacao.component';

describe('ComparacaoComponent', () => {
  let component: ComparacaoComponent;
  let fixture: ComponentFixture<ComparacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComparacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComparacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaixaCodigoPromocionalComponent } from './caixa-codigo-promocional.component';

describe('CaixaCodigoPromocionalComponent', () => {
  let component: CaixaCodigoPromocionalComponent;
  let fixture: ComponentFixture<CaixaCodigoPromocionalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaixaCodigoPromocionalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaixaCodigoPromocionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExibicaoDescontoCepComponent } from './exibicao-desconto-cep.component';

describe('ExibicaoDescontoCepComponent', () => {
  let component: ExibicaoDescontoCepComponent;
  let fixture: ComponentFixture<ExibicaoDescontoCepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExibicaoDescontoCepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExibicaoDescontoCepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExibicaoPrecoPrazoCepComponent } from './exibicao-preco-prazo-cep.component';

describe('ExibicaoPrecoPrazoCepComponent', () => {
  let component: ExibicaoPrecoPrazoCepComponent;
  let fixture: ComponentFixture<ExibicaoPrecoPrazoCepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExibicaoPrecoPrazoCepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExibicaoPrecoPrazoCepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

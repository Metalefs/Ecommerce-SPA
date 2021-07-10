import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExibicaoArtesProdutoComponent } from './exibicao-artes-produto.component';

describe('ExibicaoArtesProdutoComponent', () => {
  let component: ExibicaoArtesProdutoComponent;
  let fixture: ComponentFixture<ExibicaoArtesProdutoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExibicaoArtesProdutoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExibicaoArtesProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

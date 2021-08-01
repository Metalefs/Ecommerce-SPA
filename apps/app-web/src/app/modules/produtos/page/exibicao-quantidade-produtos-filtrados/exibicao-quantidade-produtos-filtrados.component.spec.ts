import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExibicaoQuantidadeProdutosFiltradosComponent } from './exibicao-quantidade-produtos-filtrados.component';

describe('ExibicaoQuantidadeProdutosFiltradosComponent', () => {
  let component: ExibicaoQuantidadeProdutosFiltradosComponent;
  let fixture: ComponentFixture<ExibicaoQuantidadeProdutosFiltradosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExibicaoQuantidadeProdutosFiltradosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExibicaoQuantidadeProdutosFiltradosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

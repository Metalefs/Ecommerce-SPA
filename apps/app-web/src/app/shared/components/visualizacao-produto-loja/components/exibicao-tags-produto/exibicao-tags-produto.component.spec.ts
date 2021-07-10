import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExibicaoTagsProdutoComponent } from './exibicao-tags-produto.component';

describe('ExibicaoTagsProdutoComponent', () => {
  let component: ExibicaoTagsProdutoComponent;
  let fixture: ComponentFixture<ExibicaoTagsProdutoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExibicaoTagsProdutoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExibicaoTagsProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

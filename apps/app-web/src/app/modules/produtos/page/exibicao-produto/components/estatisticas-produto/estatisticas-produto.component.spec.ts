import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstatisticasProdutoComponent } from './estatisticas-produto.component';

describe('EstatisticasProdutoComponent', () => {
  let component: EstatisticasProdutoComponent;
  let fixture: ComponentFixture<EstatisticasProdutoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstatisticasProdutoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstatisticasProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

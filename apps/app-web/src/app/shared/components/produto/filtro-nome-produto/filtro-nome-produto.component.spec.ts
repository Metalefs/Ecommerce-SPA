import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroNomeProdutoComponent } from './filtro-nome-produto.component';

describe('FiltroNomeProdutoComponent', () => {
  let component: FiltroNomeProdutoComponent;
  let fixture: ComponentFixture<FiltroNomeProdutoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltroNomeProdutoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroNomeProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

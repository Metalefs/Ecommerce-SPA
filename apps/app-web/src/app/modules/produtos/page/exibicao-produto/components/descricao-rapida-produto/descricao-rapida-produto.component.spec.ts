import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DescricaoRapidaProdutoComponent } from './descricao-rapida-produto.component';

describe('DescricaoRapidaProdutoComponent', () => {
  let component: DescricaoRapidaProdutoComponent;
  let fixture: ComponentFixture<DescricaoRapidaProdutoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DescricaoRapidaProdutoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DescricaoRapidaProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

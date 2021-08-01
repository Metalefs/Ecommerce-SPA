import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NenhumProdutoEncontradoComponent } from './nenhum-produto-encontrado.component';

describe('NenhumProdutoEncontradoComponent', () => {
  let component: NenhumProdutoEncontradoComponent;
  let fixture: ComponentFixture<NenhumProdutoEncontradoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NenhumProdutoEncontradoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NenhumProdutoEncontradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

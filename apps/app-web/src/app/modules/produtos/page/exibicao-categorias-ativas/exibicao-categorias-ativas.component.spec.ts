import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExibicaoCategoriasAtivasComponent } from './exibicao-categorias-ativas.component';

describe('ExibicaoCategoriasAtivasComponent', () => {
  let component: ExibicaoCategoriasAtivasComponent;
  let fixture: ComponentFixture<ExibicaoCategoriasAtivasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExibicaoCategoriasAtivasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExibicaoCategoriasAtivasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

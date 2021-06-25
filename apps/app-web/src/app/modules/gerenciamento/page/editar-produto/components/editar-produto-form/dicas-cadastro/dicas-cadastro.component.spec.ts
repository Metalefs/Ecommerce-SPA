import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DicasCadastroComponent } from './dicas-cadastro.component';

describe('DicasCadastroComponent', () => {
  let component: DicasCadastroComponent;
  let fixture: ComponentFixture<DicasCadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DicasCadastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DicasCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

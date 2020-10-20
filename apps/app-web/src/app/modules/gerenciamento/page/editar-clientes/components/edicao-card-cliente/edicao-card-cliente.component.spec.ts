import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdicaoCardClienteComponent } from './edicao-card-cliente.component';

describe('EdicaoCardClienteComponent', () => {
  let component: EdicaoCardClienteComponent;
  let fixture: ComponentFixture<EdicaoCardClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdicaoCardClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdicaoCardClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

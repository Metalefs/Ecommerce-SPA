import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoDetailComponent } from './pedido-detail.component';

describe('PedidoDetailComponent', () => {
  let component: PedidoDetailComponent;
  let fixture: ComponentFixture<PedidoDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidoDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

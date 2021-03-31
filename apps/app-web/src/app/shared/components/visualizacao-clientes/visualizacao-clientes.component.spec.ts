import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizacaoClientesComponent } from './visualizacao-clientes.component';

describe('VisualizacaoClientesComponent', () => {
  let component: VisualizacaoClientesComponent;
  let fixture: ComponentFixture<VisualizacaoClientesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizacaoClientesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizacaoClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

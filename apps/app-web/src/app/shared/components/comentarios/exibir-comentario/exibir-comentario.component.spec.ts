import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExibirComentarioComponent } from './exibir-comentario.component';

describe('ExibirComentarioComponent', () => {
  let component: ExibirComentarioComponent;
  let fixture: ComponentFixture<ExibirComentarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExibirComentarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExibirComentarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

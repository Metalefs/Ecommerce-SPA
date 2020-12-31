import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EscreverComentarioComponent } from './escrever-comentario.component';

describe('EscreverComentarioComponent', () => {
  let component: EscreverComentarioComponent;
  let fixture: ComponentFixture<EscreverComentarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EscreverComentarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EscreverComentarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

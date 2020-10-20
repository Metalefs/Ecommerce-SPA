import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarImagemComponent } from './editar-imagem.component';

describe('EditarImagemComponent', () => {
  let component: EditarImagemComponent;
  let fixture: ComponentFixture<EditarImagemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarImagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarImagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

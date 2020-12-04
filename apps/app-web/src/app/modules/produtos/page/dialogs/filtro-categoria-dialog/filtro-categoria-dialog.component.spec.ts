import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroCategoriaDialogComponent } from './filtro-categoria-dialog.component';

describe('FiltroCategoriaDialogComponent', () => {
  let component: FiltroCategoriaDialogComponent;
  let fixture: ComponentFixture<FiltroCategoriaDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltroCategoriaDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroCategoriaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

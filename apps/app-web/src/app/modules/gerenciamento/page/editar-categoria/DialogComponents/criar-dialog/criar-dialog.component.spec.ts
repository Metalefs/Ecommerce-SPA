import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarCategoriaDialogComponent } from './criar-dialog.component';

describe('CriarCategoriaDialogComponent', () => {
  let component: CriarCategoriaDialogComponent;
  let fixture: ComponentFixture<CriarCategoriaDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CriarCategoriaDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriarCategoriaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarProdutoDialogComponent } from './criar-dialog.component';

describe('CriarProdutoDialogComponent', () => {
  let component: CriarProdutoDialogComponent;
  let fixture: ComponentFixture<CriarProdutoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CriarProdutoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriarProdutoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

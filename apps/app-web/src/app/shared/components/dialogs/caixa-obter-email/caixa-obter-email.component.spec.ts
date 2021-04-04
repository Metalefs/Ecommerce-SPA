import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaixaObterEmailComponent } from './caixa-obter-email.component';

describe('CaixaObterEmailComponent', () => {
  let component: CaixaObterEmailComponent;
  let fixture: ComponentFixture<CaixaObterEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaixaObterEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaixaObterEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

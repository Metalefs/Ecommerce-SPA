import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BotaoEsgotadoComponent } from './botao-esgotado.component';

describe('BotaoEsgotadoComponent', () => {
  let component: BotaoEsgotadoComponent;
  let fixture: ComponentFixture<BotaoEsgotadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BotaoEsgotadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BotaoEsgotadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

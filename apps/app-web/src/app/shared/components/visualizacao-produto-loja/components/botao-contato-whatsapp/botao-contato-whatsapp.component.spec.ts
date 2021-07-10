import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BotaoContatoWhatsappComponent } from './botao-contato-whatsapp.component';

describe('BotaoContatoWhatsappComponent', () => {
  let component: BotaoContatoWhatsappComponent;
  let fixture: ComponentFixture<BotaoContatoWhatsappComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BotaoContatoWhatsappComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BotaoContatoWhatsappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

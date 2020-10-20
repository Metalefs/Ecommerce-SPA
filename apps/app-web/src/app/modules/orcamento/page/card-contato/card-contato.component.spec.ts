import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardContatoComponent } from './card-contato.component';

describe('CardContatoComponent', () => {
  let component: CardContatoComponent;
  let fixture: ComponentFixture<CardContatoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardContatoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardContatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

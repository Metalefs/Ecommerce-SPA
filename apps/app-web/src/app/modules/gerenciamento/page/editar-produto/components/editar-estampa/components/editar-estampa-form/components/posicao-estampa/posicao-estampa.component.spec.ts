import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PosicaoEstampaComponent } from './posicao-estampa.component';

describe('PosicaoEstampaComponent', () => {
  let component: PosicaoEstampaComponent;
  let fixture: ComponentFixture<PosicaoEstampaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PosicaoEstampaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PosicaoEstampaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

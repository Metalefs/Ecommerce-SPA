import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExibicaoArteProdutoComponent } from './exibicao-arte-produto.component';

describe('ExibicaoArteProdutoComponent', () => {
  let component: ExibicaoArteProdutoComponent;
  let fixture: ComponentFixture<ExibicaoArteProdutoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExibicaoArteProdutoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExibicaoArteProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

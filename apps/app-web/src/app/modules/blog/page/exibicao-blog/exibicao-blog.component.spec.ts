import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExibicaoBlogComponent } from './exibicao-blog.component';

describe('ExibicaoBlogComponent', () => {
  let component: ExibicaoBlogComponent;
  let fixture: ComponentFixture<ExibicaoBlogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExibicaoBlogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExibicaoBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

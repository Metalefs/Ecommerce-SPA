import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemPostsComponent } from './listagem-posts.component';

describe('ListagemPostsComponent', () => {
  let component: ListagemPostsComponent;
  let fixture: ComponentFixture<ListagemPostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListagemPostsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListagemPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

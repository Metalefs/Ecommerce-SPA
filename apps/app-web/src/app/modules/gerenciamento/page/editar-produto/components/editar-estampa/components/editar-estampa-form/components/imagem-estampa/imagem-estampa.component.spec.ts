import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagemEstampaComponent } from './imagem-estampa.component';

describe('ImagemEstampaComponent', () => {
  let component: ImagemEstampaComponent;
  let fixture: ComponentFixture<ImagemEstampaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImagemEstampaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagemEstampaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

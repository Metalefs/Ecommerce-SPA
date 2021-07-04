import { TestBed } from '@angular/core/testing';

import { EditarEstampaService } from './editar-estampa.service';

describe('EditarEstampaService', () => {
  let service: EditarEstampaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditarEstampaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

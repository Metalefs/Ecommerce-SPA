import { TestBed } from '@angular/core/testing';

import { CorreiosService } from './correios.service';

describe('CorreiosService', () => {
  let service: CorreiosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorreiosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

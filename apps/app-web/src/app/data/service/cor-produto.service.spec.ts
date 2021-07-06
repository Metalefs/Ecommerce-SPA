import { TestBed } from '@angular/core/testing';

import { CorProdutoService } from './cor-produto.service';

describe('CorProdutoService', () => {
  let service: CorProdutoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorProdutoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

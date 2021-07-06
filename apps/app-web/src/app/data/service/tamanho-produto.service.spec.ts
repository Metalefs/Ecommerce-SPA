import { TestBed } from '@angular/core/testing';

import { TamanhoProdutoService } from './tamanho-produto.service';

describe('TamanhoProdutoService', () => {
  let service: TamanhoProdutoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TamanhoProdutoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

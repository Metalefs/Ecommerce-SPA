import { TestBed } from '@angular/core/testing';

import { FornecedorProdutoService } from './fornecedor-produto.service';

describe('FornecedorProdutoService', () => {
  let service: FornecedorProdutoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FornecedorProdutoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

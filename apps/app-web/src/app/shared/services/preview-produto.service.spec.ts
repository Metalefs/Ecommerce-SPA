import { TestBed } from '@angular/core/testing';

import { PreviewProdutoService } from './preview-produto.service';

describe('PreviewProdutoService', () => {
  let service: PreviewProdutoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreviewProdutoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

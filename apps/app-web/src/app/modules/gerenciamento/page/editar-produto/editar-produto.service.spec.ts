import { TestBed } from '@angular/core/testing';

import { EditarProdutoService } from './editar-produto.service';

describe('EditarProdutoService', () => {
  let service: EditarProdutoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditarProdutoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

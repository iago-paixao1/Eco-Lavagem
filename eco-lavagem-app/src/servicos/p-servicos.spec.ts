import { TestBed } from '@angular/core/testing';

import { PServicos } from './p-servicos';

describe('PServicos', () => {
  let service: PServicos;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PServicos);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

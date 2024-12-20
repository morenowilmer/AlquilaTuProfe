import { TestBed } from '@angular/core/testing';

import { EstadosGlobalesService } from './estados-globales.service';

describe('EstadosGlobalesService', () => {
  let service: EstadosGlobalesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstadosGlobalesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

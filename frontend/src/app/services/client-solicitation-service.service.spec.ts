import { TestBed } from '@angular/core/testing';

import { ClientSolicitationService } from './client-solicitation-service.service';

describe('ClientSolicitationService', () => {
  let service: ClientSolicitationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientSolicitationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

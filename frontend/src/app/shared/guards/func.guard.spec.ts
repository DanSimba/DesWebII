import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { funcGuard } from './func.guard';

describe('funcGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => funcGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { LeaseManagementService } from './lease-management.service';

describe('LeaseManagementService', () => {
  let service: LeaseManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeaseManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

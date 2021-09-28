import { TestBed } from '@angular/core/testing';

import { GDriveService } from './g-drive.service';

describe('GDriveService', () => {
  let service: GDriveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GDriveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

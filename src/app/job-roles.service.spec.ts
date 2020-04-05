import { TestBed } from '@angular/core/testing';

import { JobRolesService } from './job-roles.service';

describe('JobRolesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JobRolesService = TestBed.get(JobRolesService);
    expect(service).toBeTruthy();
  });
});

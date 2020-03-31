import { TestBed, inject } from '@angular/core/testing';

import { SxcVersionsService } from './sxc-versions.service';

describe('SxcVersionsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SxcVersionsService]
    });
  });

  it('should ...', inject([SxcVersionsService], (service: SxcVersionsService) => {
    expect(service).toBeTruthy();
  }));
});

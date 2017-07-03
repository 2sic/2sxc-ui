import { TestBed, inject } from '@angular/core/testing';

import { SxcService } from './sxc.service';

describe('SxcService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SxcService]
    });
  });

  it('should ...', inject([SxcService], (service: SxcService) => {
    expect(service).toBeTruthy();
  }));
});

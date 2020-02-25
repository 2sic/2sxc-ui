import { TestBed, inject } from '@angular/core/testing';

import { $2sxcService } from './$2sxc.service';

describe('$2sxcService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [$2sxcService]
    });
  });

  it('should ...', inject([$2sxcService], (service: $2sxcService) => {
    expect(service).toBeTruthy();
  }));
});

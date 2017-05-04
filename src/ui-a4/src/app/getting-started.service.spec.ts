import { TestBed, inject } from '@angular/core/testing';

import { GettingStartedService } from './getting-started.service';

describe('GettingStartedService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GettingStartedService]
    });
  });

  it('should ...', inject([GettingStartedService], (service: GettingStartedService) => {
    expect(service).toBeTruthy();
  }));
});

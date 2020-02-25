import { TestBed, inject } from '@angular/core/testing';

import { installerService } from './installer.service';

describe('GettingStartedService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [installerService]
    });
  });

  it('should ...', inject([installerService], (service: installerService) => {
    expect(service).toBeTruthy();
  }));
});

import { TestBed, inject } from '@angular/core/testing';

import { ModuleApiService } from './module-api.service';

describe('ModuleApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModuleApiService]
    });
  });

  it('should ...', inject([ModuleApiService], (service: ModuleApiService) => {
    expect(service).toBeTruthy();
  }));
});

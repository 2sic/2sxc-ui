import { TestBed, inject } from '@angular/core/testing';

import { ModuleApiService } from './module-api.service';
import { HttpModule } from "@angular/http";

describe('ModuleApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [ModuleApiService]
    });
  });

  it('should ...', inject([ModuleApiService], (service: ModuleApiService) => {
    expect(service).toBeTruthy();
  }));
});

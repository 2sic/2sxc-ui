import { TestBed, inject } from '@angular/core/testing';

import { Http2sxc } from './http-interceptor.service';

describe('Http2sxc', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Http2sxc]
    });
  });

  it('should ...', inject([Http2sxc], (service: Http2sxc) => {
    expect(service).toBeTruthy();
  }));
});

import { TestBed, inject } from '@angular/core/testing';

import { LibTwoService } from './lib-two.service';

describe('LibTwoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LibTwoService]
    });
  });

  it('should be created', inject([LibTwoService], (service: LibTwoService) => {
    expect(service).toBeTruthy();
  }));
});

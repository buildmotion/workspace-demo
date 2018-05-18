import { TestBed, inject } from '@angular/core/testing';

import { LibOneService } from './lib-one.service';

describe('LibOneService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LibOneService]
    });
  });

  it('should be created', inject([LibOneService], (service: LibOneService) => {
    expect(service).toBeTruthy();
  }));
});

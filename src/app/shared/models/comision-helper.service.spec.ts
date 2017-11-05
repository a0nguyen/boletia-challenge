import { TestBed, inject } from '@angular/core/testing';

import { ComisionHelperService } from './comision-helper.service';

describe('ComisionHelperService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ComisionHelperService]
    });
  });

  it('should be created', inject([ComisionHelperService], (service: ComisionHelperService) => {
    expect(service).toBeTruthy();
  }));
});

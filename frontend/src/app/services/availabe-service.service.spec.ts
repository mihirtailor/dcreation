import { TestBed } from '@angular/core/testing';

import { AvailabeServiceService } from './availabe-service.service';

describe('AvailabeServiceService', () => {
  let service: AvailabeServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AvailabeServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

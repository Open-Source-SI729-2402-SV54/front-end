import { TestBed } from '@angular/core/testing';

import { PowerLiftingService } from './power-lifting.service';

describe('PowerLiftingService', () => {
  let service: PowerLiftingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PowerLiftingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

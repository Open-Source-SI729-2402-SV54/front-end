import { TestBed } from '@angular/core/testing';

import { ExercisefitService } from './exercisefit.service';

describe('ExercisefitService', () => {
  let service: ExercisefitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExercisefitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

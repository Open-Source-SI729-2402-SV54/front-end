import { TestBed } from '@angular/core/testing';
import { ExerciseFitService } from './exercise-fit.service';

describe('ExerciseFitService', () => {
  let service: ExerciseFitService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExerciseFitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

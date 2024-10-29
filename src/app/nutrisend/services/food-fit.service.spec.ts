import { TestBed } from '@angular/core/testing';
import { FoodFitService } from './food-fit.service';

describe('FoodFitService', () => {
  let service: FoodFitService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FoodFitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

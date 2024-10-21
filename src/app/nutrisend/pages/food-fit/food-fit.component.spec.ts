import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodFitComponent } from './food-fit.component';

describe('FoodFitComponent', () => {
  let component: FoodFitComponent;
  let fixture: ComponentFixture<FoodFitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoodFitComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoodFitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PowerliftingComponent } from './powerlifting.component';

describe('PowerliftingComponent', () => {
  let component: PowerliftingComponent;
  let fixture: ComponentFixture<PowerliftingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PowerliftingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PowerliftingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

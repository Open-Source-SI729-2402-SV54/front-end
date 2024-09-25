import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseComponentComponent } from './exercise.component.component';

describe('ExerciseComponentComponent', () => {
  let component: ExerciseComponentComponent;
  let fixture: ComponentFixture<ExerciseComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExerciseComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExerciseComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

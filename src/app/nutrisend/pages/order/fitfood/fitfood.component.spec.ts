import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FitfoodComponent } from './fitfood.component';

describe('FitfoodComponent', () => {
  let component: FitfoodComponent;
  let fixture: ComponentFixture<FitfoodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FitfoodComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FitfoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

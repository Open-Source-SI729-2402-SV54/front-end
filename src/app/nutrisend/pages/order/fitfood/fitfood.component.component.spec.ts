import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FitfoodComponentComponent } from './fitfood.component.component';

describe('FitfoodComponentComponent', () => {
  let component: FitfoodComponentComponent;
  let fixture: ComponentFixture<FitfoodComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FitfoodComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FitfoodComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

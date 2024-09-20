import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlansComponent } from './plans.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('PlansComponent', () => {
  let component: PlansComponent;
  let fixture: ComponentFixture<PlansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlansComponent, RouterTestingModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct plan titles', () => {
    expect(component.basicPlanTitle).toEqual('Basic Plan');
    expect(component.premiumPlanTitle).toEqual('Premium Plan');
  });
});


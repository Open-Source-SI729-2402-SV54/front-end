import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterCongratsComponent } from './register-congrats.component';

describe('RegisterCongratsComponent', () => {
  let component: RegisterCongratsComponent;
  let fixture: ComponentFixture<RegisterCongratsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterCongratsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterCongratsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

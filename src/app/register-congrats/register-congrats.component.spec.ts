import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterCongratsComponent } from './register-congrats.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('RegisterCongratsComponent', () => {
  let component: RegisterCongratsComponent;
  let fixture: ComponentFixture<RegisterCongratsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterCongratsComponent, RouterTestingModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterCongratsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct welcome message', () => {
    expect(component.welcomeMessage).toEqual('Welcome to NutriSend');
  });

  it('should have the correct success message', () => {
    expect(component.successMessage).toEqual('Se ha Registrado Correctamente');
  });

  it('should have the correct button text', () => {
    expect(component.buttonText).toEqual('Listo');
  });
});



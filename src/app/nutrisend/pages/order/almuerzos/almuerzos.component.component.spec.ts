import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlmuerzosComponentComponent } from './almuerzos.component.component';

describe('AlmuerzosComponentComponent', () => {
  let component: AlmuerzosComponentComponent;
  let fixture: ComponentFixture<AlmuerzosComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlmuerzosComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlmuerzosComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

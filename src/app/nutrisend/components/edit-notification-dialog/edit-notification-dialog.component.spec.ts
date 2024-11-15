import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNotificationDialogComponent } from './edit-notification-dialog.component';

describe('EditNotificationDialogComponent', () => {
  let component: EditNotificationDialogComponent;
  let fixture: ComponentFixture<EditNotificationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditNotificationDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditNotificationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

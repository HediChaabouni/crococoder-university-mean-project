import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAssignComponent } from './admin-assign.component';

describe('AdminAssignComponent', () => {
  let component: AdminAssignComponent;
  let fixture: ComponentFixture<AdminAssignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAssignComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

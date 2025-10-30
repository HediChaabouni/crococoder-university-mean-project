import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentEvalsComponent } from './student-evals.component';

describe('StudentEvalsComponent', () => {
  let component: StudentEvalsComponent;
  let fixture: ComponentFixture<StudentEvalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentEvalsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentEvalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

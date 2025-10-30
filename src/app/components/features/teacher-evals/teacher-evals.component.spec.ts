import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherEvalsComponent } from './teacher-evals.component';

describe('TeacherEvalsComponent', () => {
  let component: TeacherEvalsComponent;
  let fixture: ComponentFixture<TeacherEvalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherEvalsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherEvalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherEvalsListComponent } from './teacher-evals-list.component';

describe('TeacherEvalsListComponent', () => {
  let component: TeacherEvalsListComponent;
  let fixture: ComponentFixture<TeacherEvalsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherEvalsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherEvalsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

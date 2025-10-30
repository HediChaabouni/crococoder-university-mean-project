import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvalFormComponent } from './eval-form.component';

describe('EvalFormComponent', () => {
  let component: EvalFormComponent;
  let fixture: ComponentFixture<EvalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvalFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

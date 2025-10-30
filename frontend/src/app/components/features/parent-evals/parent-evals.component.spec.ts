import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentEvalsComponent } from './parent-evals.component';

describe('ParentEvalsComponent', () => {
  let component: ParentEvalsComponent;
  let fixture: ComponentFixture<ParentEvalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParentEvalsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParentEvalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

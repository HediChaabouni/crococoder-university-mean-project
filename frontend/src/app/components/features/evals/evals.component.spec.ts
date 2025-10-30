import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvalsComponent } from './evals.component';

describe('EvalsComponent', () => {
  let component: EvalsComponent;
  let fixture: ComponentFixture<EvalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvalsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

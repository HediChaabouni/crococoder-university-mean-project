import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvalItemComponent } from './eval-item.component';

describe('EvalItemComponent', () => {
  let component: EvalItemComponent;
  let fixture: ComponentFixture<EvalItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvalItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvalItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

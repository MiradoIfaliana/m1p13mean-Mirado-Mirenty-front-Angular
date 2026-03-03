import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanCentreComponent } from './plan-centre.component';

describe('PlanCentreComponent', () => {
  let component: PlanCentreComponent;
  let fixture: ComponentFixture<PlanCentreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanCentreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanCentreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

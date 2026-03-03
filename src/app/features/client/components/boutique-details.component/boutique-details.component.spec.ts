import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoutiqueDetailsComponent } from './boutique-details.component';

describe('BoutiqueDetailsComponent', () => {
  let component: BoutiqueDetailsComponent;
  let fixture: ComponentFixture<BoutiqueDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoutiqueDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoutiqueDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

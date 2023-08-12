import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishedOrderComponent } from './finished-order.component';

describe('FinishedOrderComponent', () => {
  let component: FinishedOrderComponent;
  let fixture: ComponentFixture<FinishedOrderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FinishedOrderComponent]
    });
    fixture = TestBed.createComponent(FinishedOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

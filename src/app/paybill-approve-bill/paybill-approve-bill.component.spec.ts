import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaybillApproveBillComponent } from './paybill-approve-bill.component';

describe('PaybillApproveBillComponent', () => {
  let component: PaybillApproveBillComponent;
  let fixture: ComponentFixture<PaybillApproveBillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaybillApproveBillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaybillApproveBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PramoolBidComponent } from './pramool-bid.component';

describe('PramoolBidComponent', () => {
  let component: PramoolBidComponent;
  let fixture: ComponentFixture<PramoolBidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PramoolBidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PramoolBidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

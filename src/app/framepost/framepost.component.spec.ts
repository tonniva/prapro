import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FramepostComponent } from './framepost.component';

describe('FramepostComponent', () => {
  let component: FramepostComponent;
  let fixture: ComponentFixture<FramepostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FramepostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FramepostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

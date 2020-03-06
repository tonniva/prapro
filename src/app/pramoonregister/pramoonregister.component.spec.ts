import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PramoonregisterComponent } from './pramoonregister.component';

describe('PramoonregisterComponent', () => {
  let component: PramoonregisterComponent;
  let fixture: ComponentFixture<PramoonregisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PramoonregisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PramoonregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

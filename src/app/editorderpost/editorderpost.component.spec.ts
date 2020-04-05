import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorderpostComponent } from './editorderpost.component';

describe('EditorderpostComponent', () => {
  let component: EditorderpostComponent;
  let fixture: ComponentFixture<EditorderpostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorderpostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorderpostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

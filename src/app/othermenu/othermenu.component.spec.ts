import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OthermenuComponent } from './othermenu.component';

describe('OthermenuComponent', () => {
  let component: OthermenuComponent;
  let fixture: ComponentFixture<OthermenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OthermenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OthermenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

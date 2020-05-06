import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrevieworderproductComponent } from './previeworderproduct.component';

describe('PrevieworderproductComponent', () => {
  let component: PrevieworderproductComponent;
  let fixture: ComponentFixture<PrevieworderproductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrevieworderproductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrevieworderproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

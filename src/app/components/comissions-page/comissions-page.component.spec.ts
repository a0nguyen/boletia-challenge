import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComissionsPageComponent } from './comissions-page.component';

describe('ComissionsPageComponent', () => {
  let component: ComissionsPageComponent;
  let fixture: ComponentFixture<ComissionsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComissionsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComissionsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

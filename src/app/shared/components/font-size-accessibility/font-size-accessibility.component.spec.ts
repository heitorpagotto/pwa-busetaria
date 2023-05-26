import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FontSizeAccessibilityComponent } from './font-size-accessibility.component';

describe('FontSizeAccessibilityComponent', () => {
  let component: FontSizeAccessibilityComponent;
  let fixture: ComponentFixture<FontSizeAccessibilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FontSizeAccessibilityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FontSizeAccessibilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

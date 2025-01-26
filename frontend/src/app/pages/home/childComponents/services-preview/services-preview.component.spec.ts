import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesPreviewComponent } from './services-preview.component';

describe('ServicesPreviewComponent', () => {
  let component: ServicesPreviewComponent;
  let fixture: ComponentFixture<ServicesPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicesPreviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicesPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

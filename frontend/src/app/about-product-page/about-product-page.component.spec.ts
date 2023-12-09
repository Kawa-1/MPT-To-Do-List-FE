import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutProductPageComponent } from './about-product-page.component';

describe('AboutProductPageComponent', () => {
  let component: AboutProductPageComponent;
  let fixture: ComponentFixture<AboutProductPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutProductPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AboutProductPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

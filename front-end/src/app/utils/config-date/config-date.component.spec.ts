import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigDateComponent } from './config-date.component';

describe('ConfigDateComponent', () => {
  let component: ConfigDateComponent;
  let fixture: ComponentFixture<ConfigDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigDateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfigDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

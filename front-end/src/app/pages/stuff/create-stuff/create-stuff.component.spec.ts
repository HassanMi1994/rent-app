import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateStuffComponent } from './create-stuff.component';

describe('CreateStuffComponent', () => {
  let component: CreateStuffComponent;
  let fixture: ComponentFixture<CreateStuffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateStuffComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateStuffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

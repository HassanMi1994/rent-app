import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnedItemsComponent } from './returned-items.component';

describe('ReturnedItemsComponent', () => {
  let component: ReturnedItemsComponent;
  let fixture: ComponentFixture<ReturnedItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReturnedItemsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReturnedItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

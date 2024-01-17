import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LangsListComponent } from './langs-list.component';

describe('LangsListComponent', () => {
  let component: LangsListComponent;
  let fixture: ComponentFixture<LangsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LangsListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LangsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractItemsComponent } from './contract-items.component';

describe('ContractItemsComponent', () => {
  let component: ContractItemsComponent;
  let fixture: ComponentFixture<ContractItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContractItemsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContractItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

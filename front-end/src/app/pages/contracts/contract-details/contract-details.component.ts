import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { ContractService } from '../../../services/contract.service';
import { ActivatedRoute } from '@angular/router';
import { Contract } from '../../../models/contract.model';
import { TranslocoPipe } from '@ngneat/transloco';
import { FormsModule } from '@angular/forms';
import { AsyncPipe, CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { ContractItemsComponent } from '../contract-items/contract-items.component';
import { AddPaymentComponent } from '../add-payment/add-payment.component';
import { ReturnItemComponent } from '../return-item/return-item.component';
import { ContractStatus } from '../../../models/enum/ContractStatus';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
  selector: 'app-contract-details',
  standalone: true,
  imports: [TranslocoPipe, FormsModule, DecimalPipe, ContractItemsComponent, AddPaymentComponent, DatePipe, AsyncPipe, CommonModule],
  templateUrl: './contract-details.component.html',
  styleUrl: './contract-details.component.scss'
})
export class ContractDetailsComponent implements OnInit {

  id: number;
  isDirty: boolean = false;
  contract$: BehaviorSubject<Contract> = new BehaviorSubject(new Contract());

  constructor(public contractService: ContractService, private route: ActivatedRoute, private cdr: ChangeDetectorRef) {

  }
  ngOnInit(): void {
    this.contractService.getById()
      .subscribe(x => {
        this.contract$.next(x);
        this.cdr.detectChanges();
      });
  }

  closeContract() {
    this.contractService.changeStatus(ContractStatus.ClosedSuccessfuly);
  }

  updateUI(contract: Contract) {
    this.contract$.next(contract);
    console.warn(contract);
    // this.isDirty = true;
    // this.cd.detectChanges();
    // this.cd.reattach();
    // this.isDirty = false;
  }
}

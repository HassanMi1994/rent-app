import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { ContractService } from '../../../services/contract.service';
import { ActivatedRoute } from '@angular/router';
import { Contract } from '../../../models/contract.model';
import { TranslocoPipe } from '@ngneat/transloco';
import { FormsModule } from '@angular/forms';
import { AsyncPipe, CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { ContractItemsComponent } from './contract-items/contract-items.component';
import { AddPaymentComponent } from './add-payment/add-payment.component';
import { ContractStatus } from '../../../models/enum/ContractStatus';
import { ContractStatusComponent } from '../contract-status/contract-status.component';
import { ConfigDateComponent } from '../../../utils/config-date/config-date.component';

@Component({
  selector: 'app-contract-details',
  standalone: true,
  imports: [TranslocoPipe, FormsModule, DecimalPipe, ContractItemsComponent, ConfigDateComponent, AddPaymentComponent, DatePipe, AsyncPipe, CommonModule, ContractStatusComponent],
  templateUrl: './contract-details.component.html',
  styleUrl: './contract-details.component.scss'
})
export class ContractDetailsComponent implements OnInit {

  id: number;
  isDirty: boolean = false;

  constructor(public contractService: ContractService, private route: ActivatedRoute) {

  }
  ngOnInit(): void {
    let id = this.route.snapshot.params['{id}}'];
    this.contractService.selectedContractId = + id;
    this.contractService.getById()
  }

  closeContract() {
    this.contractService.changeStatus(ContractStatus.ClosedSuccessfuly);
  }
}

import { Component, ViewChild, ViewChildren } from '@angular/core';
import { ContractService } from '../../../services/contract.service';
import { ActivatedRoute } from '@angular/router';
import { Contract } from '../../../models/contract.model';
import { TranslocoPipe } from '@ngneat/transloco';
import { FormsModule } from '@angular/forms';
import { DatePipe, DecimalPipe } from '@angular/common';
import { ContractItemsComponent } from '../contract-items/contract-items.component';
import { AddPaymentComponent } from '../add-payment/add-payment.component';
import { ReturnItemComponent } from '../return-item/return-item.component';
import { ContractStatus } from '../../../models/enum/ContractStatus';

@Component({
  selector: 'app-contract-details',
  standalone: true,
  imports: [TranslocoPipe, FormsModule, DecimalPipe, ContractItemsComponent, AddPaymentComponent, DatePipe],
  templateUrl: './contract-details.component.html',
  styleUrl: './contract-details.component.scss'
})
export class ContractDetailsComponent {

  id: number;

  constructor(public contractService: ContractService, private route: ActivatedRoute) {
    contractService.getById();
  }

  closeContract() {

    this.contractService.changeStatus(ContractStatus.ClosedSuccessfuly);
  }
}

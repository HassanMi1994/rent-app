import { Component, ViewChild, ViewChildren } from '@angular/core';
import { ContractService } from '../../../services/contract.service';
import { ActivatedRoute } from '@angular/router';
import { Contract } from '../../../models/contract.model';
import { TranslocoPipe } from '@ngneat/transloco';
import { FormsModule } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { ContractItemsComponent } from '../contract-items/contract-items.component';
import { AddPaymentComponent } from '../add-payment/add-payment.component';

@Component({
  selector: 'app-contract-details',
  standalone: true,
  imports: [TranslocoPipe, FormsModule, DecimalPipe, ContractItemsComponent,AddPaymentComponent],
  templateUrl: './contract-details.component.html',
  styleUrl: './contract-details.component.scss'
})
export class ContractDetailsComponent {

  id: number;

  constructor(public contractService: ContractService, private route: ActivatedRoute) {
    contractService.getById();
  }
}

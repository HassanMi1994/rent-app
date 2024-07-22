import { ChangeDetectorRef, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { TranslocoPipe } from '@ngneat/transloco';
import { ContractService } from '../../../services/contract.service';
import { FormInputNumberComponent } from '../../../utils/form-input-number/form-input-number.component';
import { FormInputComponent } from '../../../utils/form-input/form-input.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Contract } from '../../../models/contract.model';

@Component({
  selector: 'app-add-payment',
  standalone: true,
  imports: [TranslocoPipe, FormInputNumberComponent, FormInputComponent, NgSelectModule, CommonModule, FormsModule, DecimalPipe],
  templateUrl: './add-payment.component.html',
  styleUrl: './add-payment.component.scss'
})
export class AddPaymentComponent {

  @ViewChild('amountRef') amountInput: FormInputNumberComponent;
  @Input() sendForServer: boolean = false;
  constructor(public contractService: ContractService, ch: ChangeDetectorRef) {
  }

  addPayment() {
    if (this.sendForServer) {
      this.contractService.addPayment();
    }
    this.contractService.addPaymentLocaly();
    this.amountInput.setValue(0);
    this.contractService.contract.totalPaidAmount += this.contractService.newPayment.amount;
  }

}

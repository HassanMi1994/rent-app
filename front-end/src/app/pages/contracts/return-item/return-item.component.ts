import { Component, Input } from '@angular/core';
import { ContractService } from '../../../services/contract.service';
import { FormInputComponent } from '../../../utils/form-input/form-input.component';
import { FormInputNumberComponent } from '../../../utils/form-input-number/form-input-number.component';
import { TranslocoPipe } from '@ngneat/transloco';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgSelectComponent, NgSelectModule } from '@ng-select/ng-select';
import { FormInputDateComponent } from '../../../utils/form-input-date/form-input-date.component';
import { ContractItem } from '../../../models/contractItem.model';

@Component({
  selector: 'app-return-item',
  standalone: true,
  imports: [FormInputComponent, FormInputNumberComponent, FormInputDateComponent, TranslocoPipe, DecimalPipe, FormsModule, NgSelectModule],
  templateUrl: './return-item.component.html',
  styleUrl: './return-item.component.scss'
})
export class ReturnItemComponent {

  @Input() item: ContractItem;


  constructor(public contractService: ContractService) {

  }

  addReturnItem() {

  }

}

import { Component, Input, ViewChild } from '@angular/core';
import { ContractService } from '../../../services/contract.service';
import { FormInputComponent } from '../../../utils/form-input/form-input.component';
import { FormInputNumberComponent } from '../../../utils/form-input-number/form-input-number.component';
import { TranslocoPipe } from '@ngneat/transloco';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgSelectComponent, NgSelectModule } from '@ng-select/ng-select';
import { FormInputDateComponent } from '../../../utils/form-input-date/form-input-date.component';
import { ContractItem } from '../../../models/contractItem.model';
import { ConfigDateComponent } from '../../../utils/config-date/config-date.component';

@Component({
  selector: 'app-return-item',
  standalone: true,
  imports: [FormInputComponent, FormInputNumberComponent, FormInputDateComponent, TranslocoPipe, DecimalPipe, FormsModule, ConfigDateComponent, NgSelectModule],
  templateUrl: './return-item.component.html',
  styleUrl: './return-item.component.scss'
})
export class ReturnItemComponent {

  @Input() item: ContractItem;
  @Input() contractItemID: number;
  @ViewChild('priceInput') priceInput: FormInputNumberComponent;

  constructor(public contractService: ContractService) {

  }

  //#region how many days
  get howManyDay() {
    var rentDate = this.item.rentDate;
    var selectedDate = this.contractService.newReturnItem.returnDateTime;
    var difference = (new Date(selectedDate).getTime() - new Date(rentDate).getTime()) / 1000 / 60 / 60 / 24
    return difference;
  }

  get howManyDaysRounded() {
    return Math.round(this.howManyDay);
  }
  //#endregion

  get calculatedPrice() {
    //todo: this should use config for rounding the number to up or down
    var calculatedPrice = this.howManyDaysRounded * this.item.pricePerDay * this.contractService.newReturnItem.quantity;
    // if (this.priceInput !== undefined)
    //   this.priceInput.setValue(calculatedPrice);

    this.contractService.newReturnItem.calculatedPrice = calculatedPrice;
    return Math.round(calculatedPrice);
  }

  addReturnItem() {
    this.contractService.newReturnItem.contractItemID = this.contractItemID;
    this.contractService.addReturn();
  }

}

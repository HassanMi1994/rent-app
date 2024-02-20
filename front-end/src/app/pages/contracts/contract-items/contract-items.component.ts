import { Component, Input, ViewChildren, input } from '@angular/core';
import { TranslocoPipe } from '@ngneat/transloco';
import { ContractService } from '../../../services/contract.service';
import { FormsModule } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { CustomerService } from '../../../services/customer.service';

@Component({
  selector: 'app-contract-items',
  standalone: true,
  imports: [TranslocoPipe, FormsModule, DecimalPipe],
  templateUrl: './contract-items.component.html',
  styleUrl: './contract-items.component.scss'
})
export class ContractItemsComponent {

  @Input() enableCheckBox: boolean = false;

  @ViewChildren('itemsRef') public itemsCheckBoxes: HTMLInputElement[];
  _selectAll: boolean = true;

  get selectAll(): boolean {
    this.itemsCheckBoxes
      .forEach(x => console.log(x));

    return this._selectAll;
  }

  set selectAll(checked: boolean) {
    this.itemsCheckBoxes.forEach(checkBox => {
      checkBox.checked = checked;
    });
    this._selectAll = checked;
  }

  constructor(public contractService: ContractService) {
    this.contractService.getById();
  }

}

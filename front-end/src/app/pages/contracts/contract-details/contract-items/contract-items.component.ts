import { DatePipe, DecimalPipe } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ReturnItemComponent } from "./return-item/return-item.component";
import { ReturnedItemsComponent } from "./returned-items/returned-items.component";
import { Component, Input, ViewChildren } from "@angular/core";
import { ContractService } from "../../../../services/contract.service";
import { TranslocoPipe } from "@ngneat/transloco";
import { FormInputComponent } from "../../../../utils/form-input/form-input.component";
import { FormInputNumberComponent } from "../../../../utils/form-input-number/form-input-number.component";


@Component({
  selector: 'app-contract-items',
  standalone: true,
  imports: [TranslocoPipe, FormsModule, DecimalPipe, ReturnItemComponent, DatePipe, ReturnedItemsComponent,FormInputNumberComponent],
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
    // this.contractService.getById();
  }

}

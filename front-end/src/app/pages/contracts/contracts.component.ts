import { Component, ViewChild } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../models/customer.model';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslocoPipe, TranslocoService } from '@ngneat/transloco';
import { PopUpComponent } from '../../utils/pop-up/pop-up.component';
import { ContractService } from '../../services/contract.service';
import { Contract } from '../../models/contract.model';
import { FormInputComponent } from '../../utils/form-input/form-input.component';
import { DatePipe, DecimalPipe } from '@angular/common';
import { ContractItemsComponent } from './contract-items/contract-items.component';

@Component({
  selector: 'app-contracts',
  standalone: true,
  imports: [NgSelectModule, FormsModule, ReactiveFormsModule, RouterLink, TranslocoPipe, PopUpComponent, FormInputComponent, DatePipe, DecimalPipe, ContractItemsComponent],
  templateUrl: './contracts.component.html',
  styleUrl: './contracts.component.scss'
})
export class ContractsComponent {

  @ViewChild('popUp') popup: PopUpComponent;

  selectedCustomerId: number;
  transLoco: TranslocoService;

  constructor(private customerService: CustomerService, public contractService: ContractService, transLoco: TranslocoService) {
    this.transLoco = transLoco;
    this.customerService.getAll();
    this.contractService.getAll();
  }

  selectedContractChanged(id: number) {
    this.contractService.selectedContractId = id;
  }

  showMoreInfo(e: MouseEvent, contractId: number) {
    var selectedContract = this.contractService.contracts.find(x => x.id == contractId) as Contract;
    this.popup.setTitle(selectedContract?.totalPricePerDay + ' ' + selectedContract?.totalPricePerDay)
    this.popup.showObject(selectedContract);
    this.popup.show();
    let popUp = document.getElementById('morePopUp') as HTMLDivElement
    popUp.style.top = e.y + 'px'
    popUp.style.left = e.x + 'px'
  }
}

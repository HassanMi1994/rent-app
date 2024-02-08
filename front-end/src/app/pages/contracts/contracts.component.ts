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

@Component({
  selector: 'app-contracts',
  standalone: true,
  imports: [NgSelectModule, FormsModule, ReactiveFormsModule, RouterLink, TranslocoPipe, PopUpComponent],
  templateUrl: './contracts.component.html',
  styleUrl: './contracts.component.scss'
})
export class ContractsComponent {

  @ViewChild('popUp') popup: PopUpComponent;

  selectedCustomerId: number;
  customers: Customer[];
  contracts: Contract[];
  transLoco: TranslocoService;

  constructor(private customerService: CustomerService, private contractService: ContractService, transLoco: TranslocoService) {
    this.transLoco = transLoco;

    this.customerService
      .getAll()
      .subscribe(result => {
        this.customers = result;
      });

    this.contractService
      .getAll()
      .subscribe(result =>
        this.contracts = result);
  }

  showMoreInfo(e: MouseEvent, contractId: number) {
    var selectedContract = this.contracts.find(x => x.id == contractId) as Contract;
    this.popup.setTitle(selectedContract?.totalPricePerDay + ' ' + selectedContract?.totalPricePerDay)
    this.popup.showObject(selectedContract);
    this.popup.show();
    let popUp = document.getElementById('morePopUp') as HTMLDivElement
    popUp.style.top = e.y + 'px'
    popUp.style.left = e.x + 'px'
  }
}

import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { ContractStatus } from '../../../models/enum/ContractStatus';
import { Contract } from '../../../models/contract.model';

@Component({
  selector: 'app-contract-status',
  standalone: true,
  imports: [],
  templateUrl: './contract-status.component.html',
  styleUrl: './contract-status.component.scss'
})
export class ContractStatusComponent {
  @Input() public contract: Contract
  @ViewChild('indicator') public indicator: HTMLSpanElement;

  jon(){
  // ContractStatus.
  }


}

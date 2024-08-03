import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { ContractStatus } from '../../../models/enum/ContractStatus';
import { Contract } from '../../../models/contract.model';
import { TranslocoPipe } from '@ngneat/transloco';

@Component({
  selector: 'app-contract-status',
  standalone: true,
  imports: [TranslocoPipe],
  templateUrl: './contract-status.component.html',
  styleUrl: './contract-status.component.scss'
})
export class ContractStatusComponent {
  @Input() public contract: Contract
  @ViewChild('indicator') public indicator: HTMLSpanElement;

  @Input() public showStatusText = true;

  jon() {
    // ContractStatus.
  }
}

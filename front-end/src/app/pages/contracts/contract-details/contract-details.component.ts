import { Component } from '@angular/core';
import { ContractService } from '../../../services/contract.service';
import { ActivatedRoute } from '@angular/router';
import { serialize } from 'v8';
import { json } from 'stream/consumers';
import { Contract } from '../../../models/contract.model';

@Component({
  selector: 'app-contract-details',
  standalone: true,
  imports: [],
  templateUrl: './contract-details.component.html',
  styleUrl: './contract-details.component.scss'
})
export class ContractDetailsComponent {

  id: number;
  contractJson: string;
  contract: Contract;

  constructor(private contractService: ContractService, private route: ActivatedRoute) {

    contractService.getById()
      .subscribe(x => {
        this.contract = x;
        console.log(x)
      });

  }

}

import { AfterViewInit, Component, Input, OnInit, input } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { ReturnedItem } from '../../../../../models/returnedItem.model';
import { TranslocoPipe } from '@ngneat/transloco';
import { ConfigDateComponent } from '../../../../../utils/config-date/config-date.component';
import { ContractService } from '../../../../../services/contract.service';

@Component({
  selector: 'app-returned-items',
  standalone: true,
  imports: [DecimalPipe, DatePipe, TranslocoPipe,ConfigDateComponent],
  templateUrl: './returned-items.component.html',
  styleUrl: './returned-items.component.scss'
})
export class ReturnedItemsComponent implements OnInit {
  @Input() returnItems: ReturnedItem[];
  @Input() contractItemID: number;

  constructor(public contractService: ContractService) {
    console.log(this.returnItems);
  }
  ngOnInit(): void { 
    console.log('this is return item object'+this.returnItems);
    console.log('this is return contractItemID: '+this.contractItemID);
  }

  ngAfterViewInit(): void {
   
  }
}

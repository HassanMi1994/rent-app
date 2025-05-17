import { AfterViewInit, Component, EnvironmentInjector, EventEmitter, OnInit, ViewChildren } from '@angular/core';
import { TranslocoPipe, TranslocoService } from '@ngneat/transloco';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FormInputComponent } from '../../../utils/form-input/form-input.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Customer, CustomerValidator } from '../../../models/customer.model';
import { FormsModule } from '@angular/forms';
import { CustomerService } from '../../../services/customer.service';

@Component({
  selector: 'app-create-customer',
  standalone: true,
  imports: [TranslocoPipe, FormInputComponent, RouterLink, FormsModule],
  templateUrl: './create-customer.component.html',
  styleUrl: './create-customer.component.scss',
})
export class CreateCustomerComponent implements OnInit, AfterViewInit {
  customer: Customer = new Customer();
  transLoco: TranslocoService;
  @ViewChildren('inputs') inputs: FormInputComponent[];

  isEditMode = false;
  customerID: number | null = null;

  constructor(private customerService: CustomerService,
    private router: Router,
    private route: ActivatedRoute,
    transLoco: TranslocoService) {
    this.transLoco = transLoco;
  }
  ngAfterViewInit(): void {
    if (this.isEditMode)
      this.setValue();
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      let x = params.get('id');
      if (x) {
        this.customerID = parseInt(x);
        this.isEditMode = true;

        //load data from back end
        this.customer = this.customerService.getByID(this.customerID)

        //  this.loadProductData(this.productId);
      }
    })
  }


  create() {
    let keys = this.getErrors();

    if (keys.length == 0) {
      if(this.isEditMode){
 this.customerService.edit(this.customer);
      }
      else{

        this.customerService.create(this.customer);
      }
      this.router.navigateByUrl('/' + this.transLoco.getActiveLang() + '/customers');
    }
  }


  private setValue() {
    let keys = Object.keys(this.customer);
    if (keys) {
      this.inputs.forEach(element => {
        if (keys.find(x => x == element.labelName)) {
          let key = element.labelName as keyof typeof this.customer;
          element.setValue(this.customer[key] as string);
        }
      });
    }
  }

  private getErrors() {
    let validation = new CustomerValidator(this.transLoco);
    let errors = validation.validate(this.customer);

    let keys = Object.keys(errors);

    if (errors) {
      this.inputs.forEach(element => {
        if (keys.find(x => x == element.labelName)) {
          let key = element.labelName as keyof typeof errors;
          element.setInvalid(errors[key] as string);
        }
        else {
          element.setValid();
        }
      });
    }
    return keys;
  }
}

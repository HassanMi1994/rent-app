import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { TranslocoPipe } from '@ngneat/transloco';

@Component({
  selector: 'app-how-it-works',
  standalone: true,
  imports: [TranslocoPipe, CommonModule],
  templateUrl: './how-it-works.component.html',
  styleUrl: './how-it-works.component.scss'
})
export class HowItWorksComponent {
  features = [
    { title: 'hiw.multLang', description: 'hiw.multLangDes' },
    { title: 'hiw.respDesign', description: 'hiw.respDesignDes' },
    { title: 'hiw.freeToUse', description: 'hiw.freeToUseDes' },
    { title: 'hiw.quickSetup', description: 'hiw.quickSetupDes' },
    { title: 'hiw.employeeUsersCreation', description: 'hiw.employeeUsersCreationDes' },
    { title: 'hiw.custManagement', description: 'hiw.custManagementDes' },
    { title: 'hiw.inventoryManagement', description: 'hiw.inventoryManagementDes' },
    { title: 'hiw.contractManagement', description: 'hiw.contractManagementDes' },
    { title: 'hiw.returnManagement', description: 'hiw.returnManagementDes' },
    { title: 'hiw.paymentTracking', description: 'hiw.paymentTrackingDes' }
  ];

  constructor(
    private titleService: Title,
    private metaService: Meta
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Features - RSapp.ir');;
    this.metaService.updateTag({ name: 'description', content: 'Learn more about RSApp features for managing your rental business at a glance. | RSapp.ir' });
  }
}


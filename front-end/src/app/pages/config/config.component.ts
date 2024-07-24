import { Component } from '@angular/core';
import { FormInputComponent } from '../../utils/form-input/form-input.component';
import { FormInputNumberComponent } from '../../utils/form-input-number/form-input-number.component';
import { SettingService } from '../../services/setting.service';
import { TranslocoPipe } from '@ngneat/transloco';
import { NgSelectModule } from '@ng-select/ng-select';
import { StaticModels } from '../../models/enum/allEnums.enum';
import { Obj } from '@popperjs/core';
import { KeyValuePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-setting',
  standalone: true,
  imports: [NgSelectModule, FormInputComponent, FormInputNumberComponent, TranslocoPipe, KeyValuePipe,FormsModule],
  templateUrl: './config.component.html',
  styleUrl: './config.component.scss'
})
export class SettingComponent {

  constructor(public settingService: SettingService) {
    settingService.get();
  }

  save() {
    this.settingService.patch();
  }

}

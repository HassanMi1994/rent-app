import { Component } from '@angular/core';
import { FormInputComponent } from '../../utils/form-input/form-input.component';
import { FormInputNumberComponent } from '../../utils/form-input-number/form-input-number.component';
import { SettingService } from '../../services/setting.service';
import { TranslocoPipe } from '@ngneat/transloco';

@Component({
  selector: 'app-setting',
  standalone: true,
  imports: [FormInputComponent, FormInputNumberComponent, TranslocoPipe],
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

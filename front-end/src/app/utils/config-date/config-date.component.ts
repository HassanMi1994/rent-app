import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, Inject, Input, LOCALE_ID, OnInit } from '@angular/core';
import { SettingService } from '../../services/setting.service';
import { CalendarType } from '../../models/enum/calendar-type';

@Component({
  selector: 'app-config-date',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './config-date.component.html',
  styleUrl: './config-date.component.scss'
})
export class ConfigDateComponent implements OnInit, AfterViewInit {
  @Input() date: Date;
  calendarType: CalendarType;
  persian: string;
  georgian: string | undefined;

  constructor(public configService: SettingService, @Inject(LOCALE_ID) public locale: string) {

    //this.georgian = datePipe.transform(this.date, "yyyy/MM/dd HH:mm")?.toString();
  }
  ngAfterViewInit(): void {
    let compDate = new Date(this.date.toString() + 'Z');
    let persianDate = compDate.toLocaleDateString('fa-IR').split('/');
    let persianTime = compDate.toLocaleTimeString('fa-IR').split(':');
    let dateString = persianDate[0].padStart(4, "۰") + "/" + persianDate[1].padStart(2, "۰") + "/" + persianDate[2].padStart(2, "۰");
    this.persian = dateString + " " + persianTime[0].padStart(2, '۰') + ":" + persianTime[1].padStart
      (2, '۰');
  }
  ngOnInit(): void {
    if (this.configService.userConfig == undefined || this.configService.userConfig == null) {
      this.configService.get()
        .subscribe(x => {
          this.calendarType = x.calendarType;
          this.configService.userConfig = x;
        });
    } else {
      this.calendarType = this.configService.userConfig.calendarType;
    }
  }
}

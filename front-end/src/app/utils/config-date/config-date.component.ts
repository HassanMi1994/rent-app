import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
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

  constructor(public configService: SettingService) {

    //this.georgian = datePipe.transform(this.date, "yyyy/MM/dd HH:mm")?.toString();
  }
  ngAfterViewInit(): void {
    let compDate = new Date(this.date);
    let persianDate = compDate.toLocaleDateString('fa-IR').split('/');
    let dateString = persianDate[0].padStart(4, "0") + "/" + persianDate[1].padStart(2, "0") + "/" + persianDate[2].padStart(2, "0");
    this.persian = dateString + " " +  compDate.getHours().toString().padStart(2,'0') + ":" + compDate.getMinutes().toString().padStart
    (2,'0');
  }
  ngOnInit(): void {
    if (this.configService.userConfig == undefined || this.configService.userConfig == null) {
      this.configService.get()
        .subscribe(x => this.calendarType = x.calendarType);
    } else {
      this.calendarType = this.configService.userConfig.calendarType;
    }
  }
}

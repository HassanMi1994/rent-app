import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslocoPipe } from '@ngneat/transloco';

@Component({
  selector: 'app-form-input-date',
  standalone: true,
  imports: [TranslocoPipe, FormsModule],
  templateUrl: './form-input-date.component.html',
  styleUrl: './form-input-date.component.scss'
})
export class FormInputDateComponent implements AfterViewInit {
  @Input() labelName: string;
  @Output() value = new EventEmitter<Date>();
  @ViewChild('input') input: HTMLInputElement;
  val: Date = new Date();

  constructor() {

  }
  ngAfterViewInit(): void {
    this.valueChanged(new Date().toDateString());
    this.input.value = new Date().toDateString();
    this.value.emit(new Date());
  }

  valueChanged(value: string) {
    let date = new Date(value);
    console.log(date);
    console.log(date.toLocaleDateString('fa-Ir'));
    this.value.emit(date);
  }

  empty() {
    this.val = new Date();
    this.valueChanged(new Date().toDateString());
  }

  setValue(val: Date) {
    this.val = val;
    this.input.value = val.toString();
  }

  getValue() {
    return this.val;
  }
}

import { DecimalPipe } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslocoPipe } from '@ngneat/transloco';

@Component({
  selector: 'app-form-input-number',
  standalone: true,
  imports: [TranslocoPipe, FormsModule, DecimalPipe],
  templateUrl: './form-input-number.component.html',
  styleUrl: './form-input-number.component.scss'
})
export class FormInputNumberComponent {
  @Input() labelName: string;
  @Output() value = new EventEmitter<number>();
  @ViewChild('input') input: HTMLInputElement;
  @Input() val: number;

  valueChanged(value: string) {
    this.val = parseInt(value);
    console.log(value);
    this.value.emit(parseInt(value));
  }

  empty() {
    this.val = 0;
    this.valueChanged('');
  }

  setValue(val: number) {
    this.val = val;
    this.input.value = val.toString();
    this.valueChanged(val.toString());
  }

  getValue() {
    return this.val;
  }
}

import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { TranslocoPipe } from '@ngneat/transloco';
import { } from 'stream';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-input',
  standalone: true,
  imports: [TranslocoPipe, FormsModule],
  providers: [TranslocoPipe],
  templateUrl: './form-input.component.html',
  styleUrl: './form-input.component.scss',
})
export class FormInputComponent {
  @Input() labelName: string;
  @Input() readOnly: boolean = false;
  @Output() value = new EventEmitter<string>();
  @Input() val: string
  @ViewChild('input') input: HTMLInputElement;

  valueChanged(value: string) {
    console.log(value);
    this.value.emit(value);
  }

  clear() {
    this.input.value = '10';
    this.val = '10';
    this.valueChanged('10');
  }

  setValue(val: string) {
    this.val = val;
    this.input.value = val;
  }

  getValue() {
    return this.val;
  }
}

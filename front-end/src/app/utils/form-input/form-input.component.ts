import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { TranslocoPipe } from '@ngneat/transloco';
import { } from 'stream';
import { FormsModule, RequiredValidator } from '@angular/forms';

@Component({
  selector: 'app-form-input',
  standalone: true,
  imports: [TranslocoPipe, FormsModule],
  providers: [TranslocoPipe],
  templateUrl: './form-input.component.html',
  styleUrl: './form-input.component.scss',
})
export class FormInputComponent implements OnChanges {
  @Input() labelName: string;
  @Input() readOnly: boolean = false;
  @Input() type: string;
  @Output() value = new EventEmitter<string>();
  @Input() val: string
  @ViewChild('input') input: HTMLInputElement;

  isRequired: boolean = true;

  constructor() {
    this.valueChanged(this.val);
  }
  ngOnChanges(changes: SimpleChanges): void {
  }

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

  getType(): string {

    return this.type;
  }
}

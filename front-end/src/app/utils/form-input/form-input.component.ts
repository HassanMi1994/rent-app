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
  @Output() value = new EventEmitter<string>();
  val: string
  @ViewChild('input') input: HTMLInputElement;

  valueChanged(value: string) {
    console.log(value);
    this.value.emit(value);
  }

  clear() {
    this.input.value = '';
    this.val = '';
    this.valueChanged('');
  }
}

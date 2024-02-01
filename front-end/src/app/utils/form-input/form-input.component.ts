import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslocoPipe } from '@ngneat/transloco';
import { } from 'stream';

@Component({
  selector: 'app-form-input',
  standalone: true,
  imports: [TranslocoPipe],
  providers: [TranslocoPipe],
  templateUrl: './form-input.component.html',
  styleUrl: './form-input.component.scss',
})
export class FormInputComponent {
  @Input() labelName: string;
  @Output() value = new EventEmitter<string>();

  valueChanged(value: string) {
    console.log(value);
    this.value.emit(value);
  }
}

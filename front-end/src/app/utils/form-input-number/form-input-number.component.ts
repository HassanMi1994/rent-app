import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslocoPipe } from '@ngneat/transloco';

@Component({
  selector: 'app-form-input-number',
  standalone: true,
  imports: [TranslocoPipe],
  templateUrl: './form-input-number.component.html',
  styleUrl: './form-input-number.component.scss'
})
export class FormInputNumberComponent {
  @Input() labelName: string;
  @Output() value = new EventEmitter<number>();

  valueChanged(value: string) {
    console.log(value);
    this.value.emit(parseInt(value));
  }
}

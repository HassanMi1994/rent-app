import { DecimalPipe } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild } from '@angular/core';
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
  isFocused: boolean = false;
  invalid: boolean = false;
  validationMessage: string;
 @ViewChild('container') container!: ElementRef
 
  constructor(private renderer: Renderer2) {
    if (this.val !== undefined)
      this.valueChanged(this.val.toString());
  }

  isOnFocus(flag: boolean) {
    this.isFocused = flag;
  }

 setInvalid(message: string) {
    this.invalid = true;
    this.validationMessage = message;
    this.renderer.addClass(this.container.nativeElement, 'invalid');
  }

  setValid() {
    this.invalid = false;
    this.renderer.removeClass(this.container.nativeElement, 'invalid');
  }

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

import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { TranslocoPipe } from '@ngneat/transloco';
import { } from 'stream';
import { FormsModule, RequiredValidator } from '@angular/forms';
import { Subject } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-form-input',
  standalone: true,
  imports: [TranslocoPipe, FormsModule, AsyncPipe],
  providers: [TranslocoPipe],
  templateUrl: './form-input.component.html',
  styleUrl: './form-input.component.scss',
})
export class FormInputComponent implements OnChanges {
  @Input() labelName: string;
  @Input() readOnly: boolean = false;
  @Input() type: string;
  @Input() val: string
  @ViewChild('input') input: HTMLInputElement;
  @ViewChild('container') container!: ElementRef
  @Output() onChange = new EventEmitter<{ value: any, labelName: string, valueType: string }>();
  @Output() value = new EventEmitter<string>();

  invalid: boolean = false;
  validationMessage: string;

  isRequired: boolean = true;

  constructor(private renderer: Renderer2) {
    this.valueChanged(this.val);
  }
  ngOnChanges(changes: SimpleChanges): void {
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
    this.value.emit(this.val);
    this.onChange.emit({ value: value, labelName: this.labelName, valueType: typeof value });
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

import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-color-picker',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useValue: forwardRef(() => AppColorPickerComponent),
      multi: true,
    },
  ],
  template: `
    <input type="color" [value]="value" (change)="colorChange($event)" />
  `,
})
export class AppColorPickerComponent implements ControlValueAccessor {
  value: string | null = null;
  onChange: (value: string | null) => void = () => {};
  onTouched: () => void = () => {};

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(val: string | null) {
    console.log('write value', val);
    this.value = val || null;
  }

  colorChange(event: any) {
    this.value = event.target.value;
    console.log(this.value);
    this.onTouched();
    this.onChange(this.value);
  }
}

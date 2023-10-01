import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, forwardRef } from "@angular/core";
import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  ReactiveFormsModule,
  FormsModule,
} from "@angular/forms";

@Component({
  selector: "app-color-picker",
  // changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AppColorPickerComponent),
      multi: true,
    },
  ],
  template: `
    <input
      type="color"
      [ngModel]="value"
      [value]="value"
      (change)="colorChange($any($event.target).value)"
    />
    <p>Value: {{ value }}</p>
  `,
})
export class AppColorPickerComponent implements ControlValueAccessor {
  value: string | null = null;
  onChange: (value: string | null) => void = (value) => {
    console.log("onChange", value);
  };
  onTouched: () => void = () => {};

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(val: string | null) {
    console.log("write value", val);
    this.value = val || null;
  }

  colorChange(value: any) {
    this.value = value;
    console.log("colorChange", value);
    this.onTouched();
    this.onChange(this.value);
  }
}

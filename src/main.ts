import "zone.js/dist/zone";
import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { bootstrapApplication } from "@angular/platform-browser";
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { AppColorPickerComponent } from "./color-picker.component";

@Component({
  selector: "my-app",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppColorPickerComponent,
  ],
  template: `
    <h1>Pick a color</h1>
    <app-color-picker [formControl]="colorFc" />
    <p>
      Current color: <b>{{ colorFc.value }}</b>
    </p>
    <button (click)="setCustom()">Set to #123456</button>
  `,
})
export class App {
  colorFc = new FormControl("#ffffff", Validators.required);

  setCustom() {
    this.colorFc.setValue("#123456");
    this.colorFc.updateValueAndValidity();
  }
}

bootstrapApplication(App, {
  providers: [],
});

import { Component, OnInit } from "@angular/core";
import {
  NgControl,
  FormGroup,
  FormControl,
  ControlValueAccessor
} from "@angular/forms";

@Component({
  selector: "app-full-name",
  templateUrl: "./full-name.component.html",
  styleUrls: ["./full-name.component.css"]
})
export class FullNameComponent implements ControlValueAccessor, OnInit {
  form = new FormGroup({
    firstName: new FormControl(""),
    lastName: new FormControl("")
  });
  constructor(public ngControl: NgControl) {
    ngControl.valueAccessor = this;
  }

  ngOnInit() {
    const control = this.ngControl.control;
    console.log(control); // <-- undefined only when "enableIvy" flag is set to true
  }
  writeValue(value: { firstName: string; lastName: string }): void {
    if (value) {
      this.form.setValue(value, { emitEvent: false });
    }
  }

  // view --> model
  registerOnChange(
    fn: (value: { firstName: string; lastName: string }) => void
  ) {
    this.form.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

  onTouched: () => void = () => {};
}

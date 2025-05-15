import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function nameValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const nameRegex = /^[a-zA-Z]+[-\s]?[a-zA-Z]+(?:[-\s][a-zA-Z]+)*$/;
      const forbidden = nameRegex.test(control.value);
      return forbidden ? null: { 'nameValidator': true };
    };
}

export function mustMatch(controlName: string, matchingControlName: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const mainControl = control.get(controlName);
    const matchingControl = control.get(matchingControlName);
    if (!mainControl || !matchingControl) return null;

    if (matchingControl.value !== mainControl.value ) {
      matchingControl.setErrors({mustMatch: true});
    }else{
      matchingControl.setErrors(null);
    }
    return null;
  }
}


export const StrongPasswordRegx: RegExp =
  /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d)(?=.*[!@#$%^&*]).{8,}$/;